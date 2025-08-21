// Main JavaScript for BuyOn E-commerce Website (No Authentication)

class BuyOnApp {
    constructor() {
        this.currentCategory = 'all';
        this.currentSort = 'relevance';
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.filteredProducts = [];
        this.searchQuery = '';
        this.wishlist = [];
        this.activeFilters = {
            priceRange: { min: 0, max: 50000 },
            brands: [],
            ratings: [],
            discounts: []
        };
        this.init();
    }

    init() {
        this.loadWishlist();
        this.loadProducts();
        this.bindEvents();
        this.initUI();
        this.hideLoadingScreen();
    }

    // Hide loading screen
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }

    // Load wishlist from localStorage
    loadWishlist() {
        try {
            const savedWishlist = localStorage.getItem('buyonWishlist');
            if (savedWishlist) {
                this.wishlist = JSON.parse(savedWishlist);
            }
        } catch (error) {
            console.error('Error loading wishlist:', error);
            this.wishlist = [];
        }
        this.updateWishlistUI();
    }

    // Save wishlist to localStorage
    saveWishlist() {
        try {
            localStorage.setItem('buyonWishlist', JSON.stringify(this.wishlist));
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    }

    // Initialize UI components
    initUI() {
        this.initPriceRangeSliders();
        this.initBrandFilters();
        this.initSearchSuggestions();
        this.updateResultsCount();
    }

    // Load and display products
    loadProducts() {
        this.filteredProducts = this.getFilteredProducts();
        this.renderProducts();
        this.updateResultsCount();
    }

    // Get filtered products based on current filters
    getFilteredProducts() {
        let products = [...productsData];

        // Filter by category
        if (this.currentCategory !== 'all') {
            products = ProductUtils.getByCategory(this.currentCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            products = ProductUtils.search(this.searchQuery);
        }

        // Filter by price range
        products = products.filter(product => 
            product.price >= this.activeFilters.priceRange.min && 
            product.price <= this.activeFilters.priceRange.max
        );

        // Filter by brands
        if (this.activeFilters.brands.length > 0) {
            products = products.filter(product => 
                this.activeFilters.brands.includes(product.brand)
            );
        }

        // Filter by ratings
        if (this.activeFilters.ratings.length > 0) {
            const minRating = Math.min(...this.activeFilters.ratings);
            products = products.filter(product => product.rating >= minRating);
        }

        // Filter by discounts
        if (this.activeFilters.discounts.length > 0) {
            const minDiscount = Math.min(...this.activeFilters.discounts);
            products = products.filter(product => product.discount >= minDiscount);
        }

        // Sort products
        return ProductUtils.sort(products, this.currentSort);
    }

    // Render products in the grid
    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            productsGrid.innerHTML = this.renderEmptyState();
            return;
        }

        const productsHTML = productsToShow.map(product => this.renderProductCard(product)).join('');

        if (this.currentPage === 1) {
            productsGrid.innerHTML = productsHTML;
        } else {
            productsGrid.insertAdjacentHTML('beforeend', productsHTML);
        }

        // Update load more button
        this.updateLoadMoreButton();

        // Update cart and wishlist buttons
        if (window.cart) {
            window.cart.updateCartButton();
        }
        this.updateWishlistButtons();
    }

    // Render individual product card
    renderProductCard(product) {
        const imageIcon = ProductUtils.getImagePlaceholder(product.category);
        const stars = ProductUtils.generateStarRating(product.rating);
        const discountBadge = product.discount > 0 ? 
            `<div class="product-badge">${product.discount}% OFF</div>` : '';

        const isInWishlist = this.isInWishlist(product.id);

        return `
            <div class="product-card fade-in" data-product-id="${product.id}">
                <div class="product-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.title}" loading="lazy">` : 
                        `<i class="${imageIcon}"></i>`
                    }
                    ${discountBadge}
                    <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-title" title="${product.title}">${product.title}</div>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">₹${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? 
                            `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''
                        }
                        ${product.discount > 0 ? 
                            `<span class="discount">${product.discount}% off</span>` : ''
                        }
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="quick-view-btn" data-product-id="${product.id}">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Render empty state when no products found
    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No products found</h3>
                <p>Try adjusting your search criteria or filters</p>
                <button class="btn btn-primary" onclick="app.clearFilters()">
                    Clear Filters
                </button>
            </div>
        `;
    }

    // Update load more button
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);

        if (this.currentPage >= totalPages) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Load More Products (${this.filteredProducts.length - (this.currentPage * this.productsPerPage)} remaining)`;
        }
    }

    // Update results count
    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const total = this.filteredProducts.length;
            const showing = Math.min(this.currentPage * this.productsPerPage, total);

            if (this.searchQuery) {
                resultsCount.textContent = `Found ${total} results for "${this.searchQuery}"`;
            } else if (this.currentCategory !== 'all') {
                const categoryName = categories.find(cat => cat.id === this.currentCategory)?.name || this.currentCategory;
                resultsCount.textContent = `Showing ${showing} of ${total} products in ${categoryName}`;
            } else {
                resultsCount.textContent = `Showing ${showing} of ${total} products`;
            }
        }
    }

    // Wishlist management
    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    addToWishlist(productId) {
        if (!this.isInWishlist(productId)) {
            this.wishlist.push(productId);
            this.saveWishlist();
            this.updateWishlistUI();

            const product = ProductUtils.getById(productId);
            this.showNotification(`${product.title} added to wishlist!`, 'success');
        }
    }

    removeFromWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.saveWishlist();
            this.updateWishlistUI();

            const product = ProductUtils.getById(productId);
            this.showNotification(`${product.title} removed from wishlist`, 'info');
        }
    }

    toggleWishlist(productId) {
        if (this.isInWishlist(productId)) {
            this.removeFromWishlist(productId);
        } else {
            this.addToWishlist(productId);
        }
        this.updateWishlistButtons();
    }

    updateWishlistUI() {
        const wishlistCount = document.getElementById('wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
            wishlistCount.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    updateWishlistButtons() {
        const wishlistButtons = document.querySelectorAll('.wishlist-btn');
        wishlistButtons.forEach(button => {
            const productId = parseInt(button.dataset.productId);
            if (this.isInWishlist(productId)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Wishlist sidebar management
    toggleWishlistSidebar() {
        const wishlistSidebar = document.getElementById('wishlist-sidebar');
        const overlay = document.getElementById('overlay');

        if (wishlistSidebar.classList.contains('active')) {
            this.closeWishlistSidebar();
        } else {
            this.openWishlistSidebar();
        }
    }

    openWishlistSidebar() {
        const wishlistSidebar = document.getElementById('wishlist-sidebar');
        const overlay = document.getElementById('overlay');

        wishlistSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        this.renderWishlistItems();
    }

    closeWishlistSidebar() {
        const wishlistSidebar = document.getElementById('wishlist-sidebar');
        const overlay = document.getElementById('overlay');

        wishlistSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    renderWishlistItems() {
        const wishlistContent = document.getElementById('wishlist-content');
        if (!wishlistContent) return;

        if (this.wishlist.length === 0) {
            wishlistContent.innerHTML = `
                <div class="empty-wishlist">
                    <i class="fas fa-heart"></i>
                    <p>Your wishlist is empty</p>
                    <button class="continue-shopping" onclick="app.closeWishlistSidebar()">Continue Shopping</button>
                </div>
            `;
        } else {
            const wishlistItemsHTML = this.wishlist.map(productId => {
                const product = ProductUtils.getById(productId);
                if (!product) return '';

                const imageIcon = ProductUtils.getImagePlaceholder(product.category);

                return `
                    <div class="wishlist-item" data-product-id="${product.id}">
                        <div class="wishlist-item-image">
                            ${product.image ? `<img src="${product.image}" alt="${product.title}">` : `<i class="${imageIcon}"></i>`}
                        </div>
                        <div class="wishlist-item-details">
                            <div class="wishlist-item-title">${product.title}</div>
                            <div class="wishlist-item-brand">${product.brand}</div>
                            <div class="wishlist-item-price">₹${product.price.toLocaleString()}</div>
                            <div class="wishlist-actions">
                                <button class="add-to-cart-btn" data-product-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                                <button class="remove-wishlist-item" data-product-id="${product.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            wishlistContent.innerHTML = `<div class="wishlist-items">${wishlistItemsHTML}</div>`;
        }
    }

    // Bind event listeners
    bindEvents() {
        // Category navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.category-item')) {
                this.handleCategoryClick(e.target);
            }
        });

        // Search functionality
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch();
                }
            });

            searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
        }

        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.currentPage = 1;
                this.loadProducts();
            });
        }

        // Load more functionality
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderProducts();
            });
        }

        // Wishlist toggle
        const wishlistToggle = document.getElementById('wishlist-toggle');
        if (wishlistToggle) {
            wishlistToggle.addEventListener('click', () => this.toggleWishlistSidebar());
        }

        // Close wishlist sidebar
        const closeWishlist = document.getElementById('close-wishlist');
        if (closeWishlist) {
            closeWishlist.addEventListener('click', () => this.closeWishlistSidebar());
        }

        // Continue shopping from wishlist
        const continueShoppingWishlist = document.getElementById('continue-shopping-wishlist');
        if (continueShoppingWishlist) {
            continueShoppingWishlist.addEventListener('click', () => this.closeWishlistSidebar());
        }

        // Wishlist item removal
        document.addEventListener('click', (e) => {
            if (e.target.matches('.remove-wishlist-item') || e.target.closest('.remove-wishlist-item')) {
                const button = e.target.matches('.remove-wishlist-item') ? e.target : e.target.closest('.remove-wishlist-item');
                const productId = parseInt(button.dataset.productId);
                this.removeFromWishlist(productId);
                this.renderWishlistItems();
            }
        });

        // Filters
        this.bindFilterEvents();

        // Quick view
        document.addEventListener('click', (e) => {
            if (e.target.matches('.quick-view-btn') || e.target.closest('.quick-view-btn')) {
                const button = e.target.matches('.quick-view-btn') ? e.target : e.target.closest('.quick-view-btn');
                const productId = parseInt(button.dataset.productId);
                this.showQuickView(productId);
            }
        });

        // Hero banner CTA
        document.addEventListener('click', (e) => {
            if (e.target.matches('.cta-btn')) {
                this.scrollToProducts();
            }
        });

        // Wishlist buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.wishlist-btn') || e.target.closest('.wishlist-btn')) {
                const button = e.target.matches('.wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
                const productId = parseInt(button.dataset.productId);
                this.toggleWishlist(productId);
            }
        });
    }

    // Bind filter-related events
    bindFilterEvents() {
        // Filters toggle
        const filtersToggle = document.getElementById('filters-toggle');
        if (filtersToggle) {
            filtersToggle.addEventListener('click', () => this.toggleFilters());
        }

        // Close filters
        const closeFilters = document.getElementById('close-filters');
        if (closeFilters) {
            closeFilters.addEventListener('click', () => this.closeFilters());
        }

        // Apply filters
        const applyFilters = document.getElementById('apply-filters');
        if (applyFilters) {
            applyFilters.addEventListener('click', () => this.applyFilters());
        }

        // Clear filters
        const clearFilters = document.getElementById('clear-filters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => this.clearFilters());
        }

        // Price range sliders
        const priceMinSlider = document.getElementById('price-min');
        const priceMaxSlider = document.getElementById('price-max');

        if (priceMinSlider && priceMaxSlider) {
            priceMinSlider.addEventListener('input', () => this.updatePriceRange());
            priceMaxSlider.addEventListener('input', () => this.updatePriceRange());
        }

        // Filter checkboxes
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[type="checkbox"]') && 
                e.target.closest('.filters-sidebar')) {
                this.handleFilterChange(e.target);
            }
        });
    }

    // Handle category click
    handleCategoryClick(categoryElement) {
        // Update active category
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        categoryElement.classList.add('active');

        this.currentCategory = categoryElement.dataset.category;
        this.currentPage = 1;
        this.searchQuery = ''; // Clear search when changing category

        // Clear search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }

        this.loadProducts();
    }

    // Handle search
    handleSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            this.searchQuery = searchInput.value.trim();
            this.currentCategory = 'all'; // Reset category when searching
            this.currentPage = 1;

            // Update active category UI
            document.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector('.category-item[data-category="all"]')?.classList.add('active');

            this.loadProducts();
            this.hideSearchSuggestions();
        }
    }

    // Handle search input for suggestions
    handleSearchInput(query) {
        if (query.length > 2) {
            this.showSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    }

    // Initialize search suggestions
    initSearchSuggestions() {
        // Create suggestions based on product titles and brands
        this.searchSuggestions = [
            ...new Set([
                ...productsData.map(p => p.title),
                ...productsData.map(p => p.brand),
                ...categories.map(c => c.name)
            ])
        ].slice(0, 50); // Limit suggestions
    }

    // Show search suggestions
    showSearchSuggestions(query) {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (!suggestionsContainer) return;

        const filteredSuggestions = this.searchSuggestions
            .filter(suggestion => 
                suggestion.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 8);

        if (filteredSuggestions.length > 0) {
            const suggestionsHTML = filteredSuggestions
                .map(suggestion => `
                    <div class="suggestion-item" data-suggestion="${suggestion}">
                        ${suggestion}
                    </div>
                `).join('');

            suggestionsContainer.innerHTML = suggestionsHTML;
            suggestionsContainer.style.display = 'block';

            // Bind click events
            suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const searchInput = document.getElementById('search-input');
                    if (searchInput) {
                        searchInput.value = item.dataset.suggestion;
                        this.handleSearch();
                    }
                });
            });
        } else {
            this.hideSearchSuggestions();
        }
    }

    // Hide search suggestions
    hideSearchSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Toggle filters sidebar
    toggleFilters() {
        const filtersSidebar = document.getElementById('filters-sidebar');
        const overlay = document.getElementById('overlay');

        if (filtersSidebar && overlay) {
            filtersSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close filters sidebar
    closeFilters() {
        const filtersSidebar = document.getElementById('filters-sidebar');
        const overlay = document.getElementById('overlay');

        if (filtersSidebar && overlay) {
            filtersSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Initialize price range sliders
    initPriceRangeSliders() {
        const priceMinSlider = document.getElementById('price-min');
        const priceMaxSlider = document.getElementById('price-max');

        if (priceMinSlider && priceMaxSlider) {
            // Set initial values
            priceMinSlider.value = this.activeFilters.priceRange.min;
            priceMaxSlider.value = this.activeFilters.priceRange.max;
            this.updatePriceRange();
        }
    }

    // Update price range display
    updatePriceRange() {
        const priceMinSlider = document.getElementById('price-min');
        const priceMaxSlider = document.getElementById('price-max');
        const priceMinValue = document.getElementById('price-min-value');
        const priceMaxValue = document.getElementById('price-max-value');

        if (priceMinSlider && priceMaxSlider && priceMinValue && priceMaxValue) {
            let minVal = parseInt(priceMinSlider.value);
            let maxVal = parseInt(priceMaxSlider.value);

            // Ensure min is not greater than max
            if (minVal > maxVal) {
                minVal = maxVal;
                priceMinSlider.value = minVal;
            }

            this.activeFilters.priceRange.min = minVal;
            this.activeFilters.priceRange.max = maxVal;

            priceMinValue.textContent = minVal.toLocaleString();
            priceMaxValue.textContent = maxVal.toLocaleString();
        }
    }

    // Initialize brand filters
    initBrandFilters() {
        const brandFiltersContainer = document.getElementById('brand-filters');
        if (!brandFiltersContainer) return;

        const brandCounts = {};
        productsData.forEach(product => {
            brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
        });

        const sortedBrands = Object.entries(brandCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10); // Show top 10 brands

        const brandFiltersHTML = sortedBrands
            .map(([brand, count]) => `
                <label>
                    <input type="checkbox" value="${brand}"> 
                    ${brand} (${count})
                </label>
            `).join('');

        brandFiltersContainer.innerHTML = brandFiltersHTML;
    }

    // Handle filter changes
    handleFilterChange(checkbox) {
        const filterGroup = checkbox.closest('.filter-group');
        if (!filterGroup) return;

        const filterType = this.getFilterType(filterGroup);
        const value = checkbox.value;

        if (checkbox.checked) {
            if (!this.activeFilters[filterType].includes(value)) {
                this.activeFilters[filterType].push(value);
            }
        } else {
            const index = this.activeFilters[filterType].indexOf(value);
            if (index > -1) {
                this.activeFilters[filterType].splice(index, 1);
            }
        }
    }

    // Get filter type from filter group
    getFilterType(filterGroup) {
        const filterTitle = filterGroup.querySelector('h4')?.textContent.toLowerCase();

        if (filterTitle?.includes('brand')) return 'brands';
        if (filterTitle?.includes('rating')) return 'ratings';
        if (filterTitle?.includes('discount')) return 'discounts';

        return 'brands'; // default
    }

    // Apply filters
    applyFilters() {
        this.currentPage = 1;
        this.loadProducts();
        this.closeFilters();
    }

    // Clear all filters
    clearFilters() {
        // Reset active filters
        this.activeFilters = {
            priceRange: { min: 0, max: 50000 },
            brands: [],
            ratings: [],
            discounts: []
        };

        // Reset UI elements
        const priceMinSlider = document.getElementById('price-min');
        const priceMaxSlider = document.getElementById('price-max');

        if (priceMinSlider && priceMaxSlider) {
            priceMinSlider.value = 0;
            priceMaxSlider.value = 50000;
            this.updatePriceRange();
        }

        // Clear all checkboxes
        const checkboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Apply cleared filters
        this.currentPage = 1;
        this.loadProducts();

        this.showNotification('Filters cleared', 'info');
    }

    // Show quick view modal
    showQuickView(productId) {
        const product = ProductUtils.getById(productId);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const modalBody = document.getElementById('product-modal-body');

        if (modal && modalBody) {
            modalBody.innerHTML = this.renderQuickViewContent(product);
            modal.classList.add('active');

            // Bind quick view events
            this.bindQuickViewEvents(modalBody, product);
        }
    }

    // Render quick view content
    renderQuickViewContent(product) {
        const imageIcon = ProductUtils.getImagePlaceholder(product.category);
        const stars = ProductUtils.generateStarRating(product.rating);

        const featuresHTML = product.features ? 
            product.features.map(feature => `<li>${feature}</li>`).join('') : '';

        const specificationsHTML = product.specifications ? 
            Object.entries(product.specifications)
                .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
                .join('') : '';

        const isInWishlist = this.isInWishlist(product.id);

        return `
            <div class="quick-view-content">
                <div class="product-images">
                    <div class="main-image">
                        ${product.image ? 
                            `<img src="${product.image}" alt="${product.title}">` : 
                            `<div class="image-placeholder"><i class="${imageIcon}"></i></div>`
                        }
                    </div>
                </div>

                <div class="product-details">
                    <div class="product-brand">${product.brand}</div>
                    <h2 class="product-title">${product.title}</h2>

                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${product.rating}/5 (${product.reviewCount.toLocaleString()} reviews)</span>
                    </div>

                    <div class="product-price">
                        <span class="current-price">₹${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? 
                            `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''
                        }
                        ${product.discount > 0 ? 
                            `<span class="discount-badge">${product.discount}% OFF</span>` : ''
                        }
                    </div>

                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>

                    ${featuresHTML ? `
                        <div class="product-features">
                            <h4>Key Features</h4>
                            <ul>${featuresHTML}</ul>
                        </div>
                    ` : ''}

                    <div class="product-actions">
                        <button class="add-to-cart-btn btn-large" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="wishlist-btn btn-large ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}">
                            <i class="fas fa-heart"></i> ${isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>

                    ${specificationsHTML ? `
                        <div class="product-specifications">
                            <h4>Specifications</h4>
                            <table class="spec-table">
                                ${specificationsHTML}
                            </table>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Bind quick view events
    bindQuickViewEvents(modalBody, product) {
        // Close modal
        const closeBtn = document.getElementById('close-product-modal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                document.getElementById('product-modal').classList.remove('active');
            };
        }
    }

    // Scroll to products section
    scrollToProducts() {
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (toast) {
            const toastIcon = toast.querySelector('.toast-icon');
            const toastMessage = toast.querySelector('.toast-message');

            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                info: 'fas fa-info-circle',
                warning: 'fas fa-exclamation-triangle'
            };

            toastIcon.className = `toast-icon ${icons[type] || icons.info}`;
            toastMessage.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.add('active');

            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    }

    // Get app statistics
    getStats() {
        return {
            totalProducts: productsData.length,
            categories: categories.length,
            brands: brands.length,
            currentFilters: this.activeFilters,
            currentCategory: this.currentCategory,
            searchQuery: this.searchQuery,
            filteredProductsCount: this.filteredProducts.length,
            wishlistCount: this.wishlist.length,
            cartCount: window.cart ? window.cart.getItemCount() : 0
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BuyOnApp();
    console.log('🚀 BuyOn app initialized (No Authentication)');
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Close mobile menus on resize
    const filtersSidebar = document.getElementById('filters-sidebar');
    const cartSidebar = document.getElementById('cart-sidebar');
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const overlay = document.getElementById('overlay');

    if (window.innerWidth > 768) {
        if (filtersSidebar) filtersSidebar.classList.remove('active');
        if (cartSidebar) cartSidebar.classList.remove('active');
        if (wishlistSidebar) wishlistSidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC key to close modals and sidebars
    if (e.key === 'Escape') {
        // Close product modal
        const productModal = document.getElementById('product-modal');
        if (productModal && productModal.classList.contains('active')) {
            productModal.classList.remove('active');
            return;
        }

        // Close checkout modal
        const checkoutModal = document.getElementById('checkout-modal');
        if (checkoutModal && checkoutModal.classList.contains('active')) {
            checkoutModal.classList.remove('active');
            return;
        }

        // Close cart
        if (window.cart?.isOpen) {
            window.cart.closeCart();
            return;
        }

        // Close wishlist
        const wishlistSidebar = document.getElementById('wishlist-sidebar');
        if (wishlistSidebar && wishlistSidebar.classList.contains('active')) {
            window.app?.closeWishlistSidebar();
            return;
        }

        // Close filters
        const filtersSidebar = document.getElementById('filters-sidebar');
        if (filtersSidebar && filtersSidebar.classList.contains('active')) {
            window.app?.closeFilters();
            return;
        }
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
});

// Export app for debugging and testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BuyOnApp;
}

console.log('📱 BuyOn E-commerce Website Loaded (No Authentication)');
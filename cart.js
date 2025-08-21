// Shopping Cart Management for BuyOn E-commerce Website (No Authentication)

class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.loadCart();
        this.bindEvents();
        this.updateCartUI();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('buyonCart');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            this.items = [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('buyonCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Add item to cart
    addItem(productId, quantity = 1) {
        const product = ProductUtils.getById(productId);
        if (!product) {
            console.error('Product not found:', productId);
            return false;
        }

        if (!product.inStock) {
            this.showNotification('Product is out of stock', 'error');
            return false;
        }

        const existingItemIndex = this.items.findIndex(item => item.productId === productId);

        if (existingItemIndex > -1) {
            // Update existing item quantity
            this.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            const cartItem = {
                productId: productId,
                title: product.title,
                brand: product.brand,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                quantity: quantity,
                addedAt: new Date().toISOString()
            };
            this.items.push(cartItem);
        }

        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.title} added to cart!`, 'success');

        // Analytics event (placeholder)
        this.trackEvent('add_to_cart', {
            product_id: productId,
            product_name: product.title,
            quantity: quantity,
            value: product.price * quantity
        });

        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            const removedItem = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            this.saveCart();
            this.updateCartUI();
            this.showNotification(`${removedItem.title} removed from cart`, 'info');

            // Analytics event
            this.trackEvent('remove_from_cart', {
                product_id: productId,
                product_name: removedItem.title
            });
        }
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }

        const itemIndex = this.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            this.items[itemIndex].quantity = quantity;
            this.saveCart();
            this.updateCartUI();
        }
    }

    // Get cart item count
    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart subtotal (before taxes/shipping)
    getSubtotal() {
        return this.getTotal();
    }

    // Calculate estimated tax (18% GST for India)
    getTax() {
        return Math.round(this.getSubtotal() * 0.18);
    }

    // Calculate shipping cost
    getShipping() {
        const subtotal = this.getSubtotal();
        return subtotal > 500 ? 0 : 40; // Free shipping above ₹500
    }

    // Get final total including tax and shipping
    getFinalTotal() {
        return this.getSubtotal() + this.getTax() + this.getShipping();
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Cart cleared', 'info');
    }

    // Check if product is in cart
    isInCart(productId) {
        return this.items.some(item => item.productId === productId);
    }

    // Get item quantity in cart
    getItemQuantity(productId) {
        const item = this.items.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    }

    // Toggle cart sidebar
    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    // Open cart sidebar
    openCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('overlay');

        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Update cart content when opening
        this.renderCartItems();
    }

    // Close cart sidebar
    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('overlay');

        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
    }

    // Update cart UI elements
    updateCartUI() {
        this.updateCartCount();
        this.updateCartButton();
        if (this.isOpen) {
            this.renderCartItems();
        }
    }

    // Update cart count badge
    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        const itemCount = this.getItemCount();

        if (cartCountElement) {
            cartCountElement.textContent = itemCount;
            cartCountElement.style.display = itemCount > 0 ? 'flex' : 'none';
        }
    }

    // Update add to cart buttons
    updateCartButton() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            const productId = parseInt(button.dataset.productId);
            if (this.isInCart(productId)) {
                button.innerHTML = '<i class="fas fa-check"></i> In Cart';
                button.classList.add('in-cart');
            } else {
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                button.classList.remove('in-cart');
            }
        });
    }

    // Render cart items in sidebar
    renderCartItems() {
        const cartContent = document.getElementById('cart-content');
        const cartFooter = document.getElementById('cart-footer');

        if (this.items.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="continue-shopping" id="continue-shopping">Continue Shopping</button>
                </div>
            `;
            cartFooter.style.display = 'none';
        } else {
            // Render cart items
            const cartItemsHTML = this.items.map(item => this.renderCartItem(item)).join('');

            cartContent.innerHTML = `
                <div class="cart-items">
                    ${cartItemsHTML}
                </div>
            `;

            // Show cart footer with totals
            cartFooter.style.display = 'block';
            this.renderCartTotals();
        }

        // Bind events for cart items
        this.bindCartItemEvents();
    }

    // Render individual cart item
    renderCartItem(item) {
        const product = ProductUtils.getById(item.productId);
        const imageIcon = product ? ProductUtils.getImagePlaceholder(product.category) : 'fas fa-box';

        return `
            <div class="cart-item" data-product-id="${item.productId}">
                <div class="cart-item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.title}">` : `<i class="${imageIcon}"></i>`}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-brand">${item.brand}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-qty" data-product-id="${item.productId}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               data-product-id="${item.productId}">
                        <button class="quantity-btn increase-qty" data-product-id="${item.productId}">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" data-product-id="${item.productId}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Render cart totals
    renderCartTotals() {
        const cartTotal = document.getElementById('cart-total');
        const subtotal = this.getSubtotal();
        const tax = this.getTax();
        const shipping = this.getShipping();
        const finalTotal = this.getFinalTotal();

        if (cartTotal) {
            cartTotal.innerHTML = `
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal (${this.getItemCount()} items):</span>
                        <span>₹${subtotal.toLocaleString()}</span>
                    </div>
                    <div class="summary-row">
                        <span>Tax (GST 18%):</span>
                        <span>₹${tax.toLocaleString()}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>${shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString()}</span>
                    </div>
                    <hr>
                    <div class="summary-row total-row">
                        <span><strong>Total:</strong></span>
                        <span><strong>₹${finalTotal.toLocaleString()}</strong></span>
                    </div>
                    ${shipping === 0 || subtotal >= 500 ? '' : `<div class="free-shipping-notice">Add ₹${(500 - subtotal).toLocaleString()} more for FREE shipping!</div>`}
                </div>
            `;
        }
    }

    // Bind cart-related events
    bindEvents() {
        // Cart toggle button
        const cartToggle = document.getElementById('cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.toggleCart());
        }

        // Close cart button
        const closeCart = document.getElementById('close-cart');
        if (closeCart) {
            closeCart.addEventListener('click', () => this.closeCart());
        }

        // Overlay click to close cart
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeCart());
        }

        // Checkout button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#checkout-btn') || e.target.closest('#checkout-btn')) {
                this.initiateCheckout();
            }
        });
    }

    // Bind events for cart item controls
    bindCartItemEvents() {
        // Continue shopping button
        const continueShoppingBtn = document.getElementById('continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => this.closeCart());
        }

        // Quantity controls
        document.addEventListener('click', (e) => {
            if (e.target.matches('.increase-qty') || e.target.closest('.increase-qty')) {
                const button = e.target.matches('.increase-qty') ? e.target : e.target.closest('.increase-qty');
                const productId = parseInt(button.dataset.productId);
                const currentQty = this.getItemQuantity(productId);
                this.updateQuantity(productId, currentQty + 1);
            }

            if (e.target.matches('.decrease-qty') || e.target.closest('.decrease-qty')) {
                const button = e.target.matches('.decrease-qty') ? e.target : e.target.closest('.decrease-qty');
                const productId = parseInt(button.dataset.productId);
                const currentQty = this.getItemQuantity(productId);
                this.updateQuantity(productId, Math.max(1, currentQty - 1));
            }

            if (e.target.matches('.remove-item') || e.target.closest('.remove-item')) {
                const button = e.target.matches('.remove-item') ? e.target : e.target.closest('.remove-item');
                const productId = parseInt(button.dataset.productId);
                this.removeItem(productId);
            }
        });

        // Quantity input changes
        document.addEventListener('change', (e) => {
            if (e.target.matches('.quantity-input')) {
                const productId = parseInt(e.target.dataset.productId);
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    this.updateQuantity(productId, newQuantity);
                }
            }
        });
    }

    // Initiate checkout process
    initiateCheckout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        // Close cart and show checkout modal
        this.closeCart();
        this.showCheckoutModal();
    }

    // Show checkout modal
    showCheckoutModal() {
        const checkoutModal = document.getElementById('checkout-modal');
        if (checkoutModal) {
            this.populateCheckoutModal();
            checkoutModal.classList.add('active');

            // Bind checkout form events
            this.bindCheckoutEvents();
        }
    }

    // Populate checkout modal with order data
    populateCheckoutModal() {
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutTotals = document.getElementById('checkout-totals');

        if (checkoutItems) {
            const itemsHTML = this.items.map(item => `
                <div class="order-item">
                    <span>${item.title} x ${item.quantity}</span>
                    <span>₹${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `).join('');
            checkoutItems.innerHTML = itemsHTML;
        }

        if (checkoutTotals) {
            const subtotal = this.getSubtotal();
            const tax = this.getTax();
            const shipping = this.getShipping();
            const finalTotal = this.getFinalTotal();

            checkoutTotals.innerHTML = `
                <div class="total-row"><span>Subtotal:</span> <span>₹${subtotal.toLocaleString()}</span></div>
                <div class="total-row"><span>Tax (GST):</span> <span>₹${tax.toLocaleString()}</span></div>
                <div class="total-row"><span>Shipping:</span> <span>${shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString()}</span></div>
                <hr>
                <div class="total-row final-total"><span><strong>Total:</strong></span> <span><strong>₹${finalTotal.toLocaleString()}</strong></span></div>
            `;
        }
    }

    // Bind checkout modal events
    bindCheckoutEvents() {
        // Close checkout modal
        const closeCheckoutModal = document.getElementById('close-checkout-modal');
        if (closeCheckoutModal) {
            closeCheckoutModal.onclick = () => {
                document.getElementById('checkout-modal').classList.remove('active');
            };
        }

        // Handle form submission
        const checkoutForm = document.getElementById('guest-checkout-form');
        if (checkoutForm) {
            checkoutForm.onsubmit = (e) => {
                e.preventDefault();
                this.processGuestOrder(e.target);
            };
        }
    }

    // Process guest order
    async processGuestOrder(form) {
        const formData = new FormData(form);

        // Validate form data
        const customerData = {
            name: formData.get('customer-name') || formData.get('customerName'),
            phone: formData.get('customer-phone') || formData.get('customerPhone'),  
            email: formData.get('customer-email') || formData.get('customerEmail'),
            address: formData.get('delivery-address') || formData.get('deliveryAddress'),
            city: formData.get('city'),
            pincode: formData.get('pincode'),
            paymentMethod: formData.get('payment')
        };

        // Basic validation
        if (!customerData.name || !customerData.phone || !customerData.email || !customerData.address || !customerData.city || !customerData.pincode) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!this.validateEmail(customerData.email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (!this.validatePhone(customerData.phone)) {
            this.showNotification('Please enter a valid phone number', 'error');
            return;
        }

        try {
            // Show loading state
            const submitButton = form.querySelector('.place-order-btn');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
            submitButton.disabled = true;

            // Generate order details
            const orderId = this.generateOrderId();
            const orderData = {
                orderId: orderId,
                customer: customerData,
                items: this.items,
                totals: {
                    subtotal: this.getSubtotal(),
                    tax: this.getTax(),
                    shipping: this.getShipping(),
                    total: this.getFinalTotal()
                },
                status: 'confirmed',
                orderDate: new Date().toISOString(),
                estimatedDelivery: this.calculateDeliveryDate()
            };

            // Simulate order processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Store order in localStorage for demo purposes
            this.storeGuestOrder(orderData);

            // Clear cart
            this.clearCart();

            // Close checkout modal
            document.getElementById('checkout-modal').classList.remove('active');

            // Show success message
            this.showOrderSuccess(orderId, customerData);

            // Analytics event
            this.trackEvent('purchase', {
                order_id: orderId,
                value: this.getFinalTotal(),
                currency: 'INR',
                items: this.items.length
            });

        } catch (error) {
            console.error('Order processing failed:', error);
            this.showNotification('Order failed. Please try again.', 'error');

            // Reset button
            const submitButton = form.querySelector('.place-order-btn');
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    // Generate unique order ID
    generateOrderId() {
        return 'BUY-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    // Store guest order in localStorage
    storeGuestOrder(orderData) {
        try {
            let guestOrders = JSON.parse(localStorage.getItem('buyonGuestOrders') || '[]');
            guestOrders.unshift(orderData); // Add to beginning

            // Keep only last 10 orders
            if (guestOrders.length > 10) {
                guestOrders = guestOrders.slice(0, 10);
            }

            localStorage.setItem('buyonGuestOrders', JSON.stringify(guestOrders));
        } catch (error) {
            console.error('Error storing guest order:', error);
        }
    }

    // Calculate estimated delivery date
    calculateDeliveryDate() {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days delivery
        return deliveryDate.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric', 
            month: 'long',
            day: 'numeric'
        });
    }

    // Show order success modal
    showOrderSuccess(orderId, customerData) {
        const estimatedDelivery = this.calculateDeliveryDate();

        const successModal = document.createElement('div');
        successModal.className = 'modal success-modal';
        successModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-body" style="text-align: center; padding: 3rem;">
                    <div class="success-icon" style="font-size: 4rem; color: #27ae60; margin-bottom: 1rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: #27ae60; margin-bottom: 1rem;">Order Placed Successfully!</h3>
                    <p style="margin-bottom: 1rem;">Order ID: <strong>${orderId}</strong></p>
                    <p style="margin-bottom: 1rem;">Thank you, <strong>${customerData.name}</strong>!</p>
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                        <p><strong>Delivery Address:</strong></p>
                        <p>${customerData.address}<br>${customerData.city} - ${customerData.pincode}</p>
                        <p style="margin-top: 1rem;"><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
                        <p><strong>Contact:</strong> ${customerData.phone}</p>
                    </div>
                    <p style="margin-bottom: 2rem; color: #666;">A confirmation email has been sent to ${customerData.email}</p>
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(successModal);
        successModal.classList.add('active');

        // Auto remove after 8 seconds
        setTimeout(() => {
            if (successModal.parentNode) {
                successModal.remove();
            }
        }, 8000);
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate phone number
    validatePhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    // Show notification
    showNotification(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (toast) {
            const toastIcon = toast.querySelector('.toast-icon');
            const toastMessage = toast.querySelector('.toast-message');

            // Set icon based on type
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

            // Auto hide after 4 seconds
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    }

    // Track analytics events (placeholder for Google Analytics or similar)
    trackEvent(eventName, eventData = {}) {
        try {
            // Google Analytics 4 event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, eventData);
            }

            // Facebook Pixel event tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', eventName, eventData);
            }

            console.log('Event tracked:', eventName, eventData);
        } catch (error) {
            console.error('Analytics tracking error:', error);
        }
    }

    // Get guest orders from localStorage
    getGuestOrders() {
        try {
            return JSON.parse(localStorage.getItem('buyonGuestOrders') || '[]');
        } catch (error) {
            console.error('Error loading guest orders:', error);
            return [];
        }
    }

    // Export cart data for backup
    exportCart() {
        return {
            items: this.items,
            total: this.getTotal(),
            itemCount: this.getItemCount(),
            exportedAt: new Date().toISOString()
        };
    }

    // Import cart data from backup
    importCart(cartData) {
        if (cartData && cartData.items && Array.isArray(cartData.items)) {
            this.items = cartData.items;
            this.saveCart();
            this.updateCartUI();
            this.showNotification('Cart restored successfully', 'success');
            return true;
        }
        return false;
    }

    // Get cart statistics
    getStats() {
        return {
            itemCount: this.getItemCount(),
            subtotal: this.getSubtotal(),
            tax: this.getTax(),
            shipping: this.getShipping(),
            total: this.getFinalTotal(),
            items: this.items.map(item => ({
                productId: item.productId,
                title: item.title,
                quantity: item.quantity,
                price: item.price
            }))
        };
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
    console.log('🛒 Shopping cart initialized (No Authentication)');
});

// Handle add to cart buttons globally
document.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
        const button = e.target.matches('.add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
        const productId = parseInt(button.dataset.productId);

        if (productId && window.cart) {
            window.cart.addItem(productId);
        }
    }
});

// Export cart class for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}
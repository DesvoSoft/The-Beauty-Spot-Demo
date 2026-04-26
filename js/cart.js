// cart.js - Static version for GitHub Pages
const CART_KEY = 'tbs_coquette_cart';

// Shared Analytics Tracking (no backend needed)
function trackAddToCart(productId) {
    console.log(`[Tracking] Evento AddToCart para producto: ${productId}`);
}


// Obtener carrito del local storage
function getCartItems() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

// Guardar carrito
function saveCartItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateGlobalCartCount();
}

// Limpiar carrito
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateGlobalCartCount();
}

// Añadir al carrito
function addToCart(product) {
    const items = getCartItems();
    const existing = items.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        items.push({ ...product, quantity: 1 });
    }
    
    saveCartItems(items);
    showToast(`${product.name} añadido al carrito`);
}

// Eliminar un item completo o restar uno
function removeFromCart(productId, removeAll = false) {
    let items = getCartItems();
    const existingIndex = items.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        if (removeAll || items[existingIndex].quantity === 1) {
            items.splice(existingIndex, 1);
        } else {
            items[existingIndex].quantity -= 1;
        }
        saveCartItems(items);
        // Si estamos en el checkout, refrescar
        if (typeof renderCheckout === 'function') {
            renderCheckout();
        }
    }
}

// Actualizar cantidad visual (Header icon)
function updateGlobalCartCount() {
    const items = getCartItems();
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    const counterEl = document.getElementById('global-cart-count');
    if (counterEl) {
        counterEl.innerText = count;
    }
}

// Renderizado HTML del carrito (Para inyectar en página)
function renderCartHtml() {
    const items = getCartItems();
    if (items.length === 0) {
        return '<p style="text-align:center; color: var(--soft-pink);">Tu carrito esta vacio. Agrega tus favoritos.</p>';
    }

    let html = '<ul style="list-style: none; padding: 0;">';
    items.forEach(item => {
        html += `
            <li style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid var(--glass-border);">
                <div style="flex: 1; margin-right: 15px;">
                    <strong style="color: var(--color-main);">${item.name}</strong> 
                    <div style="font-size: 0.9rem; color: var(--color-text); opacity: 0.8; margin-top: 5px;">₡${item.price.toLocaleString()} x ${item.quantity} = ₡${(item.price * item.quantity).toLocaleString()}</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="cart-action-btn cart-remove-one" data-id="${item.id}" style="background:none; border:none; color: var(--color-text); cursor:pointer; font-size: 1.2rem; display:flex; align-items:center; padding: 5px;" title="Reducir"><span class="material-symbols-outlined">remove</span></button>
                    <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                    <button class="cart-action-btn cart-add-one" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" style="background:none; border:none; color: var(--color-magenta); cursor:pointer; font-size: 1.2rem; display:flex; align-items:center; padding: 5px;" title="Aumentar"><span class="material-symbols-outlined">add</span></button>
                    <button class="cart-action-btn cart-remove-all" data-id="${item.id}" style="background:none; border:none; color: #ff4d4d; cursor:pointer; font-size: 1.2rem; margin-left: 10px; display:flex; align-items:center; padding: 5px;" title="Eliminar"><span class="material-symbols-outlined">delete</span></button>
                </div>
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

// Attach event delegation for dynamically generated cart items (Solves CSP inline script issue)
function attachCartListeners(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.addEventListener('click', (e) => {
        const target = e.target.closest('.cart-action-btn');
        if (!target) return;
        
        const id = target.getAttribute('data-id');
        
        if (target.classList.contains('cart-remove-one')) {
            removeFromCart(id, false);
        } else if (target.classList.contains('cart-remove-all')) {
            removeFromCart(id, true);
        } else if (target.classList.contains('cart-add-one')) {
            const name = target.getAttribute('data-name');
            const price = parseFloat(target.getAttribute('data-price'));
            addToCart({id, name, price});
            if (typeof renderCheckout === 'function') {
                renderCheckout();
            }
        }
    });
}

// Simple Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = 'var(--white-glass)';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.border = '1px solid rgba(255,105,180,0.5)';
    toast.style.color = 'var(--primary-magenta)';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '20px';
    toast.style.fontWeight = 'bold';
    toast.style.boxShadow = 'var(--shadow-coquette)';
    toast.style.zIndex = '1000';
    toast.style.transition = 'opacity 0.5s ease';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// Auto-inicializar Event Listeners para botones de agregar en productos
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalCartCount();
    initThemeToggle(); // Inicializar tema en todas las páginas
    
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = {
                id: e.target.getAttribute('data-id'),
                name: e.target.getAttribute('data-name'),
                price: parseFloat(e.target.getAttribute('data-price'))
            };
            addToCart(product);
        });
    });
});

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    
    // Cargar preferencia guardada o detectar sistema
    const savedTheme = localStorage.getItem('tbs-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    btn.innerHTML = savedTheme === 'dark' ? '<span class="material-symbols-outlined">light_mode</span>' : '<span class="material-symbols-outlined">dark_mode</span>';
    btn.setAttribute('aria-checked', savedTheme === 'dark');

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const target = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', target);
        localStorage.setItem('tbs-theme', target);
        
        btn.innerHTML = target === 'dark' ? '<span class="material-symbols-outlined">light_mode</span>' : '<span class="material-symbols-outlined">dark_mode</span>';
        btn.setAttribute('aria-checked', target === 'dark');
    });
}


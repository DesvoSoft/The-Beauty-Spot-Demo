document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    animateStats();
    initParticles();

    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }
});

async function fetchProducts() {
    const grid = document.getElementById('products-section');
    if (!grid) return;

    try {
        // Use shared products data
        let products = PRODUCTS_DATA.map(p => ({
            sku: p.sku,
            name: p.name,
            price: p.price,
            imageUrl: p.image,
            stock: p.stock
        }));

        // Si estamos en el home, solo mostrar Top 3
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            products = products.slice(0, 3);
        }

        grid.innerHTML = '';
        products.forEach((p, index) => {
            const isOutOfStock = p.stock === 0;
            const card = document.createElement('article');
            card.className = `card ${isOutOfStock ? 'out-of-stock' : ''}`;
            // Hacer toda la tarjeta clickeable
            card.onclick = () => { window.location.href = `product.html?id=${p.sku}`; };
            // Añadir delay de animación secuencial
            card.style.animationDelay = `${0.1 + (index * 0.2)}s`;
            
            card.innerHTML = `
                ${isOutOfStock ? '<div class="agotado-badge">Agotado</div>' : ''}
                <div style="text-decoration:none; color:inherit; display:flex; flex-direction:column; flex:1;">
                    <img src="${p.imageUrl}" alt="${p.name}" class="card-img" loading="lazy">
                    <h3 style="margin-bottom: auto;">${p.name}</h3>
                </div>
                <div class="price">₡${p.price.toLocaleString()}</div>
                <button class="btn-add add-to-cart btn-cart-handler" data-id="${p.sku}" data-name="${p.name}" data-price="${p.price}" ${isOutOfStock ? 'disabled' : ''}>
                    ${isOutOfStock ? 'Agotado' : 'Añadir <span class="material-symbols-outlined" style="font-size:18px;">add_shopping_cart</span>'}
                </button>
            `;
            
            // Adjuntar listener del card (usando addEventListener en lugar de property)
            card.addEventListener('click', () => { window.location.href = `product.html?id=${p.sku}`; });
            
            // Adjuntar listener del botón
            const btn = card.querySelector('.btn-cart-handler');
            if (btn) {
                btn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (!isOutOfStock && typeof trackAddToCart === 'function') {
                        trackAddToCart(p.sku);
                    }
                });
            }
            
            grid.appendChild(card);
        });
    } catch (err) {
        console.error('Error al cargar productos:', err);
    }
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const suffix = stat.getAttribute('data-suffix') || '';
        let count = 0;
        const increment = target / 50;
        
        const update = () => {
            count += increment;
            if (count < target) {
                stat.innerText = Math.ceil(count) + suffix;
                requestAnimationFrame(update);
            } else {
                stat.innerText = target + suffix;
            }
        };
        update();
    });
}

function initParticles() {
    const layer = document.getElementById('particles-layer');
    if (!layer) return;

    for (let i = 0; i < 45; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        const size = (Math.random() * 3 + 2) + 'px';
        p.style.width = size;
        p.style.height = size;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '-' + (Math.random() * 20) + 'vh';
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        
        layer.appendChild(p);
    }
}

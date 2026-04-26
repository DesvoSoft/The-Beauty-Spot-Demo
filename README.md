# The Beauty Spot - Demo (Static)

Versión completamente estática de The Beauty Spot e-commerce lista para desplegar en GitHub Pages.

## Qué Incluye

- 4 páginas HTML (inicio, productos, detalle de producto, checkout)
- CSS con animaciones
- JavaScript (carrito, datos de productos, página de inicio)
- Todos los assets (logos, íconos)
- Carrito basado en localStorage (persiste entre visitas)

## Desplegar en GitHub Pages

1. **Subir a GitHub:**
   ```
   git init
   git add .
   git commit -m "Initial demo"
   ```

2. **Configurar GitHub Pages:**
   - Ir a Configuración del repositorio → Pages
   - Origen: Desplegar desde rama
   - Rama: main
   - Carpeta: / (raíz)

3. **¡Listo!** Tu sitio estará en `https://username.github.io/repo-name`

## Cómo Funciona

- **Productos:** Cargados desde `js/products-data.js` (sin API)
- **Carrito:** Usa localStorage (sin base de datos)
- **Checkout:** Genera enlace directo a WhatsApp (sin backend)
- **Seguimiento:** Registra solo en consola (sin analytics)

## Estructura de Archivos

```
Github Demo/
├── index.html          (inicio)
├── products.html      (todos los productos)
├── product.html      (producto individual)
├── checkout.html     (carrito + checkout)
├── css/
│   └── index.css
├── js/
│   ├── products-data.js   (todos los productos)
│   ├── landing.js      (lógica de página de inicio)
│   └── cart.js        (carrito + tema)
└── assets/         (logos, íconos)
```

## Probar Localmente

Simplemente abre `index.html` en tu navegador, o usa un servidor HTTP simple:

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .
```

Luego visita `http://localhost:8000`

## Nota

Esta es una **demo** para presentación. Para una tienda en producción, necesitarías:
- Backend para procesamiento de pedidos
- Integración de pagos (SINPE)
- Notificaciones por email
- Gestión de inventario
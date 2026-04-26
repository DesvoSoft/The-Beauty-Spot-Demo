// Shared products data - used by all pages
const PRODUCTS_DATA = [
    { sku: 'TBS-101', name: 'Velvet Rose Lipstick', price: 12500, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600', category: 'labios', description: 'Labio velvet de larga duración con acabado mate. Fórmula enriquecida con vitamina E para hidratación profunda.', stock: 15 },
    { sku: 'TBS-102', name: 'Luminous Glow Serum', price: 18900, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600', category: 'rostro', description: 'Sero iluminador con vitamina C al 20%. Ilumina tu piel naturalmente.', stock: 8 },
    { sku: 'TBS-103', name: 'Velvet Touch Blush', price: 9800, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600', category: 'rostro', description: 'Rubor en crema con efecto natural duradero. Textura sedosa.', stock: 20 },
    { sku: 'TBS-104', name: 'Precision Eyeliner', price: 7500, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600', category: 'ojos', description: 'Delineador líquido de larga duración. Punta ultrafina precisa.', stock: 12 },
    { sku: 'TBS-105', name: 'Hydra Boost Mist', price: 8500, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=600', category: 'rostro', description: 'Bruma hidratante con aloe y pepino. Refresca tu piel al instante.', stock: 25 },
    { sku: 'TBS-106', name: 'Volumizing Mascara', price: 11000, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9ad98a?w=600', category: 'ojos', description: 'Máscara que da volumen extrema sin crueldad. Libre de parabenos.', stock: 10 },
    { sku: 'TBS-107', name: 'Nude Palette Set', price: 22000, image: 'https://images.unsplash.com/photo-1599305090598-17806906f5b2?w=600', category: 'ojos', description: 'Paleta de sombras neutrales 12 tonos. Perfecta para todo look.', stock: 5 },
    { sku: 'TBS-108', name: 'Silk Primer', price: 14500, image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600', category: 'rostro', description: 'Pre-base iluminadora con partículas de seda. Prepara tu rostro.', stock: 18 }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRODUCTS_DATA;
}
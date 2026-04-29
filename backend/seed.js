const mongoose = require('mongoose');
const Item = require('./models/Item');

mongoose.connect('mongodb://localhost:27017/orderapp').then(async () => {
  await Item.deleteMany();
  await Item.insertMany([
    // Featured Items
    { name: 'Floral Wrap Dress', description: 'Elegant floral print wrap dress', price: 19.99, category: 'Women', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', badge: 'NEW', isFeatured: true },
    { name: 'Oversized Graphic Tee', description: 'Relaxed fit graphic print tee', price: 11.99, category: 'Men', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', badge: 'NEW', isFeatured: true },
    { name: 'Bikini Set', description: 'Tropical print bikini set', price: 16.99, category: 'Beachwear', image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400', badge: 'HOT', isFeatured: true },
    
    // Sale Items
    { name: 'High Waist Jeans', description: 'Classic high waist skinny jeans', price: 24.99, salePrice: 17.99, category: 'Women', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', badge: 'SALE', isOnSale: true },
    { name: 'Linen Shirt', description: 'Breathable summer linen shirt', price: 17.99, salePrice: 12.99, category: 'Men', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', badge: 'SALE', isOnSale: true },
    { name: 'White Sneakers', description: 'Classic clean white sneakers', price: 29.99, salePrice: 19.99, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', badge: 'SALE', isOnSale: true },
    
    // Regular Items
    { name: 'Ribbed Crop Top', description: 'Stretchy ribbed crop top', price: 8.99, category: 'Women', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=400', badge: '' },
    { name: 'Satin Slip Skirt', description: 'Silky satin midi slip skirt', price: 14.99, category: 'Women', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', badge: '' },
    { name: 'Slim Fit Chinos', description: 'Smart casual slim fit chinos', price: 22.99, category: 'Men', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', badge: '' },
    { name: 'Jogger Pants', description: 'Comfortable everyday joggers', price: 15.99, category: 'Men', image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400', badge: 'HOT' },
    { name: 'Dino Print Tee', description: 'Fun dinosaur print kids tee', price: 6.99, category: 'Kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', badge: '' },
    { name: 'Ruffle Dress', description: 'Cute ruffle hem girls dress', price: 9.99, category: 'Kids', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', badge: 'NEW' },
    { name: 'Board Shorts', description: 'Quick dry surf board shorts', price: 13.99, category: 'Beachwear', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', badge: '' },
    { name: 'Strappy Heels', description: 'Elegant strappy block heels', price: 25.99, category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', badge: 'NEW' },
    { name: 'Gold Hoop Earrings', description: 'Lightweight gold tone hoops', price: 4.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', badge: '' },
    { name: 'Woven Tote Bag', description: 'Stylish woven summer tote', price: 18.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', badge: 'HOT' },
    { name: 'Mini Bodycon Dress', description: 'Sleek bodycon mini dress', price: 17.99, category: 'Dresses', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400', badge: 'NEW' },
    { name: 'Boho Maxi Dress', description: 'Flowy bohemian maxi dress', price: 21.99, category: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', badge: '' },
    { name: 'Off Shoulder Top', description: 'Trendy off shoulder blouse', price: 10.99, category: 'Tops', image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400', badge: '' },
    { name: 'Tie-Dye Crop', description: 'Vibrant tie-dye crop top', price: 9.49, category: 'Tops', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400', badge: 'HOT' },
  ]);
  console.log('Seeded 20 items with featured and sale flags!');
  process.exit();
});

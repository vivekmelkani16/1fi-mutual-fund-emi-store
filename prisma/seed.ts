import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding 1Fi EMI Store database...');

  // Clean existing tables
  await prisma.order.deleteMany();
  await prisma.emiPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  // 1. iPhone 17 Pro (Reference Product from Assignment PDF)
  const iphone = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      brand: 'Apple',
      badge: 'NEW',
      description: 'The ultimate iPhone with titanium design, revolutionary camera system, and ultra-fast A19 Pro chip.',
      variants: {
        create: [
          {
            name: '256GB Silver',
            color: 'Silver',
            colorHex: '#E2E8F0',
            storage: '256GB',
            finish: 'Natural Titanium',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
            isDefault: true,
          },
          {
            name: '512GB Cosmic Bronze',
            color: 'Cosmic Orange',
            colorHex: '#EA580C',
            storage: '512GB',
            finish: 'Cosmic Bronze',
            mrp: 154900,
            price: 147400,
            imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
          {
            name: '1TB Deep Titanium',
            color: 'Deep Blue',
            colorHex: '#1E3A8A',
            storage: '1TB',
            finish: 'Deep Titanium',
            mrp: 174900,
            price: 167400,
            imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          { monthlyAmount: 44967, tenureMonths: 3, interestRate: 0.0, cashbackAmount: 7500, isPopular: false },
          { monthlyAmount: 22483, tenureMonths: 6, interestRate: 0.0, cashbackAmount: 7500, isPopular: false },
          { monthlyAmount: 11242, tenureMonths: 12, interestRate: 0.0, cashbackAmount: 7500, isPopular: true },
          { monthlyAmount: 5621, tenureMonths: 24, interestRate: 0.0, cashbackAmount: 7500, isPopular: false },
          { monthlyAmount: 4297, tenureMonths: 36, interestRate: 10.5, cashbackAmount: 7500, isPopular: false },
          { monthlyAmount: 3385, tenureMonths: 48, interestRate: 10.5, cashbackAmount: 7500, isPopular: false },
          { monthlyAmount: 2842, tenureMonths: 60, interestRate: 10.5, cashbackAmount: 7500, isPopular: false },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      badge: 'BESTSELLER',
      description: 'Galaxy AI is here. Epic titanium exterior with built-in S Pen and 200MP camera capability.',
      variants: {
        create: [
          {
            name: '256GB Titanium Gray',
            color: 'Titanium Gray',
            colorHex: '#64748B',
            storage: '256GB',
            finish: 'Titanium',
            mrp: 139999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
            isDefault: true,
          },
          {
            name: '512GB Titanium Black',
            color: 'Titanium Black',
            colorHex: '#0F172A',
            storage: '512GB',
            finish: 'Titanium',
            mrp: 149999,
            price: 139999,
            imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
          {
            name: '1TB Titanium Violet',
            color: 'Titanium Violet',
            colorHex: '#5B21B6',
            storage: '1TB',
            finish: 'Titanium',
            mrp: 169999,
            price: 159999,
            imageUrl: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          { monthlyAmount: 43333, tenureMonths: 3, interestRate: 0.0, cashbackAmount: 6000, isPopular: false },
          { monthlyAmount: 21666, tenureMonths: 6, interestRate: 0.0, cashbackAmount: 6000, isPopular: false },
          { monthlyAmount: 10833, tenureMonths: 12, interestRate: 0.0, cashbackAmount: 6000, isPopular: true },
          { monthlyAmount: 5416, tenureMonths: 24, interestRate: 0.0, cashbackAmount: 6000, isPopular: false },
          { monthlyAmount: 4198, tenureMonths: 36, interestRate: 10.5, cashbackAmount: 6000, isPopular: false },
          { monthlyAmount: 3307, tenureMonths: 48, interestRate: 10.5, cashbackAmount: 6000, isPopular: false },
          { monthlyAmount: 2776, tenureMonths: 60, interestRate: 10.5, cashbackAmount: 6000, isPopular: false },
        ],
      },
    },
  });

  // 3. MacBook Pro M3
  const macbook = await prisma.product.create({
    data: {
      slug: 'macbook-pro-m3',
      name: 'MacBook Pro M3',
      brand: 'Apple',
      badge: 'TOP VALUE',
      description: 'Mind-blowing performance with M3 chip, Liquid Retina XDR display, and up to 22 hours of battery life.',
      variants: {
        create: [
          {
            name: '512GB Space Black',
            color: 'Space Black',
            colorHex: '#18181B',
            storage: '512GB',
            finish: 'Anodized Aluminium',
            mrp: 169900,
            price: 159900,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
            isDefault: true,
          },
          {
            name: '1TB Silver',
            color: 'Silver',
            colorHex: '#CBD5E1',
            storage: '1TB',
            finish: 'Anodized Aluminium',
            mrp: 189900,
            price: 179900,
            imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
          {
            name: '2TB Space Black',
            color: 'Space Black',
            colorHex: '#18181B',
            storage: '2TB',
            finish: 'Anodized Aluminium',
            mrp: 229900,
            price: 219900,
            imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          { monthlyAmount: 53300, tenureMonths: 3, interestRate: 0.0, cashbackAmount: 10000, isPopular: false },
          { monthlyAmount: 26650, tenureMonths: 6, interestRate: 0.0, cashbackAmount: 10000, isPopular: false },
          { monthlyAmount: 13325, tenureMonths: 12, interestRate: 0.0, cashbackAmount: 10000, isPopular: true },
          { monthlyAmount: 6662, tenureMonths: 24, interestRate: 0.0, cashbackAmount: 10000, isPopular: false },
          { monthlyAmount: 5164, tenureMonths: 36, interestRate: 10.5, cashbackAmount: 10000, isPopular: false },
          { monthlyAmount: 4068, tenureMonths: 48, interestRate: 10.5, cashbackAmount: 10000, isPopular: false },
          { monthlyAmount: 3415, tenureMonths: 60, interestRate: 10.5, cashbackAmount: 10000, isPopular: false },
        ],
      },
    },
  });

  // 4. Google Pixel 9 Pro
  const pixel = await prisma.product.create({
    data: {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      brand: 'Google',
      badge: 'AI POWERED',
      description: 'The most powerful Pixel yet with Gemini AI integration, Tensor G4 processor, and pro-level triple camera system.',
      variants: {
        create: [
          {
            name: '128GB Hazel',
            color: 'Hazel',
            colorHex: '#475569',
            storage: '128GB',
            finish: 'Matte Glass',
            mrp: 109999,
            price: 99999,
            imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
            isDefault: true,
          },
          {
            name: '256GB Porcelain',
            color: 'Porcelain',
            colorHex: '#F8FAFC',
            storage: '256GB',
            finish: 'Matte Glass',
            mrp: 119999,
            price: 109999,
            imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
          {
            name: '512GB Obsidian',
            color: 'Obsidian',
            colorHex: '#0F172A',
            storage: '512GB',
            finish: 'Matte Glass',
            mrp: 139999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          { monthlyAmount: 33333, tenureMonths: 3, interestRate: 0.0, cashbackAmount: 5000, isPopular: false },
          { monthlyAmount: 16666, tenureMonths: 6, interestRate: 0.0, cashbackAmount: 5000, isPopular: false },
          { monthlyAmount: 8333, tenureMonths: 12, interestRate: 0.0, cashbackAmount: 5000, isPopular: true },
          { monthlyAmount: 4166, tenureMonths: 24, interestRate: 0.0, cashbackAmount: 5000, isPopular: false },
          { monthlyAmount: 3229, tenureMonths: 36, interestRate: 10.5, cashbackAmount: 5000, isPopular: false },
          { monthlyAmount: 2544, tenureMonths: 48, interestRate: 10.5, cashbackAmount: 5000, isPopular: false },
          { monthlyAmount: 2135, tenureMonths: 60, interestRate: 10.5, cashbackAmount: 5000, isPopular: false },
        ],
      },
    },
  });

  console.log(`Database successfully seeded with products: ${iphone.name}, ${samsung.name}, ${macbook.name}, ${pixel.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

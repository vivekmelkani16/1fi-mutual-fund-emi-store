-- 1Fi SDE1 Assignment - Database Seed Data (SQLite)

-- Clean existing data
DELETE FROM "Order";
DELETE FROM "EmiPlan";
DELETE FROM "ProductVariant";
DELETE FROM "Product";

-- Insert Products
INSERT INTO "Product" ("id", "slug", "name", "brand", "description", "badge", "createdAt") VALUES
('prod-iphone17', 'iphone-17-pro', 'iPhone 17 Pro', 'Apple', 'The ultimate iPhone with titanium design, revolutionary camera system, and ultra-fast A19 Pro chip.', 'NEW', CURRENT_TIMESTAMP),
('prod-s24ultra', 'samsung-s24-ultra', 'Samsung Galaxy S24 Ultra', 'Samsung', 'Galaxy AI is here. Epic titanium exterior with built-in S Pen and 200MP camera capability.', 'BESTSELLER', CURRENT_TIMESTAMP),
('prod-macbookm3', 'macbook-pro-m3', 'MacBook Pro M3', 'Apple', 'Mind-blowing performance with M3 chip, Liquid Retina XDR display, and up to 22 hours of battery life.', 'TOP VALUE', CURRENT_TIMESTAMP),
('prod-pixel9pro', 'google-pixel-9-pro', 'Google Pixel 9 Pro', 'Google', 'The most powerful Pixel yet with Gemini AI integration, Tensor G4 processor, and pro-level triple camera system.', 'AI POWERED', CURRENT_TIMESTAMP);

-- Insert Product Variants (iPhone 17 Pro)
INSERT INTO "ProductVariant" ("id", "productId", "name", "color", "colorHex", "storage", "finish", "mrp", "price", "imageUrl", "isDefault") VALUES
('var-iph17-256', 'prod-iphone17', '256GB Silver', 'Silver', '#E2E8F0', '256GB', 'Natural Titanium', 134900, 127400, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', 1),
('var-iph17-512', 'prod-iphone17', '512GB Cosmic Bronze', 'Cosmic Orange', '#EA580C', '512GB', 'Cosmic Bronze', 154900, 147400, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop', 0),
('var-iph17-1tb', 'prod-iphone17', '1TB Deep Titanium', 'Deep Blue', '#1E3A8A', '1TB', 'Deep Titanium', 174900, 167400, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop', 0);

-- Insert Product Variants (Samsung S24 Ultra)
INSERT INTO "ProductVariant" ("id", "productId", "name", "color", "colorHex", "storage", "finish", "mrp", "price", "imageUrl", "isDefault") VALUES
('var-s24-256', 'prod-s24ultra', '256GB Titanium Gray', 'Titanium Gray', '#64748B', '256GB', 'Titanium', 139999, 129999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop', 1),
('var-s24-512', 'prod-s24ultra', '512GB Titanium Black', 'Titanium Black', '#0F172A', '512GB', 'Titanium', 149999, 139999, 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop', 0),
('var-s24-1tb', 'prod-s24ultra', '1TB Titanium Violet', 'Titanium Violet', '#5B21B6', '1TB', 'Titanium', 169999, 159999, 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=800&auto=format&fit=crop', 0);

-- Insert Product Variants (MacBook Pro M3)
INSERT INTO "ProductVariant" ("id", "productId", "name", "color", "colorHex", "storage", "finish", "mrp", "price", "imageUrl", "isDefault") VALUES
('var-mac-512', 'prod-macbookm3', '512GB Space Black', 'Space Black', '#18181B', '512GB', 'Anodized Aluminium', 169900, 159900, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', 1),
('var-mac-1tb', 'prod-macbookm3', '1TB Silver', 'Silver', '#CBD5E1', '1TB', 'Anodized Aluminium', 189900, 179900, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop', 0),
('var-mac-2tb', 'prod-macbookm3', '2TB Space Black', 'Space Black', '#18181B', '2TB', 'Anodized Aluminium', 229900, 219900, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop', 0);

-- Insert Product Variants (Pixel 9 Pro)
INSERT INTO "ProductVariant" ("id", "productId", "name", "color", "colorHex", "storage", "finish", "mrp", "price", "imageUrl", "isDefault") VALUES
('var-pix-128', 'prod-pixel9pro', '128GB Hazel', 'Hazel', '#475569', '128GB', 'Matte Glass', 109999, 99999, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop', 1),
('var-pix-256', 'prod-pixel9pro', '256GB Porcelain', 'Porcelain', '#F8FAFC', '256GB', 'Matte Glass', 119999, 109999, 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop', 0),
('var-pix-512', 'prod-pixel9pro', '512GB Obsidian', 'Obsidian', '#0F172A', '512GB', 'Matte Glass', 139999, 129999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', 0);

-- Insert EMI Plans (iPhone 17 Pro - Reference Values from PDF)
INSERT INTO "EmiPlan" ("id", "productId", "monthlyAmount", "tenureMonths", "interestRate", "cashbackAmount", "isPopular") VALUES
('emi-iph-3m', 'prod-iphone17', 44967, 3, 0.0, 7500, 0),
('emi-iph-6m', 'prod-iphone17', 22483, 6, 0.0, 7500, 0),
('emi-iph-12m', 'prod-iphone17', 11242, 12, 0.0, 7500, 1),
('emi-iph-24m', 'prod-iphone17', 5621, 24, 0.0, 7500, 0),
('emi-iph-36m', 'prod-iphone17', 4297, 36, 10.5, 7500, 0),
('emi-iph-48m', 'prod-iphone17', 3385, 48, 10.5, 7500, 0),
('emi-iph-60m', 'prod-iphone17', 2842, 60, 10.5, 7500, 0);

-- Insert EMI Plans (Samsung Galaxy S24 Ultra)
INSERT INTO "EmiPlan" ("id", "productId", "monthlyAmount", "tenureMonths", "interestRate", "cashbackAmount", "isPopular") VALUES
('emi-s24-3m', 'prod-s24ultra', 43333, 3, 0.0, 6000, 0),
('emi-s24-6m', 'prod-s24ultra', 21666, 6, 0.0, 6000, 0),
('emi-s24-12m', 'prod-s24ultra', 10833, 12, 0.0, 6000, 1),
('emi-s24-24m', 'prod-s24ultra', 5416, 24, 0.0, 6000, 0),
('emi-s24-36m', 'prod-s24ultra', 4198, 36, 10.5, 6000, 0),
('emi-s24-48m', 'prod-s24ultra', 3307, 48, 10.5, 6000, 0),
('emi-s24-60m', 'prod-s24ultra', 2776, 60, 10.5, 6000, 0);

-- Insert EMI Plans (MacBook Pro M3)
INSERT INTO "EmiPlan" ("id", "productId", "monthlyAmount", "tenureMonths", "interestRate", "cashbackAmount", "isPopular") VALUES
('emi-mac-3m', 'prod-macbookm3', 53300, 3, 0.0, 10000, 0),
('emi-mac-6m', 'prod-macbookm3', 26650, 6, 0.0, 10000, 0),
('emi-mac-12m', 'prod-macbookm3', 13325, 12, 0.0, 10000, 1),
('emi-mac-24m', 'prod-macbookm3', 6662, 24, 0.0, 10000, 0),
('emi-mac-36m', 'prod-macbookm3', 5164, 36, 10.5, 10000, 0),
('emi-mac-48m', 'prod-macbookm3', 4068, 48, 10.5, 10000, 0),
('emi-mac-60m', 'prod-macbookm3', 3415, 60, 10.5, 10000, 0);

-- Insert EMI Plans (Google Pixel 9 Pro)
INSERT INTO "EmiPlan" ("id", "productId", "monthlyAmount", "tenureMonths", "interestRate", "cashbackAmount", "isPopular") VALUES
('emi-pix-3m', 'prod-pixel9pro', 33333, 3, 0.0, 5000, 0),
('emi-pix-6m', 'prod-pixel9pro', 16666, 6, 0.0, 5000, 0),
('emi-pix-12m', 'prod-pixel9pro', 8333, 12, 0.0, 5000, 1),
('emi-pix-24m', 'prod-pixel9pro', 4166, 24, 0.0, 5000, 0),
('emi-pix-36m', 'prod-pixel9pro', 3229, 36, 10.5, 5000, 0),
('emi-pix-48m', 'prod-pixel9pro', 2544, 48, 10.5, 5000, 0),
('emi-pix-60m', 'prod-pixel9pro', 2135, 60, 10.5, 5000, 0);

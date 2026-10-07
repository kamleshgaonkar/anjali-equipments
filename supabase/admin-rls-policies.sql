-- Anjali Equipments admin catalogue privileges + RLS
-- Run this in the Supabase SQL Editor.
-- Do NOT disable RLS.
--
-- Current issue observed with the anon key:
-- permission denied for table categories / product_groups / products
-- (table privileges are missing for anon/authenticated).

-- -------------------------------------------------
-- 1) Table privileges
-- -------------------------------------------------

-- Public website / anonymous users: read only
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.product_groups TO anon, authenticated;
GRANT SELECT ON public.products TO anon, authenticated;

-- Authenticated admin users: manage catalogue
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_groups TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- -------------------------------------------------
-- 2) Enable RLS (keep enabled)
-- -------------------------------------------------

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------
-- 3) Read policies (public catalogue)
-- -------------------------------------------------

DROP POLICY IF EXISTS "Public can read categories" ON public.categories;
CREATE POLICY "Public can read categories"
ON public.categories
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public can read product groups" ON public.product_groups;
CREATE POLICY "Public can read product groups"
ON public.product_groups
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public can read products" ON public.products;
CREATE POLICY "Public can read products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (true);

-- -------------------------------------------------
-- 4) Authenticated write policies (admin portal)
-- -------------------------------------------------

DROP POLICY IF EXISTS "Authenticated can insert categories" ON public.categories;
CREATE POLICY "Authenticated can insert categories"
ON public.categories
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can update categories" ON public.categories;
CREATE POLICY "Authenticated can update categories"
ON public.categories
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can delete categories" ON public.categories;
CREATE POLICY "Authenticated can delete categories"
ON public.categories
FOR DELETE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated can insert product groups" ON public.product_groups;
CREATE POLICY "Authenticated can insert product groups"
ON public.product_groups
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can update product groups" ON public.product_groups;
CREATE POLICY "Authenticated can update product groups"
ON public.product_groups
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can delete product groups" ON public.product_groups;
CREATE POLICY "Authenticated can delete product groups"
ON public.product_groups
FOR DELETE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated can insert products" ON public.products;
CREATE POLICY "Authenticated can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can update products" ON public.products;
CREATE POLICY "Authenticated can update products"
ON public.products
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can delete products" ON public.products;
CREATE POLICY "Authenticated can delete products"
ON public.products
FOR DELETE
TO authenticated
USING (true);

-- -------------------------------------------------
-- 5) Storage policies for bucket: product-images
-- -------------------------------------------------
-- Public read for website images.
-- Authenticated write for admin uploads.

DROP POLICY IF EXISTS "Public can read product images" ON storage.objects;
CREATE POLICY "Public can read product images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Authenticated can upload product images" ON storage.objects;
CREATE POLICY "Authenticated can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Authenticated can update product images" ON storage.objects;
CREATE POLICY "Authenticated can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Authenticated can delete product images" ON storage.objects;
CREATE POLICY "Authenticated can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- See supabase/projects.sql for the projects table, RLS, and Data API grants.

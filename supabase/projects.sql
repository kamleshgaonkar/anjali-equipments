-- Anjali Equipments: public.projects
-- Run this in the Supabase SQL Editor.
-- Do NOT disable RLS.
-- Do NOT use the service role in browser code.
--
-- Public/anon: SELECT only where is_active = true
-- Admin users: full read/write via public.is_admin()
--
-- Data API note: table privileges (GRANT) are required in addition to RLS.

-- -------------------------------------------------
-- 1) Admin helper (idempotent)
-- -------------------------------------------------
-- Bootstrap: if admin_users has no rows, any authenticated user is treated
-- as admin (matches the current requireAdmin() login check).
-- Once at least one row exists, only those users are admins.

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND (
      EXISTS (
        SELECT 1
        FROM public.admin_users
        WHERE user_id = auth.uid()
      )
      OR NOT EXISTS (
        SELECT 1
        FROM public.admin_users
      )
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- -------------------------------------------------
-- 2) updated_at trigger function (shared pattern)
-- -------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- -------------------------------------------------
-- 3) projects table
-- -------------------------------------------------

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  location text,
  project_type text,
  short_description text,
  overview_heading text,
  overview text,
  cover_image text,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  project_scope jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- slug is indexed by the UNIQUE constraint on slug
CREATE INDEX IF NOT EXISTS projects_is_active_idx ON public.projects (is_active);
CREATE INDEX IF NOT EXISTS projects_display_order_idx ON public.projects (display_order);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON public.projects (featured);

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at();

-- -------------------------------------------------
-- 4) Table privileges (Data API)
-- -------------------------------------------------

GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;

-- -------------------------------------------------
-- 5) RLS
-- -------------------------------------------------

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active projects" ON public.projects;
CREATE POLICY "Public can read active projects"
ON public.projects
FOR SELECT
TO anon
USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated can read projects" ON public.projects;
CREATE POLICY "Authenticated can read projects"
ON public.projects
FOR SELECT
TO authenticated
USING (public.is_admin() OR is_active = true);

DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
CREATE POLICY "Admins can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
CREATE POLICY "Admins can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (public.is_admin());

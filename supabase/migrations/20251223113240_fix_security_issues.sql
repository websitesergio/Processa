/*
  # Fix Database Security Issues

  ## Overview
  This migration addresses critical security vulnerabilities identified in the database:
  1. Removes unused indexes to reduce overhead
  2. Consolidates duplicate RLS policies
  3. Adds missing RLS policies for junction table
  4. Fixes function search_path vulnerability

  ## Changes

  ### 1. Remove Unused Indexes
  - Drop `idx_contact_submissions_created_at` - not being utilized by queries
  - Drop `idx_css_submission_id` - redundant with foreign key index
  - Drop `idx_css_service_id` - not being utilized by queries

  ### 2. Fix Multiple Permissive Policies
  - Remove duplicate INSERT policies for anon role on contact_submissions
  - Keep single consolidated policy: "Allow anonymous inserts"
  - Remove redundant policies: "contact_submissions_insert_anon", "contact_submissions_insert_authenticated"

  ### 3. Add RLS Policies for contact_submission_services
  - Add INSERT policy for anon users (allows form submissions)
  - Add SELECT policy for authenticated users (admin access)
  - Ensures security without blocking legitimate operations

  ### 4. Fix Function Search Path
  - Set explicit search_path on create_contact_submission function
  - Prevents search_path injection attacks
  - Maintains SECURITY DEFINER safety

  ## Security Impact
  - Reduced attack surface by removing unused indexes
  - Eliminated policy conflicts and ambiguity
  - Protected junction table with proper RLS
  - Hardened function against injection attacks
*/

-- 1. Remove unused indexes
DROP INDEX IF EXISTS idx_contact_submissions_created_at;
DROP INDEX IF EXISTS idx_css_submission_id;
DROP INDEX IF EXISTS idx_css_service_id;

-- 2. Remove duplicate INSERT policies for contact_submissions
DROP POLICY IF EXISTS "contact_submissions_insert_anon" ON contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_insert_authenticated" ON contact_submissions;

-- Keep only the main anonymous insert policy (it already exists as "Allow anonymous inserts")

-- 3. Add RLS policies for contact_submission_services table
-- Allow anonymous users to insert services when submitting the form
CREATE POLICY "Allow anonymous service inserts"
  ON contact_submission_services
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all submission services
CREATE POLICY "Authenticated users can view services"
  ON contact_submission_services
  FOR SELECT
  TO authenticated
  USING (true);

-- 4. Fix function search_path security issue
-- Recreate the function with explicit search_path
CREATE OR REPLACE FUNCTION public.create_contact_submission(
  p_name text,
  p_email text,
  p_company text,
  p_phone text,
  p_message text,
  p_source text,
  p_page_url text,
  p_services jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
declare
  v_id uuid;
begin
  insert into public.contact_submissions (name, email, company, phone, message, source, page_url)
  values (p_name, p_email, nullif(p_company,''), nullif(p_phone,''), p_message, p_source, p_page_url)
  returning id into v_id;

  -- p_services example:
  -- [
  --   {"id":"ai-chat","name":"AI Chat Support","setupType":"typical"},
  --   {"id":"crm","name":"CRM Integration","setupType":"custom"}
  -- ]
  if p_services is not null and jsonb_typeof(p_services) = 'array' then
    insert into public.contact_submission_services (submission_id, service_id, service_name, setup_type)
    select
      v_id,
      (elem->>'id')::text,
      (elem->>'name')::text,
      nullif((elem->>'setupType')::text,'')
    from jsonb_array_elements(p_services) as elem
    where coalesce(elem->>'id','') <> '';
  end if;

  return v_id;
end;
$$;
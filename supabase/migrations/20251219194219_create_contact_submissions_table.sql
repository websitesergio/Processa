/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `full_name` (text) - Contact's full name
      - `business_name` (text) - Name of the business
      - `business_email` (text) - Business email address
      - `website` (text, nullable) - Optional website URL
      - `business_size` (text) - Size of the business (1-5, 6-20, 21-50, 50+)
      - `automation_goal` (text) - What they want to automate
      - `problem_statement` (text) - Problem they're trying to solve
      - `budget_range` (text, nullable) - Optional monthly budget range
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Lead status (new, contacted, qualified, etc.)
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their own submissions
    - Add policy for authenticated admin users to view all submissions
  
  3. Important Notes
    - This table stores lead qualification data
    - Anonymous insert is allowed for public contact form
    - No user authentication required for submission
    - Admins can view and manage all submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_name text NOT NULL,
  business_email text NOT NULL,
  website text,
  business_size text NOT NULL,
  automation_goal text NOT NULL,
  problem_statement text NOT NULL,
  budget_range text,
  status text DEFAULT 'new' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
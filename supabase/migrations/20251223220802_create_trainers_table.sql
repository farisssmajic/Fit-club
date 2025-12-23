/*
  # Create trainers table

  1. New Tables
    - `trainers`
      - `id` (uuid, primary key)
      - `name` (text, trainer full name)
      - `specialty` (text, specialization area)
      - `bio` (text, trainer biography)
      - `experience_years` (int, years of experience)
      - `image_url` (text, trainer profile image)
      - `rating` (numeric, trainer rating 1-5)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on `trainers` table
    - Add policy for public to view trainers
    - Admin only can manage trainers
*/

CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  bio text,
  experience_years int DEFAULT 0,
  image_url text,
  rating numeric DEFAULT 4.5,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view trainers"
  ON trainers
  FOR SELECT
  TO anon, authenticated
  USING (true);

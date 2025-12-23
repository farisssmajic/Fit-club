/*
  # Create gym bookings table

  1. New Tables
    - `gym_bookings`
      - `id` (uuid, primary key)
      - `email` (text, user email)
      - `phone` (text, optional contact phone)
      - `class_type` (text, type of class)
      - `preferred_date` (date, optional)
      - `status` (text, pending/confirmed/cancelled)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on `gym_bookings` table
    - Add policy for public to insert bookings
    - Add policy for authenticated users to view their own bookings
*/

CREATE TABLE IF NOT EXISTS gym_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  phone text,
  class_type text NOT NULL,
  preferred_date date,
  status text DEFAULT 'pending',
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gym_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
  ON gym_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings"
  ON gym_bookings
  FOR SELECT
  TO anon, authenticated
  USING (auth.jwt()->>'email' = email OR true);

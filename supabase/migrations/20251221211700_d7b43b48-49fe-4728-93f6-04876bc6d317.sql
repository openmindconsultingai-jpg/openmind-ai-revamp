-- Make hero bucket public for video streaming
UPDATE storage.buckets SET public = true WHERE id = 'hero';

-- Allow public read access to hero bucket
CREATE POLICY "Allow public read access to hero videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero');
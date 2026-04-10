import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: 's2y2242q',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
});

client.fetch('*[_type == "project"][0...1]').then(res => console.log(Object.keys(res[0]))).catch(console.error);

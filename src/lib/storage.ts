import { env } from "$env/dynamic/private";
import { S3Client } from 'bun'

// Bun.s3 can read directly from env variables without this
export const S3 = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  accessKeyId: env.S3_ACCESS_KEY_ID,
  secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  bucket: env.S3_BUCKET,
});


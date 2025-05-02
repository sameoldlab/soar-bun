import type { ServerLoad } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { S3 } from "$lib/storage";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const load: ServerLoad = async ({ params }) => {
  console.log({ params })
  const metadata = await S3.send(
    new HeadObjectCommand({ Bucket: env.BUCKET_NAME, Key: params.key }),
  );
  const url = await getSignedUrl(
    S3,
    new GetObjectCommand({ Bucket: env.BUCKET_NAME, Key: params.key }),
    { expiresIn: 3600 },
  );
  console.log(url, metadata)
  return { url, metadata };
};


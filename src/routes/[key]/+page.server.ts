import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params }) => {
  console.log({ params })
  const s3file = Bun.s3.file(params.key)

  const url = s3file.presign({
    acl: 'public-read',
    expiresIn: 3600
  })
  console.log(url, s3file.type)
  return { url, type: s3file.type };
};


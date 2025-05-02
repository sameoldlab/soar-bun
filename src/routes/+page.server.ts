import { fail, redirect, type Actions } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { nanoid } from "nanoid";
import { S3 } from "$lib/storage";
import { Upload } from "@aws-sdk/lib-storage";
export const actions: Actions = {
  async upload(e) {
    try {
      const data = await e.request.formData();
      const file = data.get("file") as File;

      if (!file.name || file.name == "undefined") {
        return fail(500, {
          error: true,
          message: "You must provide a file",
        });
      }
      const key = nanoid() + "_" + file.name;
      const upload = new Upload({
        params: {
          Bucket: env.BUCKET_NAME,
          Key: key,
          Body: file,
          ContentType: file.type,
        },
        client: S3,
      });

      await upload.done();
      redirect(303, `/${key}`);
    } catch (e) {
      console.error(e);
    }
  },
};

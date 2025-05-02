import { fail, redirect, type Actions } from "@sveltejs/kit";
import { nanoid } from "nanoid";

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

      const s3file = Bun.s3.file(key)
      await s3file.write(file, {
        type: file.type
      })

      redirect(303, `/${key}`);
    } catch (e) {
      console.error(e);
    }
  },
};

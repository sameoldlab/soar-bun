<script lang="ts">
  const { form } = $props();
  import { enhance } from "$app/forms";

  let loading = $state(false);

  function submit() {
    loading = true;

    return async ({ update }: { update: () => Promise<void> }) => {
      await update();
      loading = false;
    };
  }
</script>

<h1>Welcome to Soar</h1>

<form
  action="?/upload"
  method="post"
  enctype="multipart/form-data"
  use:enhance={submit}
>
  <input type="file" name="file" />

  <div>
    {#if loading}
      uploading...
    {:else if form?.error}
      <span>An error occured: {form.message}</span>
    {/if}
  </div>

  <button disabled={loading} type="submit">submit</button>
</form>

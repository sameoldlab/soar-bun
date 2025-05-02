<script lang="ts">
  const { data } = $props();

  const embedType = data.metadata.ContentType?.split("/")[0];
</script>

{#if embedType == "image"}
  <img class="" src={data.url} />
{:else if embedType == "video"}
  <video class="" src={data.url}></video>
{/if}

<br>
<a href={data.url}>source</a>

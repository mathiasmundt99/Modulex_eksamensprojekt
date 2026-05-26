<script setup>
defineProps({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true },
});
</script>

<template>
  <div class="video-wrapper">
    <iframe
      class="video-wrapper__iframe"
      :src="videoUrl"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen />
  </div>
</template>

<style scoped>
.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 540px;
}

.video-wrapper__iframe {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

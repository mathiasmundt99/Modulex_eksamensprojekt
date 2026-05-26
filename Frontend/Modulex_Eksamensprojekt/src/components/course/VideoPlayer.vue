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
  position: relative;
  padding-bottom: 56.25%;
}

.video-wrapper__iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>

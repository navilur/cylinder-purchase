<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#767FFE",
  },
  maxWidth: {
    type: String,
    default: "100%",
  },
});
</script>

<template>
  <button
    :style="{ backgroundColor: color, maxWidth: maxWidth }"
    class="btn w-auto"
  >
    {{ title }}
  </button>
</template>

<style lang="scss" scoped>
.btn {
  border: none;
  border-radius: 10px;
  color: white !important;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}
</style>

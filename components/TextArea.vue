<script setup>
defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <div class="input-group">
      <textarea
        :placeholder="placeholder"
        rows="3"
        class="form-control"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
  readonly: {
    type: String,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <div class="input-group">
      <span class="input-group-text">{{ name }}</span>
      <input
        :type="type"
        class="form-control"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-group-text {
  font-size: 14px;
  background: #fff;
  padding: 5px;
}

input {
  padding: 6px;
}
</style>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
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
      <span class="input-group-text">{{ name }}</span>
      <select
        class="form-select"
        :value="modelValue"
        @change="emit('update:modelValue', $event.target.value)"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-group-text {
  font-size: 14px;
  padding: 6px;
  background: #fff;
}

select {
  padding: 6px;
}
</style>

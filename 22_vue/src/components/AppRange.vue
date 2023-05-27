<script setup>
  defineEmits(['update:range-ammount'])

  defineProps({
    min: Number,
    max: Number,
    step: Number,
    rangeAmmount: Number,
  })
</script>

<template>
  <div class="my-5">
    <input
      class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
      type="range"
      name="ammountRange"
      id="ammountRange"
      :min="min"
      :max="max"
      :step="step"
      :value="rangeAmmount"
      @input="$emit('update:range-ammount', Number($event.target.value))"
    >
  </div>
</template>
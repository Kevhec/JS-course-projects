<script setup>
  defineEmits(['handleTerm'])
  defineProps({
    term: Number
  })

</script>

<template>
  <h2 class="text-2xl font-extrabold text-gray-500 text-center">
    Elige un <span class="text-indigo-600">Plazo </span>a Pagar
  </h2>

  <select
    name="term"
    id="termSelect"
    class="w-full p-2 bg-white border border-gray-500 rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
    :value="term"
    @change="$emit('handleTerm', Number($event.target.value))"
  >
    <option value="6">6 meses</option>
    <option value="12">12 meses</option>
    <option value="24">24 meses</option>
  </select>
</template>
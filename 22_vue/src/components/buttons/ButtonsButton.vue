<script setup>
import { computed, inject } from 'vue';

  const props = defineProps({
    type: String
  })

  const buttonOperator = computed(() => {
    return props.type === 'increment' ? '+' : '-'
  })

  const { handleIncrementDecrement } = inject('handleIncrementDecrement')

</script>

<template>
  <button
    class="h-10 w-10 flex items-center justify-center font-bold bg-lime-500 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-lime-500 text-white text-2xl"
    :data-type="props.type"
    @click="handleIncrementDecrement($event.target.dataset.type)"
  >
    {{ buttonOperator }}
  </button>
</template>
<script setup>
  import { computed } from 'vue';
  import moneyFormatter from '../../utils/moneyFormatter';

  const props = defineProps({
    description: String,
    result: {
      type: Number,
      default: 0
    },
    moneyFormat: {
      type: Boolean,
      default: false
    }
  })

  const resultToShow = computed(() => {
    return props.moneyFormat ? moneyFormatter(props.result) : props.result
  })
</script>

<template>
  <p class="text-xl text-gray-500 text-center font-bold">
    <span class="text-indigo-600">{{ resultToShow }}</span>
    {{ description }}
  </p>
</template>

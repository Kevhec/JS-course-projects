<script setup>
  import { ref, watch } from 'vue';
  import ResultsResult from './ResultsResult.vue';
  import totalAmmountCalc from '../../utils/totalAmmountCalc.js'

  const props = defineProps({
    term: Number,
    ammount: Number,
  })

  const total = ref(props.ammount)
  const installment = ref(props.term)

  watch([() => props.term, () => props.ammount], () => {
    total.value = totalAmmountCalc(props.ammount, props.term)
  })

  watch([() => props.term, () => props.ammount], () => {
    installment.value = props.ammount / props.term
  })

</script>

<template>
  <div v-if="total > 0" class="my-5 space-y-3 bg-gray-50 p-5">
    <h2 class="text-2xl font-extrabold text-gray-500 text-center">
      Resumen <span class="text-indigo-600">de Pagos</span>
    </h2>
    <ResultsResult description="Meses" :result="term" />
    <ResultsResult description="Total" :result="total" :moneyFormat="true" />
    <ResultsResult description="Por Cuota" :result="installment" :moneyFormat="true" />
  </div>

  <p v-else class="text-center font-bold text-indigo-600 my-4">Añade cantidad y plazo a pagar</p>
</template>

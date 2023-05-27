<script setup>
  import { ref, computed, provide } from 'vue';
  import AppHeader from './components/AppHeader.vue'
  import AppRange from './components/AppRange.vue';
  import ButtonsContainer from './components/buttons/ButtonsContainer.vue'
  import AppSelect from './components/AppSelect.vue';
  import ResultsContainer from './components/results/ResultsContainer.vue'
  import moneyFormatter from './utils/moneyFormatter.js'

  const RANGE_MIN = 0
  const RANGE_MAX = 1000000
  const RANGE_STEP = 10000
  const ammount = ref(500000)
  const term = ref(6)

  const formattedAmmount = computed(() => {
    return moneyFormatter(ammount.value)
  })

  const handleIncrementDecrement = (type) => {
    const action = type === 'increment' ? RANGE_STEP : -RANGE_STEP
    const newAmmount = ammount.value + action

    if (newAmmount < RANGE_MIN || newAmmount > RANGE_MAX) {
      return
    }

    ammount.value = newAmmount
  }

  provide('handleIncrementDecrement', {handleIncrementDecrement})

  const handleTerm = (newTerm) => {
    term.value = newTerm
  }

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white p-10">
    <AppHeader />
    <ButtonsContainer />
    <AppRange
      :min=RANGE_MIN
      :max=RANGE_MAX
      :step=RANGE_STEP
      v-model:rangeAmmount="ammount"
    />
    <p class="text-center my-10 text-4xl font-extrabold text-indigo-600">
      {{ formattedAmmount }}
    </p>
    <AppSelect :term="term" @handle-term="handleTerm"/>
    <ResultsContainer :term="term" :ammount="ammount" />
  </div>
</template>

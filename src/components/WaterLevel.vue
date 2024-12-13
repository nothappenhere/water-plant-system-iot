<script setup>
import { currentSensorValue } from "@/utility/currentSensorValue";
</script>

<template>
  <!-- Verry Low -->
  <div
    class="max-w-[75rem] w-full h-72 bg-gray-200 rounded-lg mx-auto flex justify-center items-end"
    v-if="currentSensorValue.waterLevel === 'Verry Low'"
  >
    <div
      class="h-10 bg-red-600 text-lg font-bold text-blue-100 text-center p-0.5 leading-none rounded-b-lg flex items-center justify-center"
      style="width: 100%"
    >
      10%
    </div>
  </div>
  <!-- Low -->
  <div
    class="max-w-[75rem] w-full h-72 bg-gray-200 rounded-lg mx-auto flex justify-center items-end"
    v-else-if="currentSensorValue.waterLevel === 'Low'"
  >
    <div
      class="h-28 bg-yellow-400 text-2xl font-bold text-blue-100 text-center p-0.5 leading-none rounded-b-lg flex items-center justify-center"
      style="width: 100%"
    >
      35%
    </div>
  </div>
  <!-- Medium -->
  <div
    class="max-w-[75rem] w-full h-72 bg-gray-200 rounded-lg mx-auto flex justify-center items-end"
    v-else-if="currentSensorValue.waterLevel === 'Medium'"
  >
    <div
      class="h-40 bg-indigo-600 text-3xl font-bold text-blue-100 text-center p-0.5 leading-none rounded-b-lg flex items-center justify-center"
      style="width: 100%"
    >
      55%
    </div>
  </div>
  <!-- Full -->
  <div
    class="max-w-[75rem] w-full h-72 bg-gray-200 rounded-lg mx-auto flex justify-center items-end"
    v-else-if="currentSensorValue.waterLevel === 'Full'"
  >
    <div
      class="h-64 bg-green-600 text-4xl font-bold text-blue-100 text-center p-0.5 leading-none rounded-b-lg flex items-center justify-center"
      style="width: 100%"
    >
      90%
    </div>
  </div>
</template>

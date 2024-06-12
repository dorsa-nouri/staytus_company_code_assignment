<template>
  <div id="app">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <h2>Pure CSS :</h2>
      <div
        v-for="(i, index) in state"
        :key="index"
      >
        <DetailCard
          :title="i.name"
          :films="i.films"
          :created-date="i.created"
          :climate="i.climate"
          :population="i.population"
        ></DetailCard>
      </div>
      <div>
        <h2>Tailwind CSS : </h2>
        <br>
        <div
          v-for="(i, index) in state"
          :key="index"
        >
          <DetailCardTailwind
            :title="i.name"
            :films="i.films"
            :created-date="i.created"
            :climate="i.climate"
            :population="i.population"
          ></DetailCardTailwind>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import DetailCard from "@/components/DetailCard.vue";
  import DetailCardTailwind from "@/components/DetailCardTailwind.vue";
  import StateManager from "@/store/state-management";
  import getReptilePlanets from "@/store/movie";

  let state = ref({});
  let isLoading = ref(true);

  const stateManager = new StateManager(state);

  async function getMovie() {
    try {
      state.value = await getReptilePlanets();
      stateManager.dispatch({
        type: "FILL_STATE",
        payload: state.value,
      });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    getMovie();
  });
</script>

<style scoped></style>

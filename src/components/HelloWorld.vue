<template>
  <div id="app">
    <div v-if="isLoading">Loading...</div>
    <div
      v-else
      v-for="(i, index) in state"
      :key="index"
    >
      <DetailCard
        :title="i.name"
        :caption="i.films"
        :created-date="i.created"
        :climate="i.climate"
      ></DetailCard>
    </div>

    {{ state[0] }}
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import DetailCard from "@/components/DetailCard.vue";
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

<template>
  <div id="app">
    <h2>{{ state.count }}</h2>
    <button
      @click="stateUpdate()"
      :loading="loading"
    >
      counter
    </button>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import StateManager from "@/store/state-management";

  const loading = ref(false);
  let state = ref({
    count: 0,
  });

  const stateManager = new StateManager(state);

  function stateUpdate() {
    loading.value = true;
    // Update the state
    stateManager.dispatch({
      type: "UPDATE_STATE",
      payload: { count: state.value.count + 5 },
    });
    // Listen for state changes
    stateManager.addListener(() => {
      console.log("State updated:", stateManager.state);
    });
    state.value.count = stateManager.state.count;

    loading.value = false;
  }
</script>

<style scoped>
  .card {
    border-radius: 10px;
    background-color: #f3f3f3;
    transition: box-shadow 0.3s ease-in-out;
    width: 98vw;
  }

  .rounded-avatar {
    display: flex;
    align-items: center;
  }

  .card-title h2 {
    padding: 10px 0;
  }
</style>

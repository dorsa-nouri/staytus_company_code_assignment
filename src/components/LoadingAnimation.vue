<template>
  <div class="loading">
    <img
      :src="require('/src/assets/icons/loading.gif')"
      alt="Loading..."
    />
  </div>
</template>
<style scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading img {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<template>
  <!-- The outer card container -->
  <div class="outer-card">
    <div class="inner-card">
      <div class="inner-card2">
        <p class="card-title card-orang-title">{{ formatDate(createdDate) }}</p>
        <div
          class="text-card"
          style="text-align: left; justify-content: baseline"
        >
          <div style="display: flex; flex: auto; align-items: center">
            <div>
              <img
                class="card-image"
                :src="require('/src/assets/icons/icons8-movie-60.png')"
                alt="movie avatar"
              />
            </div>
            <div>
              <p class="card-title">{{ title }}</p>
              <p class="card-description">
                {{ caption }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { defineProps } from "vue";

  defineProps({
    title: {
      type: String,
      default: "name",
    },
    caption: {
      type: String,
      default: "name",
    },
    createdDate: {
      type: String,
      default: "name",
    },
    climate: {
      type: String,
      default: "climate",
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", month: "short", hour12: true };
    return date
      .toLocaleString("en-US", options)
      .replace(/\s+/g, " ")
      .replace(/\b(\w+)\b/g, (_, p1) => p1.toLowerCase());
  };
</script>
<style>
  .outer-card {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    margin: 1rem 0;
  }

  .inner-card {
    background-color: #3e3e45;
    border: 1px solid #ddd;
    padding: 5px;
  }
  .inner-card2 {
    box-sizing: border-box;
    background-color: #27272a;
    padding: 10px;
    border-radius: 20px;
  }
  .text-card {
    margin: 0 2rem;
    text-align: left;
  }

  .card-title {
    text-align: left;
    color: white;
    font-size: 20px;
  }
  .card-orang-title {
    margin-left: 1rem;
    color: #debd65;
  }

  .card-description {
    font-size: 16px;
    color: #909099;
  }

  .card-image {
    /* object-fit: cover; */
    border-radius: 15px;
    background-color: #3f3f46;
    margin-right: 2rem;
  }
</style>

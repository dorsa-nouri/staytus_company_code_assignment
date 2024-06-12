<template>
  <div class="outer-card">
    <div class="inner-card">
      <div class="inner-card2">
        <div class="text-card">
          <p class="card-orang-title mobile-view">
            {{ formatDate(createdDate) }}
          </p>
          <div class="card-content">
            <div class="card-left">
              <img
                class="card-image desktop-view"
                :src="
                  formatPopulationType(population) > 10
                    ? require('/src/assets/icons/icons8-movie-60.png')
                    : require('/src/assets/icons/icons8-movie-64.png')
                "
                alt="movie avatar"
              />

              <div class="avatarDiv mobile-view">
                <p>{{ title.charAt(0) }}</p>
              </div>

              <div>
                <p class="card-title">{{ title }}</p>
                <p class="card-description climate mobile-view">
                  {{ climate }}
                </p>
                <p
                  class="card-description desktop-view"
                  v-for="film in films"
                  :key="film"
                >
                  {{ film }}
                </p>
              </div>
            </div>
            <div class="card-right">
              <p class="card-orang-title desktop-view">
                {{ formatDate(createdDate) }}
              </p>
              <img
                class="card-image mobile-view"
                height="50"
                width="50"
                :src="
                  formatPopulationType(population) > 10
                    ? require('/src/assets/icons/icons8-movie-60.png')
                    : require('/src/assets/icons/icons8-movie-64.png')
                "
                alt="movie avatar"
              />
              <p class="card-description climate desktop-view">{{ climate }}</p>
            </div>
          </div>
        </div>
        <div class="mobile-view">
          <p
            class="card-description card-left"
            style="margin-left: 2rem; margin-top: 0.5rem; color: #d9d8d3"
            v-for="film in films"
            :key="film"
          >
            {{ film }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  // our props data from main component
  defineProps({
    title: {
      type: String,
      default: "Name",
    },
    films: {
      type: Array,
      default: () => [],
    },
    createdDate: {
      type: String,
      default: "Date",
    },
    climate: {
      type: String,
      default: "Climate",
    },
    population: {
      type: String,
      default: "Unknown",
    },
  });

  // change the date format as the description wants
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", month: "short", hour12: true };
    return date
      .toLocaleString("en-US", options)
      .replace(/\s+/g, " ")
      .replace(/\b(\w+)\b/g, (_, p1) => p1.toLowerCase());
  };

  // change and check the type of the population as the description wants
  const formatPopulationType = (num) => {
    const result = Number(num);
    if (isNaN(result)) {
      return 0;
    } else {
      return result;
    }
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
    margin: 0 1rem;
    text-align: left;
  }

  .avatarDiv {
    width: 50px;
    height: 50px;
    background-color: grey;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #f6f6f6;
    margin-right: 1rem;
  }

  .avatarDiv p {
    display: inline-block;
    margin-left: 1rem;
    margin-top: 0.7rem;
  }

  .card-title {
    text-align: left;
    color: white;
    font-size: 20px;
  }

  .card-orang-title {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    color: #debd65;
  }

  .card-description {
    font-size: 16px;
    color: #909099;
  }

  .card-image {
    border-radius: 15px;
    background-color: #3f3f46;
    margin-right: 2rem;
  }

  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-left {
    display: flex;
    align-items: center;
  }

  .card-right {
    margin-left: 1rem;
    text-align: right;
  }

  .desktop-view {
    display: block;
  }

  .mobile-view {
    display: none;
  }

  @media (max-width: 640px) {
    .desktop-view {
      display: none;
    }

    .mobile-view {
      display: block;
    }

    .card-right {
      display: flex;
      flex-direction: column;
    }

    .card-right .climate {
      order: 1;
    }

    .card-right .card-description {
      order: 2;
    }
  }
</style>

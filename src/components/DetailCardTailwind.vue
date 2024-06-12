<template>
  <div class="bg-white border border-gray-300 rounded-lg p-1 mb-4">
    <div class="bg-[#3e3e45] border border-gray-300 p-1">
      <div class="bg-[#27272a] p-2.5 rounded-xl">
        <div class="mx-4 text-left">
          <p class="text-[#debd65] ml-2 mb-2 sm:hidden">
            {{ formatDate(createdDate) }}
          </p>
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img
                v-if="formatPopulationType(population) > 10"
                class="rounded-xl bg-[#3f3f46] mr-4 sm:block hidden"
                :src="require('/src/assets/icons/icons8-movie-60.png')"
                alt="movie avatar"
              />
              <img
                v-else
                class="rounded-xl bg-[#3f3f46] mr-4 sm:block hidden"
                :src="require('/src/assets/icons/icons8-movie-64.png')"
                alt="movie avatar"
              />
              <div
                class="w-12 h-12 bg-gray-500 rounded-full flex justify-center items-center text-white font-bold mr-4 sm:hidden"
              >
                {{ title.charAt(0) }}
              </div>
              <div>
                <p class="text-white text-lg">{{ title }}</p>
                <p class="text-[#909099] text-base sm:hidden">{{ climate }}</p>
                <p
                  v-for="film in films"
                  :key="film"
                  class="text-[#909099] text-base sm:block hidden"
                >
                  {{ film }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[#debd65] ml-2 sm:block hidden">
                {{ formatDate(createdDate) }}
              </p>
              <img
                v-if="formatPopulationType(population) > 10"
                class="rounded-lg bg-[#3f3f46] sm:hidden block"
                height="50"
                width="50"
                :src="require('/src/assets/icons/icons8-movie-60.png')"
                alt="movie avatar"
              />
              <img
                v-else
                class="rounded-lg bg-[#3f3f46] sm:hidden block"
                height="50"
                width="50"
                :src="require('/src/assets/icons/icons8-movie-64.png')"
                alt="movie avatar"
              />
              <p class="text-[#909099] text-base ml-2 sm:block hidden">
                {{ climate }}
              </p>
            </div>
          </div>
        </div>
        <div class="sm:hidden">
          <p
            v-for="film in films"
            :key="film"
            class="text-[#d9d8d3] text-left ml-5 mt-2"
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", month: "short", hour12: true };
    return date
      .toLocaleString("en-US", options)
      .replace(/\s+/g, " ")
      .replace(/\b(\w+)\b/g, (_, p1) => p1.toLowerCase());
  };

  const formatPopulationType = (num) => {
    const result = Number(num);
    if (isNaN(result)) {
      return 0;
    } else {
      return result;
    }
  };
</script>

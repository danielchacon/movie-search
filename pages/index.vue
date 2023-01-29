<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <div class="mb-10">
          <h1 class="text-h3 font-weight-bold text-center mb-3">
            Фильмы и&nbsp;сериалы
          </h1>
          <div class="text-h5 text-center">База&nbsp;данных IMDb</div>
        </div>
        <SearchForm class="mb-4" @submitClick="fetchData" />
        <div>
          <div v-if="isLoading" class="text-center">
            <v-progress-circular :size="50" indeterminate></v-progress-circular>
          </div>
          <div v-else>
            <MovieList
              v-if="searchResults && searchResults.length > 0"
              :movieList="searchResults"
            />
            <div v-else-if="searchResults && searchResults.length === 0">
              Ничего не найдено
            </div>
          </div>
          <v-alert
            v-if="isServerError"
            icon="mdi-alert-circle"
            title="Ошибка сервера"
            type="error"
            variant="outlined"
            :closable="true"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { MovieResult, SearchResult } from "~~/types/Shared";

const searchResults = ref<MovieResult[] | null>(null);
const isLoading = ref<boolean>(false);
const isServerError = ref<boolean>(false);

const fetchData = async (searchValue: string) => {
  isServerError.value = false;

  try {
    isLoading.value = true;

    const response = await fetch(
      new URL(`https://imdb-api.com/API/Search/k_i5x3559r/${searchValue} `)
    );
    const result: SearchResult = await response.json();

    if (result.results.length) searchResults.value = result.results;
  } catch (e: any) {
    isServerError.value = true;

    console.error(e.toString());
  }

  isLoading.value = false;
};
</script>

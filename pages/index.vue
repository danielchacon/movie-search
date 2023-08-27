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
            <MovieList v-if="searchResults && searchResults.length > 0" :movieList="searchResults" />
            <div v-else-if="searchResults && searchResults.length === 0">
              Ничего не найдено
            </div>
          </div>
          <v-alert v-if="isServerError" icon="mdi-alert-circle" title="Ошибка сервера" type="error" variant="outlined"
            :closable="true" />
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

    const fetchURL = `https://imdb8.p.rapidapi.com/title/find?q=${searchValue}`;
    const options = {
      headers: {
        'X-RapidAPI-Key': 'e3a622655emsh801fe8ba93c331fp1b17a0jsnd06d752efd18',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    }

    const response = await fetch(
      new URL(fetchURL),
      options
    );
    const result: SearchResult = await response.json();
    const searchResultsFiltered = result.results.filter(item => ['movie', 'tvSeries'].includes(item.titleType));

    if (searchResultsFiltered.length) searchResults.value = searchResultsFiltered;
  } catch (e: any) {
    isServerError.value = true;

    console.error(e.toString());
  }

  isLoading.value = false;
};
</script>

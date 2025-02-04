<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <div class="mb-10">
          <h1 class="text-h3 font-weight-bold text-center mb-3">TV Shows</h1>

          <div class="text-h5 text-center">TVMaze Database</div>
        </div>

        <SearchForm class="mb-4" @submitClick="fetchData" />

        <div>
          <div v-if="isLoading" class="text-center">
            <v-progress-circular :size="50" indeterminate></v-progress-circular>
          </div>

          <div v-else>
            <MovieList
              v-if="searchResults && searchResults.length > 0"
              :movieList="searchResults.map((item) => item.show)"
            />

            <div v-else-if="isSearched && searchResults.length === 0">
              Ничего не найдено
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-snackbar v-model="showAlert" timeout="3000" color="error">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup lang="ts">
  import type { ShowSearchResult } from '~~/types/Shared';

  const isSearched = ref(false);
  const searchResults = ref<ShowSearchResult[]>([]);
  const isLoading = ref(false);

  const showAlert = ref(false);
  const errorMessage = ref('');

  const fetchData = async (searchValue: string): Promise<void> => {
    if (!searchValue.trim()) return;

    isLoading.value = true;

    try {
      const response = await useApiFetch<ShowSearchResult[]>(
        `search/shows?q=${encodeURIComponent(searchValue)}`,
      );

      searchResults.value = (response || []).sort((a, b) => {
        const weightA = a.show?.weight ?? 0;
        const weightB = b.show?.weight ?? 0;
        return weightB - weightA;
      });
      isSearched.value = true;
    } catch (error: any) {
      errorMessage.value = error.message;
      showAlert.value = true;

      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>

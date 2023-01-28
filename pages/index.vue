<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row>
          <v-col>
            <h1 class="text-h3 font-weight-bold text-center mb-2">
              Фильмы и&nbsp;сериалы
            </h1>
            <div class="text-h5 text-center mb-5">База данных</div>
            <div>
              <v-text-field
                v-model="search"
                label="Какой фильм или сериал вы ищите?"
                prepend-icon="mdi-movie-search-outline"
                append-icon="mdi-send"
                @click:append="fetchData"
              ></v-text-field>
            </div>
            <div v-if="isLoading" class="text-center">
              <v-progress-circular
                :size="50"
                indeterminate
              ></v-progress-circular>
            </div>
            <div v-else class="movie-list d-flex flex-wrap">
              <div
                class="movie-list__item"
                v-for="(item, index) in searchResults"
                :key="item.id"
              >
                <div class="pa-2">
                  <v-card :link="true" :href="String(item.id)">
                    <v-img
                      :aspect-ratio="4 / 3"
                      :src="item.image"
                      cover
                    ></v-img>
                    <v-card-title>
                      {{ item.title }} {{ item.description }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ item.genres }}
                    </v-card-subtitle>
                    <v-card-text>
                      {{ item.plot }}
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
interface Item {
  text: string | number | object;
  value: string | number | object;
  disabled: boolean;
  divider: boolean;
  header: string;
}
</script>

<script setup lang="ts">
import { Movie } from "~~/types/Shared";

const search = ref<string>("");
const searchResults = ref<Movie[]>([]);
const isLoading = ref<boolean>(false);

const fetchData = async () => {
  try {
    isLoading.value = true;

    const response = await fetch(
      new URL(
        `https://imdb-api.com/API/AdvancedSearch/k_i5x3559r?title=${search.value}&title_type=feature,tv_movie,tv_series,documentary,short&count=10`
      )
    );
    const result = await response.json();

    searchResults.value = result.results;
  } catch (e: any) {
    console.error(e.toString());
  }

  isLoading.value = false;
};
</script>

<style lang="scss">
.movie-list {
  &__item {
    width: 100%;

    @media (min-width: 600px) {
      width: 50%;
    }

    @media (min-width: 960px) {
      width: 25%;
    }
  }
}
</style>

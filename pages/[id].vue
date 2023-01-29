<template>
  <v-container v-if="data">
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <div class="mb-4">
      <h1 class="text-h3">{{ data.title }}</h1>
      <div class="text-body-1" v-if="data.type && data.type.length">
        {{ data.type }}
      </div>
      <div class="text-body-1" v-if="data.year && data.year.length">
        {{ data.year }}
      </div>
    </div>

    <v-row v-if="data.image" class="mb-4">
      <v-col cols="12" sm="6">
        <v-img :src="data.image" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-sheet class="pa-4 text-body-2" rounded color="grey-darken-1">
          <div v-if="data.releaseDate && data.releaseDate.length">
            Дата выхода: {{ data.releaseDate }}
          </div>
          <div
            class="mt-2"
            v-if="data.tvSeriesInfo && !data.tvSeriesInfo.yearEnd"
          >
            В стадии показа
          </div>
          <div
            class="mt-2"
            v-if="data.tvSeriesInfo && data.tvSeriesInfo.yearEnd"
          >
            Год завершения: {{ data.tvSeriesInfo.yearEnd }}
          </div>
          <div
            class="mt-2"
            v-if="
              data.tvSeriesInfo &&
              data.tvSeriesInfo.seasons &&
              data.tvSeriesInfo.seasons.length
            "
          >
            Сезоны: {{ data.tvSeriesInfo.seasons.length }}
          </div>
          <div class="mt-2" v-if="data.countries && data.countries.length">
            Производство: {{ data.countries }}
          </div>
          <div class="mt-2" v-if="data.companies && data.companies.length">
            Компании: {{ data.companies }}
          </div>
          <div class="mt-2" v-if="data.genres && data.genres.length">
            Жанры: {{ data.genres }}
          </div>
          <div class="mt-2" v-if="data.directors && data.directors.length">
            Режиссеры: {{ data.directors }}
          </div>
          <div class="mt-2" v-if="data.writers && data.writers.length">
            Сценаристы: {{ data.writers }}
          </div>
          <div class="mt-2" v-if="data.awards && data.awards.length">
            Награды: {{ data.awards }}
          </div>
          <div class="mt-2" v-if="data.imDbRating && data.imDbRating.length">
            Рейтинг IMDb: {{ data.imDbRating }}
          </div>
          <div class="mt-2" v-if="data.stars && data.stars.length">
            В главных ролях: {{ data.stars }}
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <div v-if="data.plot && data.plot.length" class="text-body-1 mb-4">
      {{ data.plot }}
    </div>
    <div v-if="data.actorList && data.actorList.length" class="mb-4">
      <div class="text-h5 mb-4">Актерский состав:</div>
      <ActorList :actorList="data.actorList" />
    </div>
    <div v-if="data.similars && data.similars.length">
      <div class="text-h5 mb-4">Похожие фильмы или сериалы:</div>
      <SimilarsList :movieList="data.similars" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { MovieDetails } from "~~/types/Shared";

const data = ref<MovieDetails>();

const route = useRoute();

const breadcrumbs = computed(() => {
  return [
    {
      title: "На главную",
      disabled: false,
      href: "/",
    },
    {
      title: data.value?.title || route.params.id,
      disabled: true,
    },
  ];
});

const fetchData = async () => {
  try {
    const response = await fetch(
      new URL(`https://imdb-api.com/API/Title/k_i5x3559r/${route.params.id}`)
    );
    data.value = await response.json();
  } catch (e: any) {
    console.error(e.toString());
  }
};

useAsyncData(async () => {
  await fetchData();
});
</script>

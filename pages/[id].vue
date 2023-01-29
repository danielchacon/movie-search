<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <div v-if="data">
      <div class="mb-6">
        <h1 class="text-h3">{{ data.title }}</h1>
        <div v-if="data.type" class="text-body-1">
          {{ data.type }}
        </div>
        <div v-if="data.year" class="text-body-1">
          {{ data.year }}
        </div>
      </div>
      <v-row v-if="data.image" class="mb-8">
        <v-col cols="12" sm="6">
          <v-img :src="data.image" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="px-4 py-2 text-body-2" rounded color="grey-darken-1">
            <div
              class="my-2"
              v-for="(item, index) in info"
              :key="`info-${index}`"
            >
              <span v-if="item.label">{{ item.label + " " }}</span
              >{{ item.value }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <div v-if="data.plot" class="text-body-1 mb-8">
        {{ data.plot }}
      </div>
      <div v-if="data.actorList" class="mb-8">
        <div class="text-h5 mb-4">Актерский состав:</div>
        <ActorList :actorList="data.actorList" />
      </div>
      <div v-if="data.similars">
        <div class="text-h5 mb-4">Похожие фильмы или сериалы:</div>
        <SimilarsList :movieList="data.similars" />
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
  </v-container>
</template>

<script lang="ts">
type Info = Array<{ [key: string]: string | number | null }>;
</script>

<script setup lang="ts">
import { MovieDetails } from "~~/types/Shared";

const data = ref<MovieDetails>();
const isServerError = ref<boolean>(false);

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

const info = computed<Info>(() => {
  if (data.value) {
    const {
      releaseDate,
      tvSeriesInfo,
      countries,
      companies,
      genres,
      directors,
      writers,
      awards,
      imDbRating,
      stars,
    } = data.value;

    const array: Info = [
      {
        label: "Дата выхода:",
        value: releaseDate,
      },
      !!tvSeriesInfo
        ? {
            label: tvSeriesInfo.yearEnd ? "Год завершения:" : "",
            value: tvSeriesInfo.yearEnd || "В стадии показа",
          }
        : {},
      !!tvSeriesInfo
        ? {
            label: "Сезоны:",
            value: tvSeriesInfo.seasons.length,
          }
        : {},
      {
        label: "Производство:",
        value: countries,
      },
      {
        label: "Компании:",
        value: companies,
      },
      {
        label: "Жанры:",
        value: genres,
      },
      {
        label: "Режиссеры:",
        value: directors,
      },
      {
        label: "Сценаристы:",
        value: writers,
      },
      {
        label: "Награды:",
        value: awards,
      },
      {
        label: "Рейтинг IMDb:",
        value: imDbRating,
      },
      {
        label: "В главных ролях:",
        value: stars,
      },
    ];

    return array.filter((el) => !!el.value);
  }
  return [];
});

const fetchData = async () => {
  isServerError.value = false;

  try {
    const response = await fetch(
      new URL(`https://imdb-api.com/API/Title/k_i5x3559r/${route.params.id}`)
    );
    data.value = await response.json();
  } catch (e: any) {
    isServerError.value = true;

    console.error(e.toString());
  }
};

useAsyncData(async () => {
  await fetchData();
});
</script>

<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <div class="mb-6">
        <h1 class="text-h3">{{ movieTitle }}</h1>
        <div class="text-body-1">
          {{ movieType }}
        </div>
        <div v-if="movieYear" class="text-body-1">
          {{ movieYear }}
        </div>
      </div>
      <v-row v-if="movieImageURL" class="mb-8">
        <v-col cols="12" sm="6">
          <v-img :src="movieImageURL" />
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
      <div v-if="moviePlot" class="text-body-1 mb-8">
        {{ moviePlot }}
      </div>
      <div v-if="actorList" class="mb-8">
        <div class="text-h5 mb-4">Актерский состав:</div>
        <ActorList :actorList="actorList" />
      </div>
      <div v-if="similars">
        <div class="text-h5 mb-4">Похожие фильмы или сериалы:</div>
        <SimilarsList :movieList="similars" />
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
import {
  OverviewDetails,
  FullCredits,
  MoreLikeThis,
  Actor,
  MovieBase,
} from "~~/types/Shared";

const isLoading = ref<boolean>(true);
const data = ref<[OverviewDetails, FullCredits, MoreLikeThis]>();
const similars = ref<MovieBase[]>();
const isServerError = ref<boolean>(false);

const route = useRoute();

const breadcrumbs = computed(() => {
  let currentRoute = {
    title: route.params.id,
    disabled: true,
  };

  if (data.value) {
    const [overviewDetails] = data.value;

    currentRoute = {
      title: overviewDetails.title.title,
      disabled: true,
    };
  }

  return [
    {
      title: "На главную",
      disabled: false,
      href: "/",
    },
    currentRoute,
  ];
});

const info = computed<Info>(() => {
  if (!data.value) return [];

  const [overviewDetails, fullCredits] = data.value;
  const { releaseDate, title, genres, ratings } = overviewDetails;
  const { director, writer } = fullCredits.crew;
  let directorFiltered: string[] = [];
  let writerFiltered: string[] = [];

  if (director) {
    const directorNameArray = director.map((item) => item.name);
    const directorUnique = [...new Set(directorNameArray)];

    directorFiltered = directorUnique.slice(0, 3);
  }

  if (writer) {
    const writerNameArray = writer.map((item) => item.name);
    const writerUnique = [...new Set(writerNameArray)];

    writerFiltered = writerUnique.slice(0, 3);
  }

  const array: Info = [
    {
      label: "Дата выхода:",
      value: releaseDate,
    },
    !!title.seriesEndYear
      ? {
          label: title.seriesEndYear ? "Год завершения:" : "",
          value: title.seriesEndYear ?? "В стадии показа",
        }
      : {},
    !!title.numberOfEpisodes
      ? {
          label: "Количество эпизодов:",
          value: title.numberOfEpisodes,
        }
      : {},
    {
      label: "Продолжительность:",
      value: `${title.runningTimeInMinutes} мин.`,
    },
    {
      label: "Жанры:",
      value: genres.join(", "),
    },
    {
      label: "Рейтинг IMDb:",
      value: ratings.rating,
    },
    directorFiltered.length
      ? {
          label: "Режиссер:",
          value: directorFiltered.join(", "),
        }
      : {},
    writerFiltered.length
      ? {
          label: "Сценарист:",
          value: writerFiltered.join(", "),
        }
      : {},
  ];

  return array.filter((el) => !!el.value);
});

const movieTitle = computed<number | string>(() => {
  if (!data.value) return route.params.id.toString();

  const [overviewDetails] = data.value;

  return overviewDetails.title.title;
});

const movieType = computed<string>(() => {
  if (!data.value) return "Фильм";

  const [overviewDetails] = data.value;

  return overviewDetails.title.titleType === "tvSeries" ? "Сериал" : "Фильм";
});

const movieYear = computed<number | null>(() => {
  if (!data.value) return null;

  const [overviewDetails] = data.value;

  return overviewDetails.title.year;
});

const movieImageURL = computed<string | null>(() => {
  if (!data.value) return null;

  const [overviewDetails] = data.value;

  return overviewDetails.title.image.url;
});

const moviePlot = computed<string | null>(() => {
  if (!data.value) return null;

  const [overviewDetails] = data.value;

  return overviewDetails.plotOutline.text;
});

const actorList = computed<Actor[] | null>(() => {
  if (!data.value) return null;

  const [overviewDetails, fullCredits] = data.value;

  return fullCredits.cast.slice(0, 10);
});

const fetchData = async () => {
  isServerError.value = false;

  try {
    const options = {
      headers: {
        "X-RapidAPI-Key": "e3a622655emsh801fe8ba93c331fp1b17a0jsnd06d752efd18",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    };

    const response = await Promise.all(
      [
        `https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${route.params.id}`,
        `https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=${route.params.id}`,
        `https://imdb8.p.rapidapi.com/title/get-more-like-this?tconst=${route.params.id}`,
      ].map((url) => fetch(new URL(url), options).then((res) => res.json()))
    );

    data.value = response as [OverviewDetails, FullCredits, MoreLikeThis];

    const [overviewDetails, fullCredits, moreLikeThis] = data.value;

    if (moreLikeThis && moreLikeThis.length) {
      const response = await Promise.all(
        moreLikeThis
          .slice(0, 4)
          .map((url) =>
            fetch(
              new URL(
                `https://imdb8.p.rapidapi.com/title/get-details?tconst=${
                  url.split("/")[2]
                }`
              ),
              options
            ).then((res) => res.json())
          )
      );

      similars.value = response;
    }

    isLoading.value = false;
  } catch (e: any) {
    isLoading.value = false;
    isServerError.value = true;

    console.error(e.toString());
  }
};

useAsyncData(async () => {
  await fetchData();
});
</script>

<template>
  <v-app>
    <v-main>
      <v-container v-if="data">
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <div class="mb-4">
          <h1 class="text-h3 font-weight-bold mb-1">
            {{ data.title }}
          </h1>
          <div class="text-subtitle">{{ data.year }}</div>
        </div>
        <v-row class="mb-3">
          <v-col cols="12" sm="4">
            <v-img :src="data.image"></v-img>
          </v-col>
          <v-col class="text-medium-emphasis">
            <div class="mb-2">
              <div>{{ data.genres }}</div>
              <div>{{ data.countries }}</div>
              <div>{{ data.runtimeStr }}</div>
            </div>
            <div class="mb-2">{{ data.companies }}</div>
            <div class="mb-2">Режиссеры: {{ data.directors }}</div>
            <div class="mb-2">Сценаристы: {{ data.writers }}</div>
            <div>В главных ролях: {{ data.stars }}</div>
          </v-col>
        </v-row>
        <div class="text-h5 mb-3">Сюжет:</div>
        <div class="mb-3">{{ data.plot }}</div>
        <div class="text-h5 mb-3">Актерский состав:</div>
        <div class="actor-list d-flex flex-wrap">
          <div
            class="actor-list__item"
            v-for="(item, index) in data.actorList"
            :key="item.id"
          >
            <div class="d-flex pa-2">
              <div>
                <v-avatar>
                  <v-img :src="item.image" cover></v-img>
                </v-avatar>
              </div>
              <div class="ml-5">
                <div>{{ item.name }}</div>
                <div>{{ item.asCharacter }}</div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const data = ref<any | null>();

const route = useRoute();

const breadcrumbs = computed(() => {
  return [
    {
      title: "На главную",
      disabled: false,
      href: "/",
    },
    {
      title: data.value.title,
      disabled: true,
    },
  ];
});

const fetchData = async () => {
  try {
    const response = await fetch(
      new URL(`https://imdb-api.com/API/Title/k_i5x3559r/${route.params.id}`)
    );
    const result = await response.json();

    data.value = result;
  } catch (e: any) {
    console.error(e.toString());
  }
};

useAsyncData(async () => {
  await fetchData();
});
</script>

<style lang="scss">
.actor-list {
  &__item {
    width: 100%;

    @media (min-width: 600px) {
      width: 50%;
    }

    @media (min-width: 960px) {
      width: calc(100% / 3);
    }
  }
}
</style>

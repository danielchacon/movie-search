<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" indeterminate></v-progress-circular>
    </div>

    <div v-else>
      <div class="mb-6">
        <h1 class="text-h3">
          {{ data?.mainInfo?.name || route.params.id.toString() }}
        </h1>

        <div v-if="data?.mainInfo?.premiered" class="text-body-1">
          {{
            data.mainInfo.premiered +
            (data.mainInfo.ended ? ` - ${data.mainInfo.ended}` : '')
          }}
        </div>
      </div>
      <v-row v-if="data?.mainInfo?.image?.original" class="mb-8">
        <v-col cols="12" sm="6">
          <v-img :src="data.mainInfo.image.original" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet class="px-4 py-2 text-body-2" rounded color="grey-darken-1">
            <div
              class="my-2"
              v-for="(item, index) in info"
              :key="`info-${index}`"
            >
              <strong>{{ item.label + ': ' }}</strong
              >{{ item.value }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>

      <div
        v-if="data?.mainInfo?.summary"
        class="text-body-1 mb-8"
        v-html="data.mainInfo.summary"
      ></div>

      <div v-if="data?.cast" class="mb-8">
        <div class="text-h5 mb-4">Cast:</div>

        <ActorList :actorList="data.cast" />
      </div>
    </div>
  </v-container>

  <v-snackbar v-model="showAlert" timeout="3000" color="error">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup lang="ts">
  import { transformShowToInfo } from '~~/helpers/dataTransform';
  import type { Show, CastItem, Info } from '~~/types/Shared';

  const isLoading = ref<boolean>(true);

  const showAlert = ref(false);
  const errorMessage = ref('');

  const route = useRoute();

  const breadcrumbs = computed(() => {
    const homeCrumb = {
      title: 'На главную',
      disabled: false,
      href: '/',
    };

    if (!data.value?.mainInfo) {
      return [
        homeCrumb,
        {
          title:
            Array.isArray(route.params.id) && route.params.id.length
              ? route.params.id[0]
              : String(route.params.id),
          disabled: true,
        },
      ];
    }

    const { name } = data.value?.mainInfo;

    return [
      homeCrumb,
      {
        title: name,
        disabled: true,
      },
    ];
  });

  const info = computed<Info>(() => {
    return data.value?.mainInfo
      ? transformShowToInfo(data.value?.mainInfo)
      : [];
  });

  const { data, error } = useAsyncData(
    async (): Promise<{
      mainInfo: Show;
      cast: CastItem[];
    }> => {
      const [mainInfo, cast] = await Promise.all([
        useApiFetch<Show>(`shows/${route.params.id.toString()}`),
        useApiFetch<CastItem[]>(`shows/${route.params.id}/cast`),
      ]);

      return {
        mainInfo,
        cast,
      };
    },
  );

  if (error.value) {
    errorMessage.value = error.value.message;
    showAlert.value = true;

    console.error(error.value);
  } else {
    isLoading.value = false;
  }
</script>

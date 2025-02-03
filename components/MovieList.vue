<template>
  <v-row>
    <v-col
      v-for="item in movieList"
      cols="12"
      :key="item.id"
      style="cursor: pointer"
      @click="goToDetailedPage(item.id.toString())"
    >
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-sheet
            :class="`d-flex pa-2 elevation-${isHovering ? 2 : 0}`"
            v-bind="props"
          >
            <div style="min-width: 100px">
              <v-img
                :src="item.image?.medium ?? ''"
                :aspect-ratio="968 / 1227"
                cover
              />
            </div>

            <div class="ml-4">
              <div class="text-h6 mb-2">{{ item.name }}</div>

              <div class="text-body-1">
                {{ item.premiered + (item.ended ? ` - ${item.ended}` : '') }}
              </div>
            </div>
          </v-sheet>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { type Show } from '~~/types/Shared';

  interface Props {
    movieList: Array<Show>;
  }

  defineProps<Props>();

  const goToDetailedPage = (id: string) => {
    navigateTo(`/${id}`);
  };
</script>

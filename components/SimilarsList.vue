<template>
  <v-row>
    <v-col
      cols="12"
      sm="4"
      md="3"
      v-for="(item, index) in movieList"
      :key="item.id"
      style="cursor: pointer"
      @click="goToDetailedPage(item.id)"
    >
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-sheet
            :class="`pa-2 elevation-${isHovering ? 2 : 0}`"
            v-bind="props"
          >
            <v-img
              class="mb-2"
              :src="item.image.url"
              :aspect-ratio="968 / 1227"
              cover
            />
            <div class="text-body-1">{{ item.title }}</div>
          </v-sheet>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MovieBase } from "~~/types/Shared";

interface Props {
  movieList: Array<MovieBase>;
}

const props = defineProps<Props>();

const router = useRouter();

const goToDetailedPage = (id: string) => router.push(id.split("/")[2]);
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" v-for="(item, index) in actorList" :key="item.id">
      <div class="d-flex">
        <div style="min-width: 100px">
          <v-avatar size="100">
            <v-img :src="item.image" cover />
          </v-avatar>
        </div>
        <div class="ml-4">
          <div class="text-h6 mb-2">{{ item.name }}</div>
          <div class="text-body-1">{{ item.asCharacter }}</div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Actor } from "~~/types/Shared";

interface Props {
  actorList: Array<Actor>;
}

const props = defineProps<Props>();
</script>

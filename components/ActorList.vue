<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      v-for="(item, index) in actorList"
      :key="item.person?.id"
    >
      <div class="d-flex">
        <div style="min-width: 100px">
          <v-avatar size="100" color="surface-variant">
            <v-img :src="item.person?.image?.medium ?? ''" cover />
          </v-avatar>
        </div>

        <div class="ml-4">
          <div class="text-h6 mb-2">{{ item.person?.name }}</div>

          <div class="text-body-1">{{ item.character?.name }}</div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { type CastItem } from '~~/types/Shared';

  interface Props {
    actorList: Array<CastItem>;
  }

  const props = defineProps<Props>();
</script>

<template>
  <v-text-field
    v-model="search"
    label="Введите название"
    append-inner-icon="mdi-movie-search-outline"
    variant="outlined"
    @click:append-inner="handleSubmitClick"
    @keydown.enter="handleSubmitClick"
  ></v-text-field>
</template>

<script setup lang="ts">
const search = ref<string>("");

const emit = defineEmits(["submitClick"]);

const handleSubmitClick = () => {
  if (search.value.length > 0) emit("submitClick", search.value);
};
</script>

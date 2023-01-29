<template>
  <v-text-field
    v-model="search"
    label="Введите название"
    append-inner-icon="mdi-movie-search-outline"
    variant="outlined"
    ref="inputRef"
    @click:append-inner="handleSubmitClick"
    @keydown.enter="handleSubmitClick"
  ></v-text-field>
</template>

<script setup lang="ts">
const search = ref<string>("");
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits(["submitClick"]);

const handleSubmitClick = () => {
  if (search.value.length > 0) {
    emit("submitClick", search.value);
    inputRef.value?.blur();
  }
};
</script>

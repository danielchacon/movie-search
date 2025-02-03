export const useApiFetch = async <T>(endpoint: string) => {
  const config = useRuntimeConfig();

  const API_BASE_URL = config.public.API_BASE_URL;

  return await $fetch<T>(`${API_BASE_URL}/${endpoint}`);
};

import { ref } from "vue";

export const useNews = () => {
  const news = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const config = useRuntimeConfig();
  const apiKey = config.public.newsApiKey;

  const fetchNews = async () => {
    loading.value = true;
    try {
      const main_url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=au,us`;
      const response = await fetch(main_url);
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status}`);
      }
      const data = await response.json();
      news.value = data.results;
    } catch (err) {
      error.value = `Fetch error: ${err.message}`;
    } finally {
      loading.value = false;
    }
  };

  return { news, loading, error, fetchNews };
};

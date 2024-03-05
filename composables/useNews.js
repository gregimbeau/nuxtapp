import { ref } from "vue";

export const useNews = () => {
  const news = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchNews = async () => {
    loading.value = true;
    try {
      // NewsAPI endpoint for fetching news about Bitcoin
      const apiKey = "68ca5b05972d4c468bc05e0e80ce7f81"; // Use an environment variable in production
      const main_url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`;

      const response = await fetch(main_url);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      news.value = data.articles;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { news, loading, error, fetchNews };
};

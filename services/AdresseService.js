// AdresseService.js
export default {
  async fetchAddress(params) {
    let url = new URL("https://api-adresse.data.gouv.fr/search/");
    let queryParams = new URLSearchParams();

    if (params.query) queryParams.append("q", params.query);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.autocomplete != null)
      queryParams.append("autocomplete", params.autocomplete);
    if (params.lat && params.lon) {
      queryParams.append("lat", params.lat);
      queryParams.append("lon", params.lon);
    }
    if (params.type) queryParams.append("type", params.type);
    if (params.postcode) queryParams.append("postcode", params.postcode);
    if (params.citycode) queryParams.append("citycode", params.citycode);

    url.search = queryParams.toString();

    const response = await fetch(url);
    const data = await response.json();
    return data.features;
  },

  // Add more methods if needed
};

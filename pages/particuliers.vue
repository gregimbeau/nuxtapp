<template>
  <div>
    <input v-model="query" @input="search" placeholder="Enter search term" class="mb-4 p-2 border border-gray-300 rounded"/>
    <apiAdresse :addresses="addresses" />
  </div>
</template>

<script>
import AdresseService from '../services/AdresseService';
import apiAdresse from '../components/ApiAdresse.vue';

export default {
  components: {
    apiAdresse
  },
  data() {
    return {
      query: '',
      addresses: null
    };
  },
  methods: {
    async search() {
      if (this.query.length > 2) {
        const addresses = await AdresseService.fetchAddress({ query: this.query });
        this.addresses = addresses;
      } else {
        this.addresses = null;
      }
    }
  }
};
</script>

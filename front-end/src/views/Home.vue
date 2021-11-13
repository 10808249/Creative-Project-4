<template>
<div class="home">
  <div class="portal">
    <router-link class="page-portal" to="/admin">Manage</router-link>
  </div>
  <section class="travel-gallery">
    <div class="image" v-for="tour in tours" :key="tour.id">
      <h2>{{tour.title}}</h2>
      <h3>{{tour.description}}</h3>
      <star-rating :rating="tour.rating" :increment="0.01" :read-only="true" active-color="#FF4500"></star-rating>
      <!--h3>{{tour.rating}}</h3-->
      <img :src="tour.path" />
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import StarRating from 'vue-star-rating';

export default {
  name: 'Home',
  components: {
    StarRating
  },
  data() {
    return {
     tours: [],
    }
  },
   created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/tours");
        this.tours = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  }
}
</script>

<style scoped>
/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.travel-gallery {
  column-gap: 1.5em;
}

.travel-gallery h2 {
  font-style: italic;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color:rgb(167, 63, 15);
}

.travel-gallery h3 {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color:darkgoldenrod;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .travel-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .travel-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .travel-gallery {
    column-count: 2;
  }
}
</style>
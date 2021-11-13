<template>
  <div class="admin">
    <div class="portal">
      <router-link class="page-portal" to="/">Home</router-link>
    </div>
    <div class="heading">
      <h2>Add Tourist attraction</h2>
    </div>
    <h3>Ratings must be between 0 and 5</h3>
    <div class="add">
      <div class="form">
        <label for="title">Title</label>
        <input v-model="title" placeholder="Title" />
        <br />
        <label for="description">Description</label>
        <input v-model="description" placeholder="Description" />
        <br />
        <label for="rating">Rating</label>
        <input v-model="rating" placeholder="" />
        <br />
        <p />
        <input type="file" name="photo" @change="fileChanged" />
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addTour">
        <h2>{{ addTour.title }}</h2>
        <h3>{{ addTour.description }}</h3>
        <h3>{{ addTour.rating }}</h3>
        <img :src="addTour.path" />
      </div>
    </div>
    <div class="heading">
      <h2>Edit/Delete a Tourist attraction</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectTour(s)"
          >
            {{ s.title }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findTour">
        <label for="title">Title</label><input v-model="findTour.title" /> <br />
        <label for="description">Description</label><input v-model="findTour.description" /><br />
        <label for="rating">Rating</label><input v-model="findTour.rating" /><br />
        <div class="actions">
        <button @click="deleteTour(findTour)">Delete</button>
        <button @click="editTour(findTour)">Edit</button>
        </div>
        <img :src="findTour.path" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      title: "",
      description: "",
      rating: null,
      file: null,
      addTour: null,
      tours: [],
      findTitle: "",
      findTour: null,
    };
  },
  computed: {
    suggestions() {
      let tours = this.tours.filter((tour) =>
        tour.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return tours.sort((a, b) => a.title > b.title);
    },
  },
  created() {
    this.getTours();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    isValidRating(num) {
      if (Number.isNaN(num) || num < 0.0 || num > 5.0) {
        throw "Invalid Rating! It must be between 0 and 5.";
      }
    },
    async upload() {
      try {
        this.isValidRating(this.rating);
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/tours", {
          title: this.title,
          description: this.description,
          rating: this.rating,
          path: r1.data.path,
        });
        this.addTour = r2.data;
      } catch (error) {
        //console.log(error);
      }
    },
    async getTours() {
      try {
        let response = await axios.get("/api/tours");
        this.tours = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    selectTour(tour) {
      this.findTitle = "";
      this.findTour = tour;
    },
    async deleteTour(tour) {
      try {
        await axios.delete("/api/tours/" + tour._id);
        this.findTour = null;
        this.getTours();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async editTour(tour) {
      try {
        this.isValidRating(this.findTour.rating);
        await axios.put("/api/tours/" + tour._id, {
          title: this.findTour.title,
          description: this.findTour.description,
          rating: this.findTour.rating,
        });
        this.findTour = null;
        this.getTours();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2,
h3 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5bff5b;
  color: #fff;
}

label {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right:15px;
}

input[type=file]::file-selector-button {
  background-color: #6c74be;
  border: none;
  color: white;
  padding: 6px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
}

.upload input {
  display: inline-block;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin:8px;
}
</style>
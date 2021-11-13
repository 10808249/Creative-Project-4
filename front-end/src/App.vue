<template>
  <div id="app">
  <div class="header">
    <router-link to="/">
    </router-link>
    <div class="title">
      <h1>My Travel Reviews</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<style>
body {
  background-image: url("./assets/clouds-1282314_960_720.webp");
  background-size: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3750;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #3f2c50;
}

#nav a.router-link-exact-active {
  color: #427fb9;
}

.title {
  color:rgb(233, 114, 45);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.page-portal {
  text-decoration: none;
  color:rgb(206, 11, 180);
  border-style: dashed;
  border-color: #2c3350;
}

button {
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
</style>

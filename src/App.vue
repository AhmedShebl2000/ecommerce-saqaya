<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Inter", "sans-serif";
}

#app {
  max-width: 2560px;
  margin: auto;
  max-height: 100vh;
}
</style>

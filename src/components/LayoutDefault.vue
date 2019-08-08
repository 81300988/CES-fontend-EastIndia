<template>
  <div>
    <ul>
      <h2>East India</h2>
      <li><router-link to="/search">Search</router-link></li>
      <li><router-link to="/pricelist">Administration</router-link></li>
    </ul>
    <div class="Layoutadmin" v-if="showNav">
        <nav class="Layoutadmin__nav">
        <router-link to="/pricelist" v-bind:class="{ active: isPriceActive }">Price List</router-link> |
        <router-link to="/extrachange" v-bind:class="{ active: isExActive }">Extra Change</router-link>|
        <router-link to="/places" v-bind:class="{ active: isPlaActive }">Places</router-link> |
        <router-link to="/routes" v-bind:class="{ active: isRoActive }">Routes</router-link>|
        <router-link to="/configuration" v-bind:class="{ active: isConActive }">Configuration</router-link> |
        </nav>
    </div>
    <main class="LayoutDefault__main">
      <slot/>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    showNav: false,
    isPriceActive: false,
    isExActive: false,
    isPlaActive: false,
    isRoActive: false,
    isConActive: false
  },
  data () {
    return {

    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
}

li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

/* Change the link color on hover */
li a:hover {
  background-color: #555;
  color: white;
}
.Layoutadmin__nav{
    text-align: center;
}
.active, .btn:hover {
  background-color: #666;
  color: white;
}
</style>


<template>
  <div>
    <form @submit="formSubmit" action="">
      <div class="row" style="background-color:lavender;">
        <div class="col-sm-4 margin">
          <label>Depature</label>
          <v-select placeholder="Depature" v-model="Depature" :options="options" @search="onSearch">
          </v-select>
        </div>
        <div class="col-sm-4 margin">
          <label>Arrival</label>
          <v-select placeholder="Arrival" v-model="Arrival" :filterable="false" :options="options" @search="onSearch">
          </v-select>
        </div>
        <div class="col-sm-4 margin">
          <label>Package Content</label>
          <v-select placeholder="Package Content" v-model="PackageContent" :filterable="false" :options="options" @search="onSearch">
          </v-select>
        </div>
      </div>

      <div class="row" style="background-color:lavender;">
        <div class="col-sm-4 margin">
          <label>Weight</label>
          <v-select placeholder="Weight" v-model="Weight" :filterable="false" :options="options" @search="onSearch">
          </v-select>
        </div>
        <div class="col-sm-4 margin">
          <label>Shipping Date</label>
          <v-select placeholder="Shipping Date" v-model="ShippingDate" :filterable="false" :options="options" @search="onSearch">
          </v-select>
        </div>
        <div class="col-sm-4 margin">
          <p class="pmargin">
              <button class="btn btn-success">Submit</button>
          </p>
        </div>
      </div>
    </form>
    

  </div>
</template>

<script>
import _ from 'lodash'
// import 'vue-select/dist/vue-select.css';

export default {
  data () {
    return {
      options: [],
      results: [],
      output: '',
      Depature: '',
      Arrival: '',
      PackageContent: '',
      Weight: '',
      ShippingDate: ''
    }
  },
  methods: {
    onSearch (search, loading) {
      loading(true)
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      fetch(
        `http://localhost:53842/Home/Details`
      ).then(res => {
        res.json().then(json => (vm.results = json.cities))
        console.log(vm.results)
        vm.options = vm.results.filter(function (item) {
          return item.includes(search)
        })
        console.log(vm.options)
        loading(false)
      })
    }, 350),
    formSubmit (e) {
      e.preventDefault()
      let currentObj = this
      this.axios.post('http://localhost:53842/Home/Post', {
        Depature: this.Depature,
        Arrival: this.Arrival,
        PackageContent: this.PackageContent,
        Weight: this.Weight,
        ShippingDate: this.ShippingDate
      })
                .then(function (response) {
                  currentObj.output = response.data
                })
                .catch(function (error) {
                  currentObj.output = error
                })
    }
  }

}
</script>

<style scoped>

.margin {
  margin: 0px;
}
.row1 {
  width: 500px;
}
.pmargin {
  margin-top: 29px;
}
</style>
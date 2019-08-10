
<template>
    <layout-default :showNav="showNav">
        <div>
            <div class="margin">
            <form @submit="formSubmit"  >
                <div class="row" >
                    <div class="col-sm-4 ">
                        <label>Depature</label>
                        <v-select  v-model="Depature" :options="options" @search="onSearch">
                        </v-select>
                    </div>
                    <div class="col-sm-4 ">
                        <label>Arrival</label>
                        <v-select  v-model="Arrival" :filterable="false" :options="options" @search="onSearch">
                        </v-select>
                    </div>
                    <div class="col-sm-4 ">
                        <label>Package Content</label>
                        <v-select  v-model="PackageContent" :filterable="false" :options="options" @search="onSearch">
                        </v-select>
                    </div>
                </div>

                <div class="row" >
                    <div class="col-sm-4 ">
                        <label class="lweight">Weight</label><br>
                        <input type="text" v-model="Weight">
                    </div>
                    <div class="col-sm-4 ">
                        <label>Shipping Date</label><br>
                        <input type="date" name="bday">
                    </div>
                    <div class="col-sm-4 ">
                        <p class="pmargin">
                            <button class="btn abc btn-success bleft">Search</button>
                        </p>
                    </div>
                </div>
                </form>
            </div>

            <div class="table">
                <h1>Cheapest</h1>
                <table>
                    <tr>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Shipping Service</th>
                        <th>Price(kr.)</th>
                        <th>Number of hours</th>
                    </tr>
                </table>
            </div>

            <div class="table">
                <h1>Fastest</h1>
                <table>
                    <tr>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Shipping Service</th>
                        <th>Price(kr.)</th>
                        <th>Number of hours</th>
                    </tr>
                </table>
            </div>

        </div>
	</layout-default>
  
</template>

<script>
import _ from 'lodash'
import 'vue-select/dist/vue-select.css'
import LayoutDefault from '../components/LayoutDefault.vue'
export default {
  components: {
    LayoutDefault
  },
  data () {
    return {
      options: [],
      results: [],
      output: '',
      Depature: '',
      Arrival: '',
      PackageContent: '',
      Weight: '',
      ShippingDate: '',
      showNav: false
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
    margin: 60px;
    margin-left: 170px;
    margin-right: 260px;
}
.row1 {
  width: 500px;
}
.pmargin {
  margin-top: 29px;
}
label {
    display: inline-block;
    margin-top: 1.5rem;
}
.bleft{
    margin-top: 1.5rem;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.table{
    margin: 82px;
}
</style>
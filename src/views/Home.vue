<template>

  <div  style="text-align: center; margin: 2rem 0">
    <h1 class="title">Rick and Morty</h1>
  </div>
     <div class="filter-wrapper">
        <div class="search-container">
          <div class="input-wrapper">
          <input class="input" type="text">
          </div>
          <select name="" id="">asdsa</select>
      </div>
    </div>
  <table >
    <!-- <thead>
      <tr>
        <td>Имя</td>
        <td>Разновидность</td>
        <td>Фото</td>
        <td>Эпизоды</td>
      </tr>
      
    </thead> -->
 
     
    <tbody >
      <tr v-for="p in humans" :key="p.id">
        <td>
          <router-link :to="{ name: 'Character', params: { charId: p.id } }">{{
            p.name
          }}</router-link>
        </td>
        <td>{{ p.status }}</td>
        <td><img :src="p.image" alt="" /></td>
        <td>
          <router-link
            href=""
            to: :to="{ name: 'Episode', params: { episodeId: episode } }"
            v-for="(episode, index) in p.episode
              .map(el => +el.match(/(\d+)/)[0])
              .slice(0, 5)"
            :key="index"
            >{{ `${episode} ` }}</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DataService from '../services/DataServices'
import { mapState } from 'vuex'



export default {
 
  name: 'Home',

  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.getHuman()
  },
  computed: {
    ...mapState(['humans'])
  },
  methods: {
    getHuman() {
      DataService.getAll(1)
        .then(res => this.$store.dispatch('setHumans', res.data.results))
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="scss">
.filter-wrapper {
  width: 100%;
  background: hotpink;
  height: 60px;
  display: flex;
  align-items: center;
 
}
.search-container{
  width: 100%;
  display: flex;
  justify-content: space-around;
  
}


</style>

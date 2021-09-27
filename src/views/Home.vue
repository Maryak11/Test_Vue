<template>
  <div style="text-align: center; margin: 2rem 0">
    <h1 class="title">Rick and Morty</h1>
  </div>

  <table>
    <thead>
      <tr>
        <td>Имя</td>
        <td>Разновидность</td>
        <td>Фото</td>
        <td>Эпизоды</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in humans" :key="p.id">
        <td>{{ p.name }}</td>
        <td>{{ p.status }}</td>
        <td><img :src="p.image" alt="" /></td>
        <td>
          <a
            href=""
            v-for="(episode, index) in p.episode
              .map(el => +el.match(/(\d+)/)[0])
              .slice(0, 5)"
            :key="index"
            >{{ `${episode} ` }}</a
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
  components: {},
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

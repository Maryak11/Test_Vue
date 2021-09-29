<template>
    <div style="text-align: center; margin: 2rem 0">
        <h1 class="title">Rick and Morty</h1>
    </div>
    <div class="filter-wrapper">
        <div class="search-container">
            <div class="input-wrapper">
                <span class="text-input">Поиск</span>
                <input class="input" v-model="nameFilter" type="text" />
            </div>
            <select v-model="selectStatus">
                <option v-for="stat in status" :key="stat">{{ stat }}</option>
            </select>
            <div class="btn" @click="search()">Искать</div>
        </div>
    </div>
    <div class="loading" v-show="isLoading"><loading /></div>
    <table v-if="!error" v-show="!isLoading">
        <tbody>
            <tr v-for="p in humans" :key="p.id">
                <td>
                    <router-link
                        class="a"
                        :to="{ name: 'Character', params: { charId: p.id } }"
                        >{{ p.name }}</router-link
                    >
                </td>
                <td>{{ p.status }}</td>
                <td><img :src="p.image" class="image" alt="" /></td>
                <td>
                    <router-link
                        class="a"
                        :to="{
                            name: 'Episode',
                            params: { episodeId: episode },
                        }"
                        v-for="(episode, index) in normalizedNumberEpisode(
                            p.episode
                        )"
                        :key="index"
                        >{{ `${episode} ` }}
                    </router-link>
                </td>
            </tr>
        </tbody>
        <Observer v-if="humans.length" @intersect="intersected" />
    </table>
    <div v-else class="error title red"><p>Ничего не найдено</p></div>
</template>

<script>
import DataService from '../services/DataServices'
import { mapState } from 'vuex'
import Observer from '../components/Observer.vue'
import Loading from '../components/Loading.vue'
export default {
    components: { Observer, Loading },

    name: 'Index',

    data() {
        return {
            nameFilter: null,
            page: 1,
            error: null,
            selectStatus: 'unknown',
            status: ['alive', 'dead', 'unknown'],
            isLoading: true,
        }
    },
    mounted() {
        this.getHuman()
    },
    computed: {
        ...mapState(['humans']),
    },
    methods: {
        intersected() {
            if (this.lastPage !== this.page) {
                this.page++
                this.getHuman()
            }
        },
        normalizedNumberEpisode(episode) {
            return episode.map((el) => +el.match(/(\d+)/)[0]).slice(0, 5)
        },
        getHuman() {
            if (this.nameFilter === null && this.selectStatus === 'unknown') {
                DataService.getAll(this.page)
                    .then((res) => {
                        this.isLoading = false
                        this.lastPage = res.data.info.pages
                        this.$store.dispatch('setHumans', res.data.results)
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error = true
                    })
            } else if (
                this.nameFilter !== null &&
                this.selectStatus === 'unknown'
            ) {
                DataService.getFilteredCharacterName(this.page, this.nameFilter)
                    .then((res) => {
                        this.isLoading = false
                        this.lastPage = res.data.info.pages
                        this.$store.dispatch('setHumans', res.data.results)
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error = true
                    })
            } else if (
                this.nameFilter === null &&
                this.selectStatus !== 'unknown'
            ) {
                DataService.getFilteredCharacterStatus(
                    this.page,
                    this.selectStatus
                )
                    .then((res) => {
                        this.isLoading = false
                        this.lastPage = res.data.info.pages
                        this.$store.dispatch('setHumans', res.data.results)
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error = true
                    })
            } else {
                DataService.getFilteredCharacterNameAndStatus(
                    this.page,
                    this.nameFilter,
                    this.selectStatus
                )
                    .then((res) => {
                        this.isLoading = false
                        this.lastPage = res.data.info.pages
                        this.$store.dispatch('setHumans', res.data.results)
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error = true
                    })
            }
        },
        search() {
            this.$store.commit('clearHumans')
            this.page = 1
            this.error = false
            this.getHuman()
        },
    },
    beforeUnmount() {
        this.$store.commit('clearHumans')
        this.page = 1
    },
}
</script>

<style lang="scss">
.filter-wrapper {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}
.search-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.error {
    display: flex;
    justify-content: center;
    height: 50vh;
    align-items: center;
    opacity: 3;
    transition: 1s;
}
.image {
    border-radius: 40px;
    max-width: 100px;
}
.loading {
    top: 100%;
}
</style>

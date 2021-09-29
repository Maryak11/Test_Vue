<template>
    <div class="wrapper-episode">
        <Loading v-if="isLoading" />
        <div v-else class="container-episode">
            <h1 class="title episode">
                {{ currentEpisode.name }}
            </h1>
            <div class="date episode">
                {{ currentEpisode.air_date }}
            </div>
            <div class="wrapper-img episode">
                <router-link
                    :to="{ name: 'Character', params: { charId: img.id } }"
                    class="image-character"
                    v-for="(img, index) in arr"
                    :key="index"
                    ><img
                        class="episode-img"
                        :src="img.image"
                        alt=""
                        :aria-placeholder="img.name"
                /></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '../components/Loading.vue'

import DataService from '../services/DataServices'
export default {
    components: {
        Loading,
    },
    data() {
        return {
            episodeCharacter: null,
            arr: [],
            isLoading: null,
        }
    },
    computed: {
        ...mapState(['currentEpisode']),
    },
    created() {
        this.isLoading = true
        DataService.getCurrentEpisode(this.$route.params.episodeId)
            .then((res) => {
                this.$store.dispatch('setCurrentEpisode', res.data)
                this.episodeCharacter = res.data.characters
                var promises = this.episodeCharacter.map((url) =>
                    DataService.getCharacter(url).then((res) => res.data)
                )
                Promise.all(promises).then((res) => {
                    this.arr = res
                    this.isLoading = false
                })
            })
            .catch((error) => console.log(error))
    },
}
</script>
<style lang="scss">
.wrapper-episode {
    display: flex;
    justify-content: center;
    height: 80vh;
    margin-top: 100px;
    align-items: center;
}
.container-episode {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px 20px;
    gap: 20px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    .episode {
        display: flex;
        justify-content: center;
    }
}
.wrapper-img {
    display: flex;
    flex-wrap: wrap;
}
.episode-img {
    width: 100px;
    height: 100px;
    margin: 5px;
    background: grey;
    box-shadow: 0 14px 15px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-radius: 14px;
    transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
    &:hover {
        transform: translate(0, -6px);
        transition-delay: 0s !important;
    }
}
</style>

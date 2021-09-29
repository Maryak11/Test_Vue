<template>
    <div class="wrapper-person">
        <Loading v-show="isLoading" />
        <div class="container-character">
            <div class="img-char">
                <img :src="currentCharacter && currentCharacter.image" alt="" />
            </div>
            <h1 class="title character">
                {{ currentCharacter && currentCharacter.name }}
            </h1>
            <div class="species-character">
                {{ currentCharacter && currentCharacter.species }}
            </div>
            <div class="location-character">
                {{ currentCharacter && currentCharacter.location.name }}
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '../components/Loading.vue'
import DataService from '../services/DataServices'
export default {
    components: { Loading },
    data() {
        return {
            currentCharacter: null,
            isLoading: true,
        }
    },

    created() {
        DataService.getCurrentCharacter(this.$route.params.charId)
            .then((res) => {
                this.currentCharacter = res.data
                this.isLoading = false
            })
            .catch((error) => console.log(error))
    },
}
</script>
<style lang="scss">
.wrapper-person {
    display: flex;
    justify-content: center;
    height: 80vh;
    align-items: center;
}
.container-character {
    display: flex;
    flex-direction: column;

    border-radius: 10px;
    padding: 20px 20px;
    gap: 20px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    .character {
        display: flex;
        justify-content: center;
    }
}
</style>

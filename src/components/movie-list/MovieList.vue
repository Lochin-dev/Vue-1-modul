<template>
    <ul v-if="movies" class="movie-list list-group">
        <MovieListItem v-for="movie in movies" v-bind:movie="movie" :key="movie.id"
            @onToggle="$emit('onToggle', $event)" @onRemove="$emit('onRemove', $event)" />
    </ul>
    <div v-else="movies">Hech narsa topilmadi</div>
</template>

<script>
import MovieListItem from "../movie-list-item/MovieListItem.vue"
export default {
    components: {
        MovieListItem
    },

    props: {
        movies: {
            type: Array,
            required: true,
        }
    }

}
</script>
<style scoped>
.movie-list {
    margin-top: 2rem;
    padding: 1.5rem;
    border-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
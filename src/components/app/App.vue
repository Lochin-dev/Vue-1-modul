<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" :favoriteMoviesCount="movies.filter(c => c.favourite).length" />
      <div class="search-panel">
        <SearchPanel :updateTermHander="updateTermHander" />
        <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filter" />
      </div>
      <Box v-if="!movies.length && !loader">
        <p class="text-center fs-3 text-danger">Kinolar yo'q</p>
      </Box>
      <Box v-else-if="loader" class="d-flex justify-content-center">
        <Loading />
      </Box>
      <MovieList v-else :movies="onFilterHandlet(onSearchHander(movies, term), filter)" @onToggle="onToggleHandler"
        @onRemove="onRemoveHandler" />
      <MovieAddForm @createMovies="createMovie" />
    </div>
  </div>
</template>

<script>
import AppInfo from "@/components/app-info/AppInfo.vue"
import SearchPanel from "../search-panel/SearchPanel.vue"
import AppFilter from "../app-filter/AppFilter.vue"
import MovieList from "../movie-list/MovieList.vue"
import MovieAddForm from "../movie-add-form/MovieAddForm.vue"
import axios from "axios"
export default {
  components: {
    AppInfo,
    SearchPanel,
    AppFilter,
    MovieList,
    MovieAddForm
  },

  data() {
    return {
      movies: [
      ],
      term: '',
      filter: 'all',
      loader: false,
      limt: 10,
      page: 1,
      totalPages: 0,
    }
  },

  methods: {
    createMovie(item) {
      this.movies.push(item)
    },
    onToggleHandler({ id, prop }) {
      this.movies = this.movies.map(item => {
        if (item.id == id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    },
    onRemoveHandler(id) {
      this.movies = this.movies.filter(c => c.id !== id)
    },
    onSearchHander(arr, term) {
      if (term.length === 0) {
        return arr
      }
      return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
    },
    onFilterHandlet(arr, filter) {
      switch (filter) {
        case "popular":
          return arr.filter(c => c.like)
        case "mostViewers":
          return arr.filter(c => c.viewers > 500)
        default:
          return arr;
      }
    },
    updateTermHander(term) {
      this.term = term
      this.updateTermHander(this.term)
    },
    updateFilterHandler(filter) {
      console.log(111, filter);
      this.filter = filter
    },
    async fetchMovies() {
      try {
        this.loader = true;
        let respons = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limt: this.limt,
            _page: this.page
          }
        })
        const newArray = respons.data.map(item => ({
          id: item.id,
          name: item.title,
          viewers: item.id * 10,
          favourite: false,
          like: false
        }))
        this.totalPages = Math.ceil(respons.headers["x-total-count"] / this.limt)
        this.movies = newArray
        console.log(this.totalPages);
      } catch (error) {
        alert(error.message)
      } finally {
        this.loader = false;
      }
    },
  },
  mounted() {
    this.fetchMovies()
  }

}</script>

<style>
.app {
  height: 100vh;
  color: black;
}

.content {
  width: 1000px;
  min-height: 700px;
  background-color: #fff;
  margin: 0 auto;
  bottom: 5rem 0;
}

.search-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  border-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
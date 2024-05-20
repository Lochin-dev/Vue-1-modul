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
      <Box class="d-flex justify-content-center">
        <nav aria-label="pagination">
          <ul class="pagination pagination-sm">
            <li class="page-item page-link" @click="previosPageHandler()">
              <!-- <a class="page-link" href="#" aria-label="Previous"> -->
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
              <!-- </a> -->
            </li>
            <li v-for="pageNumber in totalPages"><span :class="{ 'active page-link': pageNumber === page }"
                class="page-link" @click="updatePageHandler(pageNumber)">{{
        pageNumber
      }}</span>
            </li>
            <li class="page-item page-link" @click="nextPageHandler()">
              <!-- <a class="page-link" href="#" aria-label="Next"> -->
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
              <!-- </a> -->
            </li>
          </ul>
        </nav>
      </Box>
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
    async createMovie(item) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', item)
        this.movies.push(response.data)
      } catch (error) {
        alert(error.message)
      }
    },
    onToggleHandler({ id, prop }) {
      this.movies = this.movies.map(item => {
        if (item.id == id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    },

    async onRemoveHandler(id) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        this.movies = this.movies.filter(c => c.id !== id)
      } catch (error) {
        alert(error.message)
      }
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
      } catch (error) {
        alert(error.message)
      } finally {
        this.loader = false;
      }
    },
    updatePageHandler(page) {
      this.page = page
    },
    previosPageHandler() {
      if (this.page > 1) {
        this.page -= 1
      }
    },
    nextPageHandler() {
      if (this.totalPages > this.page) {
        this.page += 1
      }
    }
  },
  mounted() {
    this.fetchMovies()
  },

  watch: {
    page() {
      this.fetchMovies()
    }
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
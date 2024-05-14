<template>
<div class="app font-monospace">
  <div class="content">
    <AppInfo :allMoviesCount="movies.length" 
    :favoriteMoviesCount="movies.filter(c => c.favourite).length"/>
    <div class="search-panel">
      <SearchPanel :updateTermHander="updateTermHander"/>
      <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filter"/>
    </div> 
<MovieList 
:movies="onFilterHandlet(onSearchHander(movies, term), filter)" 
@onToggle="onToggleHandler"
@onRemove="onRemoveHandler"
 />
<MovieAddForm @createMovies="createMovie"/>
  </div>
</div>
</template>

<script>
import AppInfo from "@/components/app-info/AppInfo.vue"
import SearchPanel from "../search-panel/SearchPanel.vue"
import AppFilter from "../app-filter/AppFilter.vue"
import MovieList from "../movie-list/MovieList.vue"
import MovieAddForm from "../movie-add-form/MovieAddForm.vue"
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
            {
                id: 1,
                name: "Hukumdor Usmon",
                viewers: "1.000.543",
                favourite: false,
                like: true
            },
            {
                id: 2,
                name: "Ichkarida",
                viewers: "945.456",
                favourite: true,
                like: false
            },
            {
                id: 3,
                name: "Chuqur",
                viewers: "1.567.503",
                favourite: false,
                like: true
            },
            {
                id: 4,
                name: "Qodirxon",
                viewers: "845.513",
                favourite: true,
                like: false
            }
        ],
        term: '',
        filter: 'all',
    }
  },

  methods: {
    createMovie(item) {
        this.movies.push(item)
    },
    onToggleHandler({id, prop}) {
       this.movies = this.movies.map(item => {
        if(item.id == id) {
          return {...item , [prop]: !item[prop]}
        }
        return item
      })
    },
    onRemoveHandler(id) {
      this.movies = this.movies.filter(c => c.id !== id)
    },
    onSearchHander(arr, term) {
      if(term.length === 0) {
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
    }
  }
}</script>

<style>
  .app{
    height: 100vh;
    color: black;
  }

  .content{
    width: 1000px;
    min-height: 700px;
    background-color: #fff;
    margin: 0 auto;
    bottom: 5rem 0;
  }

  .search-panel{
    margin-top: 2rem;
    padding: 1.5rem;
    border-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
  }
</style>
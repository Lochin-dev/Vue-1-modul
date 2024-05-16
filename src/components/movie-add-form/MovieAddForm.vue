<template >
    <Box>
        <h3>Yangi kino qo'shish</h3>
        <form action="" class="add-form d-flex gap-2" @submit.prevent>
            <Input 
               class="form-control new-movie-label" 
               placeholder="Qanday kino?" 
               v-model="name"
            />
            <!-- <input type="text" class="form-control new-movie-label" placeholder="Qanday kino?" 
            :value="name" @input="name = $event.target.value"> -->
            <Input 
              class="form-control new-movie-label" 
              placeholder="Necha marataba ko'rilgan?" 
              type="number"
              v-model="viewers"
            />
            <PrimaryButton class="btn-outline-dark" @click="addMovie" >Qo'shish</PrimaryButton>
        </form>
    </Box>
</template>
<script>

export default {
    data() {
        return {
            name: "",
            viewers: ""
        }
    },
methods: {
    addMovie() {
        if(!this.name || !this.viewers) return
        const newMovie = {
                name: this.name,
                viewers: this.viewers,
                favourite: false,
                like: false,
                id: Date.now()
        }
       this.$emit('createMovies', newMovie )
       this.name = ""
       this.viewers = ""
    }
}
}
</script>
<style scoped>
    .movie-add-form{
        margin-top: 2rem;
    padding: 1.5rem;
    border-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
    }
</style>
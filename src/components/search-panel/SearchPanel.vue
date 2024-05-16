
<template>
    <Input 
    class="form-control search-input" 
    placeholder="Kinolarni qidirish"
    v-model="term"
    @input="changeHendler" 
    />
</template>

<script>
export default {
    props: {
        updateTermHander: {
            type: Function,
            required: true,
        }
    },
    data() {
        return {
            term: '',
        }
    },
    methods: {
        changeHendler(e) {
            this.term = e.target.value; 
            this.updateTermHander(this.term)
        }
    }
}
</script>

<style scoped>
.search-input {
    margin-bottom: 1rem;
    padding: 1.5rem;
    border-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
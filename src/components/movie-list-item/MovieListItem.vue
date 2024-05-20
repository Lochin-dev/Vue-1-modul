<template>
    <li class="list-group-item d-flex justify-content-between align-items-center"
        :class="[{ like: movie.like }, { favourite: movie.favourite }]">
        <span class="list-group-item-label" @click="$emit('onToggle', { id: movie.id, prop: 'like' })">{{
            movie.name
        }}</span>
        <input type="text" class="list-group-item-input" :value="movie.viewers">
        <div class="d-fl justify-content-center align-items-center">
            <button @click="$emit('onToggle', { id: movie.id, prop: 'favourite' })" type="button"
                class="btn-cookie btn-sm">
                <i class="fas fa-cookie"></i>
            </button>

            <button type="button" class="btn-trash btn-sm" @click="$emit('onRemove', movie.id)">
                <i class="fas fa-trash"></i>
            </button>

            <i class="fas fa-star"></i>

        </div>
    </li>
</template>

<script>

export default {
    props: {
        movie: {
            type: Array,
            required: true,
        }
    },
    methods: {
        onLike() {
            this.$emit("onLike", this.movie.id)
        },
        onFavourite() {
            this.$emit("onFavourite", this.movie.id)
        }
    }
}
</script>

<style scoped>
.list-group-item {
    padding: 15px 20px;
    border: none;
    border-bottom: 1px solid #3d5a80;
}

.list-group-item:last-child {
    border-bottom: none;
}

.list-group-item span {
    line-height: 35px;
    font-size: 2opx;
    cursor: pointer;
    width: 550px;
}

.list-group-item input {
    line-height: 35px;
    font-size: 2opx;
    text-align: center;
    border: none;
    outline: none;
}

.list-group-item button {
    border-radius: 5px;
    width: 35px;
    height: 35px;
    margin: 3px;
    font-style: 17px;
    border: none;
    cursor: pointer;
}

.btn-cookie:hover {
    background-color: #b8b8b8a3;
    box-shadow: 1px 2px 5px rgba(102, 102, 102, 0.533);
}

.btn-trash:hover {
    background-color: #b8b8b8a3;
    box-shadow: 1px 2px 5px rgba(102, 102, 102, 0.533);
}

.list-group-item .btn-cookie {
    color: #e09f3e;
}

.list-group-item .btn-trash {
    color: #ff3a3a;
}

.list-group-item .fa-star {
    color: #ffd900;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-style: 16px;
    transition: 0.3s all;
    transform: translateX(30px);
    opacity: 0;
}

.list-group-item.like .fa-star {
    transform: translateX(0px);
    opacity: 1;
}

.list-group-item.favourite .list-group-item-label {
    color: #e09f3e;
}

.list-group-item.favourite .list-group-item-input {
    color: #e09f3e;
}
</style>
<template>
    <Box class="d-flex justify-content-center">
        <nav aria-label="pagination">
            <ul class="pagination pagination-sm">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li v-for="pageNumber in totalPages"><span class="page-link" @click="handlerPage(pageNumber)">{{
                    pageNumber
                }}</span>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </Box>
</template>
<script>
export default {
    name: "Pagination",
    props: {
        // totalPages: Number,
        pageNumber: {
            page: Number,
            required: true,
        },
        updatePageHandler: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            pageNumber: this.pageNumber
        }
    },
    methods: {
        handlerPage(pageNumber) {
            this.page === pageNumber
            this.updatePageHandler(this.pageNumber)
        }
    }
}

</script>
<style></style>
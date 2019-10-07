<template>
    <div>
        <v-data-table dense :dark="themeIsDark"
                    :headers="headers"
                    :items="products"
                      :options.sync="options"
                      :server-items-length="totalProducts"
                      :loading="loading"
                    class="elevation-1">
                    <!-- try to find out why products not updated -->
<!--                    <template slot="item">-->
<!--                        <tr v-for="product in items" :key="product.id">-->
<!--                            <td class="product-table-td" v-for="header in headers" :key="header.id" >-->
<!--                                {{ product[header.value] }}-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                    </template>-->
        </v-data-table>
    </div>
</template>

<style lang="scss">
    .product-table-td {
        width: 100px;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<script>
    import headers from '@/data/productTableHeader'
    
    export default {
        data: () => ({
            headers,
            products: [],
            totalProducts: 0,
            loading: true,
            options: {}
        }),
        beforeCreate: function() {
            //this.$store.dispatch('productTable/SUBSCRIBE_TIME')
        },
  
        beforeDestroy: function() {
            //this.$store.dispatch('productTable/UNSUBSCRIBE_TIME')
        },
        computed: {
            themeIsDark() {
                return this.$store.getters['ui/themeIsDark'];
            }
        },
        watch: {
            options: {
                handler () {
                    this.getDataFromApi()
                        .then(data => {
                            this.products = data.loadedProducts
                            this.totalProducts = data.total
                        })
                },
                deep: true,
            },
        },
        mounted () {
            this.getDataFromApi()
                .then(data => {
                    this.products = data.loadedProducts
                    this.totalProducts = data.total
                })
        },
        methods: {
            getDataFromApi() {
                this.loading = true
                return new Promise((resolve) => {
                    const { sortBy, sortDesc, page, itemsPerPage } = this.options

                    let loadedProducts = this.$store.getters['productTable/products'];
                    const total = loadedProducts.length

                    if (sortBy.length === 1 && sortDesc.length === 1) {
                        loadedProducts = loadedProducts.sort((a, b) => {
                            const sortA = a[sortBy[0]]
                            const sortB = b[sortBy[0]]

                            if (sortDesc[0]) {
                                if (sortA < sortB) return 1
                                if (sortA > sortB) return -1
                                return 0
                            }
                            else {
                                if (sortA < sortB) return -1
                                if (sortA > sortB) return 1
                                return 0
                            }
                        })
                    }

                    if (itemsPerPage > 0) {
                        loadedProducts = loadedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    }

                    setTimeout(() => {
                        this.loading = false
                        resolve({
                            loadedProducts, 
                            total,
                        })
                    }, 1000)
                })
            },
        }
    };
</script>

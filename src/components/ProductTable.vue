<template>
    <div>
        <v-data-table dense :dark="themeIsDark"
                :headers="headers"
                :items="products" 
                :loading="loading" 
                :page.sync="page" 
                :items-per-page="itemsPerPage"
                hide-default-footer
                :page-count="pageCount"
                class="elevation-1">
                <template slot="body">
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td class="product-table" v-for="header in headers" :key="header.id" >
                                {{ product[header.value] }}
                            </td>
                        </tr>
                    </tbody>
                </template>
        </v-data-table>
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
    </div>
</template>

<style lang="scss">
    .product-table {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<script>
    
    import headers from '@/data/productTableHeader'
    import products from '@/data/products'
    
    export default {
        data: () => ({
            page: 1,
            pageCount: 10,
            itemsPerPage: 10,
            loading: false,
            headers,
            products,
        }),
        computed: {
            themeIsDark() {
                return this.$store.getters['ui/themeIsDark'];
            },
            pagination: {
                get: function () {
                    return this.$store.getters['productTable/pagination']
                }
            },
        },
        watch: {
            pagination: {
                handler () {
                    this.loading = true
                    this.$store.dispatch('queryItems')
                        .then(() => {
                            this.loading = false
                        })
                },
                deep: true
            }
        },
    };
</script>

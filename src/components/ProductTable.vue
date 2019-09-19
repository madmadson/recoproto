<template>
    <div>
        <v-data-table dense :dark="themeIsDark"
            :headers="headers"
            :items="products"
            :height="600"
            class="elevation-1">
            <template slot="item">
                <tr v-for="product in products" :key="product.id">
                    <td class="product-table-td" v-for="header in headers" :key="header.id" >
                        {{ product[header.value] }}
                    </td>
                </tr>
            </template>
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
    import products from '@/data/products'
    
    export default {
        data: () => ({
            headers,
            products,
        }),
        computed: {
            themeIsDark() {
                return this.$store.getters['ui/themeIsDark'];
            },
            
        },
    };
</script>

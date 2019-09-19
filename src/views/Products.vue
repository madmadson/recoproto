<template>
    <v-layout column>
        <v-flex style="overflow: auto">
            <div>Hallo products</div>
            <ProductTable/>
        </v-flex>
    </v-layout>
</template>

<script>
    import ProductTable from '@/components/ProductTable';

export default {
  components: {
    ProductTable
  },
};
</script>

<template>
  <div class="row justify-center">
    <!-- {{ productStore.productDetails }} -->
    <div
      class="col-6 q-gutter-md q-mb-md"
      v-for="(product, index) in topThreeProducts(productStore.productDetails)"
    >
      <product-component :Productdetails="product" :index="index" />
    </div>
  </div>

  <div class="row">
    <div class="col-10 text-center text-h4 q-my-xl q-mx-auto">
      Other products fitting your needs
    </div>
    <div class="row q-col-gutter-md offset-1">
      <div
        class="col-6"
        v-for="(product, index) in allProducts(productStore.productDetails)"
      >
        <product-component :Productdetails="product" :index="index" />
      </div>
    </div>
  </div>
  <div class="flex justify-center q-my-lg">
    <q-btn
      size="12px"
      color="accent"
      outline
      class="text-body2 text-uppercase q-px-xl"
      @click="backbutton()"
    >
      <q-icon name="keyboard_double_arrow_left" />
      <div>Back</div>
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { useProductStore } from "src/stores/products-store";
import ProductComponent from "./ProductComponent.vue";
const productStore = useProductStore();
const topThreeProducts = (products: any) => products.slice(0, 3);
const allProducts = (products: any) => products.slice(3, products.length);
const backbutton = () => {
  productStore.firstQuestionAskedOrNot -= 1;
};
</script>

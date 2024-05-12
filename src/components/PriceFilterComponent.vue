<template>
  <div class="row q-ma-lg">
    <div class="col-md-10">
      <div class="text-h6 font-sans text-weight-bold q-mb-lg">
        Price Range: {{ standard.min }}$ to {{ standard.max }}$
      </div>
      <q-range
        color="secondary"
        v-model="standard"
        :min="minval"
        :max="maxval"
        :step="5"
        label-always
        :left-label-value="`${standard.min} $`"
        :right-label-value="`${standard.max} $`"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useProductStore } from "src/stores/products-store";
const productStore = useProductStore();

const minval = computed(() => {
  if (productStore.productDetails.length > 0) {
    const prices = productStore.productDetails.map((product) =>
      parseFloat(product.price.value)
    );
    return Math.min(...prices)-1; // Use Math.min to find the minimum value
  } else {
    return 0;
  }
  // return 10
});
const maxval = computed(() => {
  if (productStore.productDetails.length > 0) {
    const prices = productStore.productDetails.map((product) =>
      parseFloat(product.price.value)
    );
    // Use reduce to find the maximum value
    return prices.reduce(
      (max, current) => (current > max ? current : max),
      prices[0]
    )+2;
  } else {
    return 0;
  }
});

const standard = ref({
  min: productStore.priceRange.min,
  max: productStore.priceRange.max,
});
//To update the value of price range in store
watch(standard, (newValue) => {
  productStore.priceRange.min = newValue.min;
  productStore.priceRange.max = newValue.max;
  filterProductsByPrice();
});

const timeoutDuration = 500; // Adjust as needed
const filterProductsByPrice = () => {
  productStore.filteredProducts = productStore.productDetails.filter(
    (product) => {
      return (
        product.price.value >= productStore.priceRange.min &&
        product.price.value <= productStore.priceRange.max
      );
    }
  );
  let filteredproducts = [];
  productStore.filteredProducts.sort((a, b) => {
    return parseFloat(b.finalScore.value) - parseFloat(a.finalScore.value);
  })
  filteredproducts = filteredproducts.concat(
    productStore.filteredProducts,
    productStore.productDetails
  );
  filteredproducts = Array.from(new Set(filteredproducts));
  productStore.productDetails = filteredproducts;
};
// Call the filterProductsByPrice function after the timeout because productDetails is coming after some time
onMounted(() => {
  // setTimeout(filterProductsByPrice, timeoutDuration);
  filterProductsByPrice();
});
</script>

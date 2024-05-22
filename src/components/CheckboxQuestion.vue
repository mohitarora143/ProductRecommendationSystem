<template>
  <div class="text-h5 q-mt-md q-mb-sm font-primary text-primary">
    <p class="text-h5 text-weight-bold">{{ props.Question }}</p>
  </div>
  <div class="text-subtitle1 font-primary text-weight-medium text-secondary q-mb-lg">
    {{ props.SubQuestion }}
  </div>
  <div class="">
    <div class="row q-col-gutter-lg q-ml-none">
      <div class="col-6 q-pr-md" v-for="Checkbox in checkboxvalues">
        <q-btn
          class="full-width rounded-lg"
          size="18px"
          :class="{ 'bg-secondary text-white': Checkbox.value }"
          @click="selectCheckbox(Checkbox)"
        >
          {{ Checkbox.name }}
        </q-btn>
      </div>
    </div>
  </div>
  <div class="flex justify-between q-px-md q-mt-xl">
    <div class="q-mt-md">
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
    <div class="q-mt-md">
      <div>
        <q-btn
          size="12px"
          color="accent"
          outline
          class="text-body2 text-uppercase q-px-xl"
          @click="nextbutton()"
        >
          <div>Next</div>
          <q-icon name="keyboard_double_arrow_right" />
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, nextTick } from "vue";
import { useProductStore } from "src/stores/products-store";
const productStore = useProductStore();
const props = defineProps(["Question", "SubQuestion"]);

const selectCheckbox = async (selected: any) => {
  if (selected.value === false) {
    selected.value = true;
  } else {
    selected.value = false;
  }
  await filterByActivity(selected);
  setTimeout(() => {
    applyAnimation();
  }, 1);
};

const checkboxvalues = ref([
  reactive({
    name: "Workout",
    value: false,
  }),
  reactive({
    name: "Music",
    value: false,
  }),
  reactive({
    name: "Work",
    value: false,
  }),
  reactive({
    name: "Traveling",
    value: false,
  }),
  reactive({
    name: "Gaming",
    value: false,
  }),
]);

const filterByFinalScore = () => {
  //As if we select iphone or samsung 1point is added to the final score and products are sorted thats why animation needs to be assigned again because previous animation may or may not be applied
  productStore.newProducts = [...productStore.productDetails[productStore.firstQuestionAskedOrNot]];
  productStore.oldProducts = [...productStore.productDetails[productStore.firstQuestionAskedOrNot]];
  productStore.newProducts.sort((a, b) => {
    const finalScoreA = parseFloat(a.finalScore.value);
    const finalScoreB = parseFloat(b.finalScore.value);
    if (finalScoreA > finalScoreB) {
      return -1;
    }
    if (finalScoreA < finalScoreB) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < 3; i++) {
    //If all top three products are same as before
    if (
      productStore.newProducts[i].name.value ==
      productStore.oldProducts[i].name.value
    ) {
      productStore.newProducts[i].animation = {
        value: "slidezigzag",
      };
    } 
    //If products are same but their positions are different or products are totally different
    else if (
      productStore.newProducts[i].name.value !=
      productStore.oldProducts[i].name.value
    ) {
      // console.log("Not equal");
      for (let j = 0; j < 3; j++) {
        //If products are same but their positions are different
        if (
          productStore.newProducts[i].name
            .value == productStore.oldProducts[j].name.value
        ) {
          if (i > j) {
            productStore.newProducts[
              i
            ].animation = { value: "slideDown" };
          } else if (i < j) {
            productStore.newProducts[
              i
            ].animation = { value: "slideUp" };
          }
        }
        //If products are totally different 
        else if (
          productStore.newProducts[i].name
            .value != productStore.oldProducts[j].name.value
        ) {
          if (
            !productStore.newProducts[i]
              .animation
          ) {
            productStore.newProducts[
              i
            ].animation = { value: "slideIn" };
          }
        }
      }
    }
  }
  productStore.productDetails[productStore.firstQuestionAskedOrNot] = productStore.newProducts
};

const deviceAndSmallEarBonus = () => {
  //for giving bonus to products based on device preference and small ear
  if (productStore.deviceType == "iPhone") {
    for (const product of productStore.productDetails[
      productStore.firstQuestionAskedOrNot
    ]) {
      let bonusPoint = 0;
      if (product.allBestListNames.value.includes("iPhone")) {
        bonusPoint += 1;
      }
      product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
    }
  } else if (productStore.deviceType == "Samsung") {
    for (const product of productStore.productDetails[
      productStore.firstQuestionAskedOrNot
    ]) {
      let bonusPoint = 0;
      if (product.name.value.includes("Samsung")) {
        bonusPoint += 1;
      }
      product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
    }
  }

  if (productStore.fitOnSmallEar == "bonus") {
    for (const product of productStore.productDetails[
      productStore.firstQuestionAskedOrNot
    ]) {
      let bonusPoint = 0;
      if (product.allBestListNames.value.includes("small ears")) {
        bonusPoint += 1;
      }
      product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
    }
  }
};

nextTick(() => {
  deviceAndSmallEarBonus();
  filterByFinalScore();
});

const filterByActivity = (selected: any) => {
  productStore.productActivities = [];
  productStore.oldProducts = [
    ...productStore.productDetails[productStore.firstQuestionAskedOrNot],
  ];
  console.log("productStore.oldProducts: ", productStore.oldProducts);
  productStore.productDetails[productStore.firstQuestionAskedOrNot].forEach((item) => {
    delete item.animation;
  });
  if (selected.value === true) {
    for (const product of productStore.productDetails[
      productStore.firstQuestionAskedOrNot
    ]) {
      if (selected.name === "Music") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("audiophile")) {
          bonusPoint += 1;
        }
        if (product.allBestListNames.value.includes("bass")) {
          bonusPoint += 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Workout") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("workout")) {
          bonusPoint += 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Work") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("noise canceling")) {
          bonusPoint += 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Traveling") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("airplanes")) {
          bonusPoint += 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Gaming") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("gaming")) {
          bonusPoint += 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
    }
  } else if (selected.value == false) {
    for (const product of productStore.productDetails[
      productStore.firstQuestionAskedOrNot
    ]) {
      if (selected.name === "Music") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("audiophile")) {
          bonusPoint -= 1;
        }
        if (product.allBestListNames.value.includes("bass")) {
          bonusPoint -= 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Workout") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("workout")) {
          bonusPoint -= 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Work") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("noise canceling")) {
          bonusPoint -= 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Traveling") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("airplanes")) {
          bonusPoint -= 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
      if (selected.name === "Gaming") {
        let bonusPoint = 0; // Default bonus point value
        if (product.allBestListNames.value.includes("gaming")) {
          bonusPoint -= 1;
        }
        product.finalScore.value = parseFloat(product.finalScore.value) + bonusPoint;
      }
    }
  }
  productStore.newProducts = [...productStore.productDetails[productStore.firstQuestionAskedOrNot]]
  // return  productStore.productDetails[productStore.firstQuestionAskedOrNot].sort(
  //   (a, b) => {
  //     return parseFloat(b.finalScore.value) - parseFloat(a.finalScore.value);
  //   }
  // );
  return  productStore.newProducts.sort(
    (a, b) => {
      return parseFloat(b.finalScore.value) - parseFloat(a.finalScore.value);
    }
  );
};

const applyAnimation = () => {
  for (let i = 0; i < 3; i++) {
    //If all top three products are same as before
    if (
      productStore.newProducts[i].name.value ==
      productStore.oldProducts[i].name.value
    ) {
      productStore.newProducts[i].animation = {
        value: "slidezigzag",
      };
    }
    //If products are same but their positions are different or products are totally different
    else if (
      productStore.newProducts[i].name.value !=
      productStore.oldProducts[i].name.value
    ) {
      for (let j = 0; j < 3; j++) {
        //If products are same but their positions are different
        if (
          productStore.newProducts[i].name
            .value == productStore.oldProducts[j].name.value
        ) {
          if (i > j) {
            productStore.newProducts[
              i
            ].animation = { value: "slideDown" };
          } else if (i < j) {
            productStore.newProducts[
              i
            ].animation = { value: "slideUp" };
          }
        }
        //If products are totally different
        else if (
          productStore.newProducts[i].name
            .value != productStore.oldProducts[j].name.value
        ) {
          if (
            !productStore.newProducts[i]
              .animation
          ) {
            productStore.newProducts[
              i
            ].animation = { value: "slideIn" };
          }
        }
      }
    }
  }
  productStore.productDetails[productStore.firstQuestionAskedOrNot] = productStore.newProducts
  console.log("newproducts",productStore.productDetails[productStore.firstQuestionAskedOrNot]);
};
const nextbutton = () => {
  productStore.productDetails[productStore.firstQuestionAskedOrNot].forEach((item) => {
    item.animation = { value : "slidezigzag" };
  });
  productStore.productDetails[productStore.firstQuestionAskedOrNot + 1] =
    productStore.productDetails[productStore.firstQuestionAskedOrNot];
  productStore.firstQuestionAskedOrNot += 1;
};

const backbutton = () => {
  productStore.firstQuestionAskedOrNot -= 1;
};
</script>

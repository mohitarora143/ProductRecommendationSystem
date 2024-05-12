<template>
  <div class="text-h5 q-my-md text-weight-bold font-sans">
    {{ props.Question }}
  </div>
  <div
    class="text-subtitle1 q-my-sm font-sans text-weight-medium text-secondary"
  >
    {{ props.SubQuestion }}
  </div>
  <div class="">
    <div class="row q-ml-none">
      <!-- <draggable
        :list="list"
        class="full-width"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
        :item-key="(item: any, index: any) => index"
      >
        <template #item="{ element, index }"> -->
      <div class="row">
        <div v-for="element in priorityList" class="col-12 q-py-md">
          <div class="row">
            <!-- bg-secondary text-white -->
            <div class="col-11 q-px-md">
              <q-btn
                class="full-width rounded-lg"
                size="18px"
                :class="{ 'bg-secondary text-white': element.value }"
                @click="selectedProductPriority(element)"
              >
                <q-icon
                  name="headset"
                  color="secondary"
                  class="q-mr-xs"
                  size="20px"
                  v-if="element.id == 0"
                />
                <q-icon
                  name="mic"
                  color="secondary"
                  class="q-mr-xs"
                  size="20px"
                  v-if="element.id == 1"
                />
                <q-icon
                  name="phone"
                  color="secondary"
                  class="q-mr-xs"
                  size="20px"
                  v-if="element.id == 2"
                />
                <q-icon
                  name="music_note"
                  color="secondary"
                  class="q-mr-xs"
                  size="20px"
                  v-if="element.id == 3"
                />
                {{ element.name }}
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- </template>
      </draggable> -->
    </div>
  </div>
  <div class="container q-px-md">
    <div class="q-mt-md">
      <q-btn
        size="12px"
        color="black"
        outline
        class="text-body2 text-uppercase"
        @click="backbutton()"
      >
        <q-icon name="keyboard_double_arrow_left" />
        <div>Back</div>
      </q-btn>
    </div>
    <div class="font-primary text-negative q-ma-md text-subtitle1" v-if="priorityErrorMsg">
      You've selected already two features. Deselect one of them.
    </div>
  </div>
  <!-- {{ list }} -->
</template>
<script setup lang="ts">
import { useProductStore } from "src/stores/products-store";
import { ref, computed, reactive, watch } from "vue";
// import draggable from "vuedraggable";

const priorityErrorMsg = ref(false);

const dragging = ref(false);
const productStore = useProductStore();
const props = defineProps(["PriorityList", "Question", "SubQuestion"]);
// const priorityList = computed(() => props.PriorityList);
const priorityList = ref([
  reactive({
    name: "Active Noice Canceling",
    value: false,
    apiName: "ANC_Score",
    id: 0,
  }),
  reactive({
    name: "Microphone",
    value: false,
    apiName: "microphoneScore",
    id: 1,
  }),
  reactive({
    name: "Battery Life",
    value: false,
    apiName: "batteryLifeScore",
    id: 2,
  }),
  reactive({
    name: "Sound Quality",
    value: false,
    apiName: "soundQualityScore",
    id: 3,
  }),
]);

const selectedProductPriority = (selected: any) => {
  const trueCount = priorityList.value.reduce(
    (count, element) => count + (element.value ? 1 : 0),
    0
  );
  if (trueCount >= 2 && !selected.value) {
    priorityErrorMsg.value = true;
    return;
  }
  priorityErrorMsg.value = false;
  selected.value = !selected.value;
  const trueValues = priorityList.value.filter(
    (element) => element.value === true
  );
  filterProductByPriority(trueValues);
};

// const list = ref(reactive(priorityList.value));

// const filterProductByPriority = (priorities) => {
//   productStore.productPriority = [];
//   for (const i in priorities) {
//     productStore.productPriority.push(priorities[i].name);
//   }
//   console.log("Product Priority", productStore.productPriority);
//   let filteredProductsWithPriority = [];
//   for (let i = 0; i < 2; i++) {
//     let filteredTemp = [];
//     if (productStore.productPriority[i] === "Active Noice Canceling") {
//       for (const product of productStore.productDetails) {
//         if (product.ANC_Score != null) {
//           filteredTemp.push(product);
//           filteredTemp.sort((a, b) => {
//             const ANC_ScoreA = parseFloat(a.ANC_Score.value);
//             const ANC_ScoreB = parseFloat(b.ANC_Score.value);
//             if (ANC_ScoreA > ANC_ScoreB) {
//               return -1;
//             }
//             if (ANC_ScoreA < ANC_ScoreB) {
//               return 1;
//             }

//             return 0;
//           });
//           filteredTemp = filteredTemp.filter((product) => {
//             return (
//               product.price.value >= productStore.priceRange.min &&
//               product.price.value <= productStore.priceRange.max
//             );
//           });
//         }
//       }
//     } else if (productStore.productPriority[i] === "Microphone") {
//       for (const product of productStore.productDetails) {
//         if (product.microphoneScore != null) {
//           filteredTemp.push(product);
//           filteredTemp.sort((a, b) => {
//             const microphoneScoreA = parseFloat(a.microphoneScore.value);
//             const microphoneScoreB = parseFloat(b.microphoneScore.value);
//             if (microphoneScoreA > microphoneScoreB) {
//               return -1;
//             }
//             if (microphoneScoreA < microphoneScoreB) {
//               return 1;
//             }

//             return 0;
//           });
//           filteredTemp = filteredTemp.filter((product) => {
//             return (
//               product.price.value >= productStore.priceRange.min &&
//               product.price.value <= productStore.priceRange.max
//             );
//           });
//         }
//       }
//     } else if (productStore.productPriority[i] === "Battery Life") {
//       for (const product of productStore.productDetails) {
//         if (product.batteryLifeScore != null) {
//           filteredTemp.push(product);
//           filteredTemp.sort((a, b) => {
//             const batteryLifeScoreA = parseFloat(a.batteryLifeScore.value);
//             const batteryLifeScoreB = parseFloat(b.batteryLifeScore.value);
//             if (batteryLifeScoreA > batteryLifeScoreB) {
//               return -1;
//             }
//             if (batteryLifeScoreA < batteryLifeScoreB) {
//               return 1;
//             }

//             return 0;
//           });
//           filteredTemp = filteredTemp.filter((product) => {
//             return (
//               product.price.value >= productStore.priceRange.min &&
//               product.price.value <= productStore.priceRange.max
//             );
//           });
//         }
//       }
//     } else if (productStore.productPriority[i] === "Sound Quality") {
//       for (const product of productStore.productDetails) {
//         if (product.soundQualityScore != null) {
//           filteredTemp.push(product);
//           filteredTemp.sort((a, b) => {
//             const soundQualityScoreA = parseFloat(a.soundQualityScore.value);
//             const soundQualityScoreB = parseFloat(b.soundQualityScore.value);
//             if (soundQualityScoreA > soundQualityScoreB) {
//               return -1;
//             }
//             if (soundQualityScoreA < soundQualityScoreB) {
//               return 1;
//             }

//             return 0;
//           });
//           filteredTemp = filteredTemp.filter((product) => {
//             return (
//               product.price.value >= productStore.priceRange.min &&
//               product.price.value <= productStore.priceRange.max
//             );
//           });
//         }
//       }
//     }
//     console.log(productStore.productPriority[i], filteredTemp);
//     filteredProductsWithPriority =
//       filteredProductsWithPriority.concat(filteredTemp);
//   }
//   let filteredTemp = [];
//   for (const product of productStore.productDetails) {
//     filteredTemp.push(product);
//     filteredTemp.sort((a, b) => {
//       const finalScoreA = parseFloat(a.finalScore.value);
//       const finalScoreB = parseFloat(b.finalScore.value);
//       if (finalScoreA > finalScoreB) {
//         return -1;
//       }
//       if (finalScoreA < finalScoreB) {
//         return 1;
//       }
//       return 0;
//     });
//   }
//   filteredProductsWithPriority = filteredProductsWithPriority.concat(
//     filteredTemp
//   );
//   filteredProductsWithPriority = Array.from(
//     new Set(filteredProductsWithPriority)
//   );
//   productStore.productDetails = filteredProductsWithPriority;
//   console.log(productStore.productDetails);
// };

const filterProductByPriority = (priority) => {
  // console.log(priority[i]);
  if (priority.length == 2) {
    const feature1 = priority[0].apiName;
    const feature2 = priority[1].apiName;
    console.log(feature1, feature2);
    productStore.productDetails.sort((a, b) => {
      const threshold = 0.5;
      let aFeature1 = 0;
      let bFeature1 = 0;
      let aFeature2 = 0;
      let bFeature2 = 0;

      if (a[feature1]) {
        aFeature1 = parseFloat(a[feature1]["value"]);
      }
      if (b[feature1]) {
        bFeature1 = parseFloat(b[feature1]["value"]);
      }
      if (a[feature2]) {
        aFeature2 = parseFloat(a[feature2]["value"]);
      }
      if (b[feature2]) {
        bFeature2 = parseFloat(b[feature2]["value"]);
      }

      const finalScoreA = parseFloat(a["finalScore"]["value"]);
      const finalScoreB = parseFloat(b["finalScore"]["value"]);

      let diff = finalScoreB - finalScoreA;
      if (Math.abs(diff) > threshold) return diff;

      diff = bFeature1 - aFeature1;
      if (Math.abs(diff) > threshold) return diff;

      return bFeature2 - aFeature2;
    });
  } else if (priority.length == 1) {
    const feature1 = priority[0].apiName;
    const feature2 = priority[0].apiName;
    console.log(feature1, feature2);
    productStore.productDetails.sort((a, b) => {
      const threshold = 0.5;
      let aFeature1 = 0;
      let bFeature1 = 0;
      let aFeature2 = 0;
      let bFeature2 = 0;

      if (a[feature1]) {
        aFeature1 = parseFloat(a[feature1]["value"]);
      }
      if (b[feature1]) {
        bFeature1 = parseFloat(b[feature1]["value"]);
      }
      if (a[feature2]) {
        aFeature2 = parseFloat(a[feature2]["value"]);
      }
      if (b[feature2]) {
        bFeature2 = parseFloat(b[feature2]["value"]);
      }

      const finalScoreA = parseFloat(a["finalScore"]["value"]);
      const finalScoreB = parseFloat(b["finalScore"]["value"]);

      let diff = finalScoreB - finalScoreA;
      if (Math.abs(diff) > threshold) return diff;

      diff = bFeature1 - aFeature1;
      if (Math.abs(diff) > threshold) return diff;

      return bFeature2 - aFeature2;
    });
  } else {
    console.log("no priority");
  }
  // const feature1 = priority[0].apiName;
  // const feature2 = priority[1].apiName;
};

// watch(priorityList.value, (newValue) => {
//   filterProductByPriority(newValue);
// });

const backbutton = () => {
  productStore.firstQuestionAskedOrNot -= 1;
};
</script>

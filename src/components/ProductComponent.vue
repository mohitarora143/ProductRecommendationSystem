<template>
  <div class="row">
    <q-card
      class="cursor-pointer col-md-11 slide-right"
      :style="{ animationDelay: `${0.05 * props.index}s` }"
      id="animatedDiv"
      @click="viewSpecs()"
    >
      <div class="product-number" style="opacity: 1">
        <div
          class="flex justify-center items-center border w-7 h-7 bg-secondary border-grey-circle text-gray-900"
        >
          <div class="text-xs leading-zero font-sans font-bold text-white">
            {{ props.index + 1 }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4 q-pa-md overflow-hidden">
          <div class="overflow-hidden">
            <img
              :src="
                props.Productdetails.imageURL
                  ? props.Productdetails.imageURL.value
                  : ''
              "
              class="product-image"
            />
          </div>
        </div>
        <div class="col-8 q-py-sm q-px-md bg-info column justify-between">
          <div class="column">
            <div class="flex flex-grow justify-between w-full">
              <span class="row text-subtitle1 font-sans text-weight-bold">{{
                props.Productdetails.name ? props.Productdetails.name.value : ""
              }}</span>
              <div
                class="text-small font-sans text-white bg-secondary rounded-xl text-center"
                style="width: 80px; height: 20px"
                v-if="
                  props.Productdetails.allBestListNames.value.includes('ears')
                "
              >
                Fit Small Ear
              </div>
            </div>
            <span
              class="text-small text-weight-bold q-pt-xs text-letter-spacing"
              v-if="props.Productdetails.allBestListNames.value"
            >
              Pros:-
              {{
                props.Productdetails.allBestListNames
                  ? props.Productdetails.allBestListNames.value
                  : ""
              }}
            </span>
            <div class="text-small font-sans text-weight-bold q-my-auto q-pt-xs q-pb-sm">
              MRSP:- ${{
                props.Productdetails.price
                  ? props.Productdetails.price.value
                  : 0
              }}
            </div>
            <!-- <span class="text-gray-500 text-weight-medium"
              >Avg Score:-
              {{
                props.Productdetails.productAverageScore
                  ? parseFloat(
                      props.Productdetails.productAverageScore.value
                    ).toFixed(2)
                  : "0"
              }}</span
            >
            <span class="text-gray-500 text-weight-medium"
              >Final Score:-
              {{
                props.Productdetails.finalScore
                  ? parseFloat(props.Productdetails.finalScore.value).toFixed(2)
                  : "0"
              }}</span
            > -->
            <transition
              appear
              appear-class="delayed-appear"
              enter-active-class="animated zoomIn slower delay-1s repeat-2"
            >
              <span
                class="text-gray-500 text-weight-regular text-caption text-black"
                v-if="
                  productStore.budsOrHeadphones &&
                  productStore.firstQuestionAskedOrNot > 0
                "
              >
                <q-icon
                  name="headset"
                  color="positive"
                  size="15px"
                  class="q-mr-xs"
                />Type- {{ productStore.budsOrHeadphones }}</span
              >
            </transition>
            <transition
              appear
              appear-class="delayed-appear"
              enter-active-class="animated bounceIn slower delay-1s repeat-2"
            >
              <span
                class="text-gray-500 text-weight-regular text-caption text-black"
                v-if="
                  productStore.wiredOrWireless &&
                  productStore.firstQuestionAskedOrNot > 1
                "
                ><q-icon
                  name="bluetooth"
                  color="blue"
                  size="15px"
                  class="q-mr-xs"
                />Connectivity-
                {{
                  productStore.wiredOrWireless.replace(/Connectivity/g, "")
                }}</span
              >
            </transition>
            <transition
              appear
              appear-class="delayed-appear"
              enter-active-class="animated zoomIn slower delay-1s repeat-2"
            >
              <span
                class="text-gray-500 text-weight-regular text-caption text-black"
                v-if="DeviceType()"
                ><q-icon
                  name="phone_iphone"
                  color="grey"
                  size="15px"
                  class="q-mr-xs"
                />Optimised For- {{ productStore.deviceType }}</span
              >
            </transition>
          </div>
          <div class="justify-end">
            <div class="row flex">
              <q-space></q-space>
              <q-btn
                class="text-caption font-sans text-white text-weight-medium bg-secondary rounded-xl"
                @click="viewSpecs()"
                size="10px"
                style="width: 125px"
              >
                View Specs
              </q-btn>
            </div>
            <div class="flex q-mt-xs text-center">
              <q-space></q-space>
              <q-btn
                class="text-caption font-sans text-white text-weight-medium bg-secondary rounded-xl"
                size="10px"
                @click="
                  viewPriceOnAmazon(props.Productdetails.productURL.value)
                "
                style="width: 125px"
              >
                Check Price
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
  <!-- popup -->
  <q-dialog v-model="viewSpecifications">
    <q-card class="specs-main-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6"></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none text-center column">
        <div class="overflow-hidden">
          <img
            :src="
              props.Productdetails.imageURL
                ? props.Productdetails.imageURL.value
                : ''
            "
            class="q-mx-auto product-specs-image"
          />
        </div>
        <span class="text-h5 font-sans text-weight-bold">{{
          props.Productdetails.name ? props.Productdetails.name.value : ""
        }}</span>
        <span class="text-subtitle1 font-sans text-weight-regular"
          ><span class="text-h6 font-sans"> Product Overview:- </span>
          {{
            props.Productdetails.fullOverview
              ? props.Productdetails.fullOverview.value
              : ""
          }}</span
        >
        <span
          class="text-subtitle1 font-sans text-weight-regular"
          v-if="props.Productdetails.allBestListNames.value"
          ><span class="text-h6 font-sans"> Pros:- </span>
          {{ props.Productdetails.allBestListNames.value }}</span
        >

        <div class="q-mx-auto q-my-md">
          <button
            class="flex justify-center hover:bg-blue-700 border-blue-600 border text-blue text-subtitle1 q-px-md q-py-sm font-sans rounded-xl cursor-pointer text-weight-medium"
            size="md"
            color="primary"
          >
            Compare recommendations
            <right-arrow-svg class="q-ml-sm" />
          </button>
        </div>

        <div class="column q-col-gutter-md">
          <div class="row q-col-gutter-lg">
            <div class="col-6">
              <product-specs
                :productSpecs="props.Productdetails"
                :specs="generalSpecs"
                :title="'GENERAL'"
              />
            </div>
            <div class="col-6">
              <product-specs
                :productSpecs="props.Productdetails"
                :specs="performanceSpecs"
                :title="'PERFORMANCE'"
              />
            </div>
            <div class="col-6">
              <product-specs
                :productSpecs="props.Productdetails"
                :specs="soundSpecs"
                :title="'SOUND'"
              />
            </div>
            <div class="col-6">
              <product-specs
                :productSpecs="props.Productdetails"
                :specs="featureSpecs"
                :title="'FEATURES'"
              />
            </div>
            <div class="col-6">
              <product-specs
                :productSpecs="props.Productdetails"
                :specs="buildAndDesign"
                :title="'BUILD & DESIGN'"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import SimpleRightArrowSvg from "./svg/SimpleRightArrowSvg.vue";
import RightArrowSvg from "../components/svg/RightArrowSvg.vue";
import ProductSpecs from "./ProductSpecs.vue";
import { useProductStore } from "src/stores/products-store";
const productStore = useProductStore();

import { ref, computed } from "vue";
const props = defineProps(["Productdetails", "index"]);
const viewSpecifications = ref(false);

const DeviceType = () => {
  if (props.Productdetails.allBestListNames) {
    return (
      productStore.deviceType &&
      productStore.firstQuestionAskedOrNot > 3 &&
      (props.Productdetails.name.value.includes(productStore.deviceType) ||
        props.Productdetails.allBestListNames.value.includes(
          productStore.deviceType
        ))
    );
  } else return false;
};

const generalSpecs = computed(() => [
  {
    name: "Price",
    value: props.Productdetails.price ? props.Productdetails.price.value : "",
  },
  {
    name: "Brand",
    value: props.Productdetails.name
      ? props.Productdetails.name.value.split(" ")[0]
      : "",
  },
  {
    name: "Release Date",
    value: "",
  },
  {
    name: "Form Factor",
    value: "",
  },
  {
    name: "Connectivity",
    value: props.Productdetails.connectivityScore ? "Wireless" : "Wired",
  },
  {
    name: "Average Score",
    value: props.Productdetails.productAverageScore
      ? parseFloat(props.Productdetails.productAverageScore.value).toFixed(2)
      : "",
  },
]);
const performanceSpecs = computed(() => [
  {
    name: "Battery life",
    value: "",
  },
  {
    name: "Wireless charging",
    value: "",
  },
  {
    name: "Charging time",
    value: "",
  },
  {
    name: "Bluetooth version",
    value: "",
  },
  {
    name: "Case Battery Life",
    value: "",
  },
]);
const soundSpecs = computed(() => [
  {
    name: "Sound Quality",
    value: props.Productdetails.soundQualityScore
      ? `${props.Productdetails.soundQualityScore.value}/10`
      : "",
  },
  {
    name: "Bass Score",
    value: props.Productdetails.bassScore
      ? `${props.Productdetails.bassScore.value}/10`
      : "",
  },
  {
    name: "Music Score",
    value: "",
  },
  {
    name: "Phone Calls Score",
    value: "",
  },
  {
    name: "Gaming Score",
    value: "",
  },
  {
    name: "Tv and Video Score",
    value: "",
  },
  {
    name: "Exercise Score",
    value: "",
  },
  {
    name: "Air Travel Score",
    value: "",
  },
  {
    name: "Podcasts and Audiobooks Score",
    value: "",
  },
  {
    name: "Sound Profile",
    value: "",
  },
]);
const featureSpecs = computed(() => [
  {
    name: "Active Noise Cancelling",
    value: props.Productdetails.ANC_Score ? "Yes" : "No",
  },
  {
    name: "Noise Reduction Score",
    value: "",
  },
  {
    name: "Virtual Surround",
    value: "",
  },
  {
    name: "Android App",
    value: "",
  },
  {
    name: "iOS App",
    value: "",
  },
  {
    name: "Mic Quality",
    value: props.Productdetails.microphoneScore
      ? `${props.Productdetails.microphoneScore.value}/10`
      : "0",
  },
]);
const buildAndDesign = computed(() => [
  {
    name: "Build Quality",
    value: props.Productdetails.durabilityScore
      ? `${props.Productdetails.durabilityScore.value}/10`
      : "0",
  },
  {
    name: "Design Score",
    value: props.Productdetails.designScore
      ? `${props.Productdetails.designScore.value}/10`
      : "0",
  },
  {
    name: "Comfort score",
    value: props.Productdetails.comfortScore
      ? `${props.Productdetails.comfortScore.value}/10`
      : "0",
  },
  {
    name: "Size",
    value: "",
  },
  {
    name: "Fit Small Ear",
    value: props.Productdetails.fitsSmallEars
      ? `${props.Productdetails.fitsSmallEars.value}/10`
      : "",
  },
  {
    name: "Weight of single earbud",
    value: "",
  },
  {
    name: "Microphone style",
    value: "",
  },
  {
    name: "Waterproof Rating",
    value: "",
  },
  {
    name: "Dustproof Rating",
    value: "",
  },
  {
    name: "Eartip sizes included",
    value: "",
  },
  {
    name: "Color variations",
    value: "",
  },
  {
    name: "Low Latency",
    value: "",
  },
  {
    name: "Lossless Codec",
    value: "",
  },
]);

const viewSpecs = () => {
  viewSpecifications.value = true;
};
const viewPriceOnAmazon = (link) => {
  window.open(link, "_blank");
};
</script>

<style>
.simple-right-arrow-svg {
  cursor: pointer;
  width: 0.75rem;
  color: blue;
}

.specs-main-card {
  min-width: 700px;
}
</style>

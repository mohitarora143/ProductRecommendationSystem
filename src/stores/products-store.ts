import { defineStore } from "pinia";
import ProductService from "src/services/ProductService";
import json from "../assets/api_response.json";

export const useProductStore = defineStore("product", {
  state: () => ({
    // counter: 0,
    budsOrHeadphones: "",
    wiredOrWireless: "",
    firstQuestionAskedOrNot: 0,
    productDetails: [],
    filteredProducts: [],
    fitOnSmallEar: "",
    deviceType: "",
    productActivities: [],
    storeLoader: false,
    priceRange: {
      min: 50,
      max: 500,
    },
    productPriority: [],
    warningMsg:false,
  }),
  getters: {},
  actions: {
    async getProducts() {
      this.storeLoader = true;
      const response = await ProductService.fetchRecommendations(
        this.budsOrHeadphones,
        this.wiredOrWireless,
        this.fitOnSmallEar,
        this.deviceType
      );
      this.productDetails = response.data.results.bindings;
      this.storeLoader = false;
      this.firstQuestionAskedOrNot += 1;
      console.log("Product Details", this.productDetails);
      this.priceRange.min = this.minVal();
      this.priceRange.max = this.maxVal();
    },

     async topFiveProducts(){
      this.productDetails = json.results.bindings;
      console.log("TopFiveProducts Details", this.productDetails);
      this.priceRange.min = this.minVal();
      this.priceRange.max = this.maxVal();
    },
    minVal() {
      if (this.productDetails.length > 0) {
        const prices = this.productDetails.map((product) =>
          parseFloat(product.price.value)
        );
        return Math.min(...prices)-1; // Use Math.min to find the minimum value
      } else {
        return 0;
      }
    },
    maxVal(){
      if (this.productDetails.length > 0) {
        const prices = this.productDetails.map((product) =>
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
    }
  },
});

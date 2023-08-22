<script setup>
// import { computed } from "vue";
import { useMainStore } from "@/stores/main";
import SectionMain from "@/components/base/SectionMain.vue";
import ProductCard from "@/components/base/ProductCard.vue";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import SectionBannerStarOnGitHub from "@/components/base/SectionBannerStarOnGitHub.vue";

const main = useMainStore();
const productList = main.productList;

</script>

<template>
  <AuthenticatedLayout>
    <SectionMain>
      <div v-for="(product,index) in productList" :key="index">
        <ProductCard :product="product"/>
        <SectionBannerStarOnGitHub class="mt-6 mb-6" />
      </div>
    </SectionMain>
  </AuthenticatedLayout>
</template>

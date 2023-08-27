<script setup>
import { useMainStore } from "@/stores/main";
import SectionMain from "@/components/base/SectionMain.vue";
import ProductCard from "@/components/base/ProductCard.vue";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import SectionBannerStarOnGitHub from "@/components/base/SectionBannerStarOnGitHub.vue";

const main = useMainStore()

const productList = main.productList;

</script>

<template>
  <AuthenticatedLayout>
    <SectionMain >
      <div v-for="(product) in productList" :key="product.id">
        <ProductCard :name="product.name" :description="product.description" :image="product.image" :id="product._id"/>
      </div>
        <SectionBannerStarOnGitHub class="mt-6 mb-6" />
    </SectionMain>
  </AuthenticatedLayout>
</template>

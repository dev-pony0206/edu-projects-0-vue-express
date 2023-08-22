<script setup>
import SectionMain from "@/components/base/SectionMain.vue";
import RegisterProduct from "@/components/base/RegisterProduct.vue";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import SectionBannerStarOnGitHub from "@/components/base/SectionBannerStarOnGitHub.vue";

</script>

<template>
  <AuthenticatedLayout>
    <SectionMain>
      <RegisterProduct/>
      <SectionBannerStarOnGitHub class="mt-6 mb-6" />
    </SectionMain>
  </AuthenticatedLayout>
</template>

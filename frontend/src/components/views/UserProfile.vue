<script setup>
import SectionMain from "@/components/base/SectionMain.vue";
import ProfileCard from "@/components/base/ProfileCard.vue";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import SectionBannerStarOnGitHub from "@/components/base/SectionBannerStarOnGitHub.vue";
</script>

<template>
  <AuthenticatedLayout>
    <SectionMain>
      <ProfileCard/>
      <SectionBannerStarOnGitHub class="mt-6 mb-6" />
    </SectionMain>
  </AuthenticatedLayout>
</template>

<script setup>
// import { computed } from "vue";
import SectionMain from "@/components/base/SectionMain.vue";
import ProfileCard from "@/components/base/ProfileCard.vue";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import SectionBannerStarOnGitHub from "@/components/base/SectionBannerStarOnGitHub.vue";

import {useMainStore} from '../../stores/main';

const mainStore = useMainStore();
const user = mainStore.user;

</script>

<template>
  <AuthenticatedLayout>
    <SectionMain>
      <!-- <ProfileCard :user="user"/> -->
      <ProfileCard :user="user"/>
      <SectionBannerStarOnGitHub class="mt-6 mb-6" />
    </SectionMain>
  </AuthenticatedLayout>
</template>

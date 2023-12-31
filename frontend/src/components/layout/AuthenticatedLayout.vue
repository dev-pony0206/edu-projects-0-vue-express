<script setup>
import { ref } from "vue";
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import { useRouter } from "vue-router";
import menuAside from "./menuAside.js";
import menuNavBar from "./menuNavbar.js";
import { useStyleStore } from "@/stores/style.js";
import { useMainStore } from "@/stores/main.js";
import BaseIcon from "@/components/base/BaseIcon.vue";
import FormControl from "@/components/base/FormControl.vue";
import NavBar from "@/components/base/NavBar.vue";
import NavBarItemPlain from "@/components/base/NavBarItemPlain.vue"; 
import AsideMenu from "@/components/base/AsideMenu.vue";
import FooterBar from "@/components/base/FooterBar.vue";

const layoutAsidePadding = "xl:pl-60";

const main = useMainStore();
const styleStore = useStyleStore();

const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    main.$reset(null);
    localStorage.removeItem('user');
    router.push('/')
  }
};
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
      <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>
          <FormControl
            placeholder="Search (ctrl+k)"
            ctrl-k-focus
            transparent
            borderless
          />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      <FooterBar class=" fixed bottom-1">
        Get more with
        <a
          href="https://vuejs.org/guide/introduction.html"
          target="_blank"
          class="text-blue-600"
          >Vue.js v3</a
        >
      </FooterBar>
    </div>
  </div>
</template>

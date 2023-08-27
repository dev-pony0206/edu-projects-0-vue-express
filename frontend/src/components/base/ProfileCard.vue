<template>
  
  <div class=" flex justify-center items-center">
    <div class="bg-fuchsia-400  rounded-3xl">
    <div class="px-4 py-6 flex justify-center items-center border-b-2 border-white">
      <h1 class="font-bold text-2xl  text-purple-900 ">My Profile</h1>
    </div>

    <!-- body -->
    <div class="px-4 py-6">
      <b class="text-2xl">Name</b>
      <input type="text" name="name" id="name"
        class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl" :value="main.user.name" />
      <b class="text-2xl">Email</b>
      <input type="email" name="email" id="email" class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl" :value="main.user.email"/>
      <button type="button" class="rounded-2xl bg-purple-800 shadow-md p-3 my-1 w-full text-white text-2xl" @click.prevent="confirmProfile">
       OK
      </button>
    </div>

    <!-- footer -->
    <div class="px-4 py-6 border-t-2 border-white">
      <p class="text-purple-900  font-bold text-xl">
        Like this Project? <a href="https://github.com/ChristoperCarter0206/edu-projects-0-nest-vue">GitHub</a>
      </p>
    </div>
  </div>
</div>

</template>


<script setup>

import {useRouter} from 'vue-router';
import {useMainStore} from '../../stores/main';

const main = useMainStore();

const router = useRouter();

const confirmProfile = () => {
  router.push('/list')
}

</script>
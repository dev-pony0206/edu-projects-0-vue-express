<template>
  <div class=" flex justify-center items-center">
    <div class="bg-fuchsia-400  rounded-3xl">
    <div class="px-4 py-6 flex justify-center items-center border-b-2 border-white">
      <h1 class="font-bold text-2xl  text-purple-900 ">New Product</h1>
    </div>

    <!-- body -->
    <form class="px-4 py-6" @submit.prevent="submit"  enctype="multipart/form-data">
      <div class="">
        <img class="w-80 h-60" v-bind:src="url">
        <input type="file" @change="chooseFile"  ref="file"/>
      </div>    
      <b class="text-2xl">Name</b>
      <input type="text" name="name" id="name"
        class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl" v-model="name" />
      <b class="text-2xl">Description</b>
      <textarea  name="description" id="description" class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl" v-model="description">
      </textarea>
      <button type="submit" class="rounded-2xl bg-purple-800 shadow-md p-3 my-1 w-full text-white text-2xl" >
       OK
      </button>
    </form>

    <!-- footer -->
    <div class="px-4 py-6 border-t-2 border-white">
      <p class="text-purple-900  font-bold text-xl">
        Like this Project? <a href="https://github.com/ChristoperCarter0206/edu-projects-0-nest-vue">GitHub</a>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import { useMainStore } from '@/stores/main';

export default {
  data(){
    return{
      image:null,
      name:null,
      description:null,
      url:"2.jpg"
    }
  },
  methods:{
  registerProduct(data){
    useMainStore().registerProduct(data)
  },
  chooseFile(){
    this.image = this.$refs.file.files[0];
    this.url = URL.createObjectURL(this.image);
  }, 
  submit() {
        const formData = new FormData();
        formData.append('name',this.name  );
        formData.append('description', this.description);
        formData.append('file', this.image);
        this.registerProduct(formData)
        this.name = null
        this.image = null
        this.description = null
        this.url = "2.jpg"
  }
}}
</script>
<script>
import EditModal from "./EditModal.vue";
import { useMainStore } from '@/stores/main';

export default {
  name: "ProductCard",
  components: {
    EditModal,
  },
  props: {
    name: { required: true, type: String },
    description: { required: true, type: String },
    image: { required: true, type: String },
    id: { required: true },
  },
  data() {
    return {
      isModalVisible: false,
      ImagePreviewURL: "2.jpg",
      url: '',
      updateName: '',
      updateImage: '',
      updateDescription: ''
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    updateProduct() {
      const formData = new FormData();
      formData.append('name', this.updateName);
      formData.append('description', this.updateDescription);
      formData.append('file', this.updateImage);
      formData.append('id',this.id)
      const updatedProduct = {
        name:this.updateName,
        description:this.updateDescription,
        image:this.url
      }
      useMainStore().updateProduct(formData,updatedProduct)
    },
    closeModal() {
      this.isModalVisible = false;
    },
    deleteProduct() {
      const data = { id:this.id }
      useMainStore().deleteProduct(data)
    },
    chooseFile() {
      this.updateImage = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.updateImage);
    },
  },
};
</script>

<template>
  <div class="mx-auto my-8"> 
    <div class="container grid col-span-12 h-60">
      <div class="col-start-2 col-end-3 flex justify-center ">
        <img class="rounded-full" :src="image" />
      </div>
      <div class="col-start-5 col-end-9 ">
        <div class="h-1/2  flex items-center">
          <b class="font-display text-5xl text-amber-500">{{ name }}</b>
        </div>
        <div class="h-1/2">
          <p class="vertical-middle text-3xl text-cyan-600">{{ description }}</p>
        </div>
      </div>
      <div class="col-start-9 col-end-10">
        <div class="h-1/2 flex justify-center items-center">
          <input type="button" class="w-20 p-1 bg-sky-700 rounded-full" value="Edit" @click.prevent="showModal" />
          <EditModal v-show="isModalVisible" @closeModal="closeModal">
            header
            <template v-slot:header>
              <h1 class="font-bold text-2xl  text-purple-900">Edit Product</h1>
            </template>

            <!-- body -->
            <template v-slot:body>
              <form @submit.prevent="updateProduct">
                <div>
                  <img class="w-80 h-60 mx-auto" v-bind:src="url==''?image:url">
                  <input class="rounded-full mt-1 mx-auto" type="file" @change="chooseFile" ref="file" />
                </div>
                <input type="text" name="name" id="name"
                  class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl" :value="name"
                  v-on:input="(e) =>{ updateName = e.target.value}" />
                <input type="text" name="description" id="description"
                  class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl" :value="description"
                  v-on:input="(e) =>{ updateDescription = e.target.value}" />
                <p class="py-3 font-bold text-purple-900 text-xl">
                  Your story starts with this.
                </p>
                <button type="submit" class="rounded-2xl bg-purple-800 shadow-md p-3 my-1 w-full text-white text-2xl">
                  Update
                </button>
              </form>
            </template>

            <!-- footer -->
            <template v-slot:footer>
              <p class="text-purple-900  font-bold text-xl">
                Like this Project? <a href="https://github.com/ChristoperCarter0206/edu-projects-0-nest-vue">GitHub</a>
              </p>
            </template>
          </EditModal>
        </div>
        <div class="h-1/2 flex justify-center items-center">
          <input type="button" class="bg-red-700 rounded-full w-20 p-1" value="Delete" @click.prevent="deleteProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

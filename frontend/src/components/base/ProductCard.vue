<script>
import EditModal from "./EditModal.vue";
import {useMainStore} from '@/stores/main';
import {defineProps} from 'vue';

const main = useMainStore();
const registerProduct = main.registerProduct;
const deleteProduct = main.deleteProduct;

defineProps({
  product:{
    type:Object,
    required:true,  
  }
});
const url = props.product.url;

export default {
  name: "ProductCard",
  components: {
    EditModal,
  },
  data() {
    return {
      isModalVisible: false,
      ImagePreviewURL: url,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    onFileChange(payload) {
      const image = payload.target.images[0]; // use it in case of normal HTML input
      // const image = payload; // in case vuetify file input
      if (image) {
        this.imagePreviewURL = URL.createObjectURL(image);
        URL.revokeObjectURL(image); // free memory
      } else {
        this.imagePreviewURL =  null
      }
    }
  },
};
</script>

<template>
    <div class="mx-auto my-8">
      <div class="container grid col-span-12 h-60">
        <div class="col-start-2 col-end-3 flex justify-center ">
            <img class="rounded-full" src="watch.jpg"/>
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
            <input type="button" class="w-20 p-1 bg-sky-700 rounded-full" value="Edit" @click.prevent="showModal"/>
            <EditModal v-show="isModalVisible" @closeModal="closeModal">
                 header
                <template v-slot:header>
                  <h1 class="font-bold text-2xl  text-purple-900">Edit Product</h1>
                </template>

                <!-- body -->
                <template v-slot:body >
                  <div>
                    <input
                        type="image"
                        :src="ImagePreviewURL"
                        label="Image"
                        required
                        @click.prevent="onFileChange"
                    />
                    <!-- <img
                      v-if="imagePreviewURL"
                      :src="ImagePreviewURL"
                      alt=""
                      style="max-width: 100%;width: 250px; object-fit: cover"
                    /> -->
                    <!-- <img
                    
                      src="3.jpg"
                      alt=""
                      style="max-width: 100%;width: 250px; object-fit: cover"
                    /> -->
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl"
                    :value="name"
                  />
                  <input
                    type="text"
                    name="description"
                    id="description"
                    class="rounded-2xl w-full p-3 my-1 shadow-md outline-none text-black text-2xl"
                    :value="description"
                  />
                  <p class="py-3 font-bold text-purple-900 text-xl">
                   Your story starts with this.
                  </p>

                  <button
                    type="button"
                    class="rounded-2xl bg-purple-800 shadow-md p-3 my-1 w-full text-white text-2xl" @click.prevent="registerProduct"
                  >
                    Update
                  </button>
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
            <input type="button" class="bg-red-700 rounded-full w-20 p-1" value="Delete" @click.prevent="deleteProduct"/>
          </div>
        </div>
      </div>
    </div>
</template>

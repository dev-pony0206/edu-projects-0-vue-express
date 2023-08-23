<template>
  <div>
      <!--Image attachment preview / Previous image section-->
    <div>
      <img :src="preview == '' ? default_img : preview"  style="height: '160', width: '160'">
    </div>
      <!--Image attachment upload section-->
    <div class="d-flex justify-content-center mt-1 align-items-baseline">
      <div>
        <label for="sufile"  class="text-indigo-900 text-2xl" title="Choose image">
          <input type="file" id="sufile" name="suImage" autocomplete="off" @change="attachimage" class="hidden">
            Choose Image
        </label>
      </div> 
      <div>   
        <button class="btn text-danger" @click="delete_Image">
          <i class="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>      
  </div>
</template>
<script>
export default {
  name: 'ImagePart',
  data(){
      return{
          preview: "",
          default_img: "https://github.com/azeemade/image-upload-vue/blob/main/src/assets/default.png?raw=true"
      }
  },
  methods:{
      attachimage(e) {
          var files = e.target.files
          if (!files.length)
              return;
          this.create_Image(files[0]);
          return files;
      },
      create_Image(file) {
          var reader = new FileReader();
          reader.onload = (e) => {
              this.preview = e.target.result;
          };
          reader.readAsDataURL(file);
      },
      delete_Image(files){
          var file = Array.from(files);
          file.splice(0, 1);
          this.preview = this.default_img;
      }
  },
}
</script>

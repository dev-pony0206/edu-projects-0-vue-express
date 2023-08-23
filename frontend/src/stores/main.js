import { defineStore } from "pinia";
import router from '../router';
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    user:{},
    productList:[],
  }),

  actions: {
    signupUser(user){
      axios
        .post("",user)
        .then((res) => {
          console.log(res);
          router.push('/')
        })
        .catch((error) => {
          console.log(error);
        })
    },

    loginUser(user){
      axios
        .post("",user)
        .then((res) => {
         this.user = res.data.user;
          localStorage.setItem('user',JSON.stringify(user));
          router.push('/list');
        })
        .catch((error) => {
          alert(error.message);
        })
    },

    logoutUser() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    },

    getProductList() {
      axios
        .get("")
        .then((res) => {
         this.productList = res.data.productList;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    registerProduct(updateSingle,name,description) {
      let formData = new FormData();
        formData.append("updateSingle", updateSingle);
        formData.append("name", name);
        formData.append("description", description);
      axios .post('', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
              console.log(response.data);
              })
    },

    deleteProduct(id) {
      axios
        .delete("",id)
        .then(res => {
          console.log(res.data);
          this.productList.splice(id,1);
          return this.productList
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
});

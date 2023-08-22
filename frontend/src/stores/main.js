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

    registerProduct(product) {
      axios
        .post("",product)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
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

import { defineStore } from "pinia";
import { ref } from "vue";
import router from '../router';
import axios from "axios";
import { server } from "@/helper";
import jwtDecode from "jwt-decode";

const API_PATH = server.baseURL;

export const useMainStore = defineStore("main",() => {

  const user = ref({})
  const productList = ref([])

    function signupUser (payload) {
      console.log(payload)
      axios
        .post(`${API_PATH}/api/users/signup`,payload)
        .then((res) => {
          console.log(res);
          router.push('/')
        }) 
        .catch((error) => {
          alert(error.message);
        })
    }

    function loginUser(payload){
      axios
        .post("http://localhost:5000/api/auth/login",payload)
        .then((res) => {
          const decoded = jwtDecode(res.data.token);
          console.log('decoded =>', decoded) 
          $reset(decoded.user)
          localStorage.setItem('user',JSON.stringify(res.data));
          router.push('/list');
        })
        .catch((error) => {
          alert(error.message);
        })
    }

    function logoutUser() {
      $reset({});
      localStorage.removeItem('user');
      router.push('/login');
    }

    function getProductList() {
      axios
        .get("http://localhost:5000/api/products/get")
        .then((res) => {
         productList.value = res.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    function registerProduct(payload) {
      axios .post('http://localhost:5000/api/products/register', payload)
            .then(res => {
              productList.value.push(res.data)
              })
              .catch((error) => {
                alert(error.message);
              });
    }

    function updateProduct(payload,updatedProduct){
      axios
          .post('http://localhost:5000/api/products/update',payload)
          .then(res=>{
            console.log(res.data)
            const updateIndex = productList.value.findIndex(x => x.id === payload.id)
            productList.value[updateIndex] = {...productList.value[updateIndex], name:updatedProduct.name, description:updatedProduct.description, image:updatedProduct.image}
          })
          .catch(error=>{
            alert(error.message)
          })
    }

    function deleteProduct(id) {
      axios
        .post("http://localhost:5000/api/products/delete",id)
        .then((res) => {
          console.log(res.data)
          productList.value.splice(id,1);
        })
        .catch((error) => {
          console.log(error);
        });
    }  

    function $reset(payload) {
      user.value = payload
    }

    return{user,productList,signupUser, loginUser,logoutUser,getProductList,registerProduct,deleteProduct,updateProduct,$reset}
});

<template>
  <add_product ref="productsModal" />
  <div class="product-box" v-if="product">
    <button class="back" @click="back">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <h2>
      Product details with id <span>{{ product._id }}</span
      >:
    </h2>
    <p><span>name:</span> {{ product.name }}</p>
    <p><span>brand:</span> {{ product.brand }}</p>
    <p><span>group:</span> {{ product.group }}</p>
    <p><span>price:</span> ${{ product.price }}</p>
    <p><span>arrival price:</span> ${{ product.arrival_price }}</p>
    <p><span>selling price:</span> ${{ product.selling_price }}</p>
    <p><span>description:</span> {{ product.description }}</p>

    <div class="buttons">
      <button class="btn delete" @click="deleteProduct">
        <i class="fa-solid fa-trash-can"></i>Delete Product
      </button>
      <button class="btn edit" @click="editProduct(product)">
        <i class="fa-solid fa-pen-to-square"></i> Edit Product
      </button>
    </div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Notification from "@/components/plugins/Notification";
import add_product from "@/components/pages/add_product.vue";
import { ref } from "vue";
import http from "../plugins/axios";
const route = useRoute();
const router = useRouter();
const productId = route.params.id;
const product = ref();
const productsModal = ref();

const getProductById = () => {
  http
    .get(`http://34.125.211.64:3300/api/products/${productId}`)
    .then((res) => {
      product.value = res.data.product;
      console.log("SingleProduct:", product.value);
    })
    .catch((err) => {
      console.log("Error in getting product by id:", err);
      Notification("Error occured", "danger");
    });
};
getProductById();

const back = () => {
  router.push({ name: "get_products" });
};

const editProduct = (product) => {
  console.log("Product id in edit button:", product);
  productsModal.value.openModal(product);
};

const deleteProduct = () => {
  http
    .delete(`http://34.125.211.64:3300/api/products/${productId}`)
    .then((res) => {
      Notification("Product successfully deleted", "success");
      back();
    })
    .catch((err) => {
      console.log("Error deleting product");
      Notification("Error occured", "danger");
    });
};
</script>

<style lang="scss" scoped>
.product-box {
  margin: auto;
  margin-top: 50px;
  padding: 50px;
  display: flex;
  border: 2px solid rgb(73, 206, 255);
  width: 70%;
  font-family: sans-serif;
  flex-direction: column;
  border-radius: 10px;
  // position: relative;
}

span {
  color: rgb(73, 206, 255);
  font-size: 20px;
  margin-right: 10px;
}

.buttons {
  // border: 1px solid red;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.btn {
  width: 48%;
  padding: 13px 15px;
  border-radius: 30px;
  color: white;
  border: none;
  font-size: 17px;
  transition: all 0.2s linear;
  background-color: rgb(73, 206, 255);
}

.back {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  color: white;
  border: none;
  background-color: rgb(73, 206, 255);
  // position: absolute;
  font-size: 25px;
  margin-left: 104%;
  margin-top: -9%;
  transition: all 0.2s linear;
}

.back:hover {
  background-color: crimson;
}

.edit:hover {
  background-color: rgb(246, 193, 94);
}
.delete:hover {
  background-color: rgb(233, 58, 93);
}

.fa-pen-to-square,
.fa-trash-can {
  font-size: 20px;
  margin-right: 10px;
}
</style>

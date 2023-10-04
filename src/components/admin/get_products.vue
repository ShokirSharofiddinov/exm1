<template>
  <h1>All Products</h1>
  <div class="products-box">
    <ol class="products-list">
      <li v-for="item in products" :key="item._id">
        <div class="list-item">
          <p>{{ item.name }}</p>
          <button @click="showMore(item._id)">Show More</button>
        </div>
        <hr style="border: 1px solid rgb(73, 206, 255)" />
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import http from "../plugins/axios";
import Notification from "../plugins/Notification";
const router = useRouter();

const products = ref([]);
const productsModal = ref();
const productId = ref();

const showMore = (id) => {
  router.push({ name: "one_product", params: { id: id } });
};

const getAllProducts = () => {
  http
    .get("http://34.125.211.64:3300/api/products")
    .then((res) => {
      products.value = res.data.products;
      console.log("Products data:", products.value);
    })
    .catch((err) => {
      console.log("Error in getAllProducts", err);
      Notification("Error occured", "danger");
    });
};

const editProduct = (id) => {
  console.log("Id:", id);
  productsModal.value.openModal(id.id);
};

getAllProducts();
</script>

<style lang="scss" scoped>
.products-box {
  display: grid;
  place-items: center;
  width: 700px;
  //   border: 1px solid red;
  margin: auto;
  font-family: sans-serif;
}

.products-list {
  display: grid;
  place-items: left;
  gap: 15;
  //   border: 1px solid green;
}

.list-item {
  display: flex;
  justify-content: space-between;
  width: 600px;
}

.list-item button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s linear;
  font-family: sans-serif;
  margin-left: 20px;
  background-color: white;
  color: rgb(73, 206, 255);
  border: 1px solid rgb(73, 206, 255);
}
.list-item button:hover {
  scale: 1.1;
  background-color: rgb(73, 206, 255);
  color: white;
}

h1 {
  font-size: 40px;
  font-family: sans-serif;
  color: rgb(73, 206, 255);
  text-align: center;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s linear;
  font-family: sans-serif;
}

.btn:hover {
  scale: 1.1;
}

.delete {
  background-color: crimson;
  color: white;
}
.edit {
  background-color: orange;
  color: white;
}

.create-btn {
  width: 200px;
  padding: 10px 15px;
  color: #000;
  margin-bottom: 30px;
  border-radius: 15px;
  background-color: rgb(73, 206, 255);
  color: white;
  font-family: sans-serif;
  border: none;
  font-size: 18px;
  transition: all 0.2s linear;
  margin-top: 70px;
}

.create-btn:hover {
  background-color: white;
  color: rgb(73, 206, 255);
  border: 2px solid rgb(73, 206, 255);
}
</style>

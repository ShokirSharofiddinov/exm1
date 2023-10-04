<template>
  <div class="container">
    <div class="sidebar-left">
      <Sidebar :items="sidebar_items" />
    </div>
    <div class="sidebar-right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Sidebar from "@/components/layout/Sidebar.vue";

const sidebar_items = ref([
  { id: 1, title: "Add Product", path: "/products" },
  { id: 2, title: "Get Products", path: "/get_products" },
]);
</script>

<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
}
.container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.sidebar-left {
  width: 300px;
  width: 300px;
  background: rgb(229, 255, 229);
}

.sidebar-right {
  width: calc(100% - 300px);
  padding-left: 50px;
}
</style>

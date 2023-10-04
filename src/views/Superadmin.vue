<template>
  <div class="box">
    <div class="left">
      <Sidebar :items="items" name="superadmin" />
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import http from "../components/plugins/axios";
import { ref } from "vue";
import Notification from "../components/plugins/Notification";
import { useRoute } from "vue-router";
import Sidebar from "../components/layout/Sidebar.vue";
const route = useRoute();

const items = ref([
  {
    id: 1,
    path: `/users`,
    title: "Users",
    icon: "fa-solid fa-user",
  },
  {
    id: 2,
    path: `/add_user`,
    title: "Add User",
    icon: "fa-solid fa-user-plus",
  },
]);
</script>

<style lang="scss" scoped>
h1 {
  font-family: sans-serif;
  color: white;
  font-size: 25px;
  text-align: center;
}
.box {
  width: 100%;
  height: 100vh;
  overflow: auto;
  // border: 1px solid red;
  display: flex;
}

.left {
  width: 21%;
}

.right {
  width: 79%;
  // border: 1px solid purple;
  margin-left: 40px;
  height: 100vh;
  overflow: auto;
}
</style>

<template>
  <div class="sidebar">
    <router-link
      class="sidebar_link"
      v-for="(item, index) in items"
      :to="item.path"
      :key="index"
      :class="{ sidebar__link_active: $route.meta.child === item.keys }"
    >
      {{ item.title }}
    </router-link>
    <button class="sidebar_link" @click="logout" style="font-size: 16px;">Logout</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
  router.push({ name: "signin" });
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.sidebar {
  width: 90%;
  height: 100vh;
  border: 3px solid rgb(0, 255, 51);
  border-radius: 15px;
  background: rgb(229, 255, 229);
  padding: 20px 0 20px 25px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .sidebar_link {
    text-align: center;
    border: 1px solid rgb(0, 255, 51);
    font-family: Arial, Helvetica, sans-serif;
    width: 90%;
    padding: 15px 0px;
    text-decoration: none;
    border-radius: 5px;
    background-color: #fff;
    color: #000016;
  }

  // .sidebar__link_active {
  //   // Add your active link styles here
  // }
}
</style>

<template>
  <div class="user_table">
    <add_user ref="usersModal" />
    <h1>All Users</h1>
    <div class="users-box">
      <ol class="users-list">
        <li v-for="item in users" :key="item._id">
          <div class="list-item" style="margin-top: 20px">
            <p>{{ item.name }} {{ item.surname }}</p>
            <button @click="showMore(item._id)">Show More</button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import http from "../plugins/axios";
import Notification from "../plugins/Notification";
import { ref } from "vue";
  import add_user from "../pages/add_user.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const users = ref([]);
const usersModal = ref();
const userId = ref();

const showMore = (id) => {
  router.push({ name: "single_user", params: { id: id } });
};

const getAllUsers = () => {
  http
    .get("http://34.125.211.64:3300/api/users")
    .then((res) => {
      users.value = res.data.users;
      console.log("Users data:", users.value);
    })
    .catch((err) => {
      console.log("Error in getAllUsers", err);
    });
};

const editUser = (id) => {
  console.log("Id:", id);
  usersModal.value.openModal(id.id);
};

getAllUsers();
</script>

<style lang="scss" scoped>
.users-box {
  display: grid;
  place-items: center;
  width: 700px;
  //   border: 1px solid red;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
}

.users-list {
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
  font-family: Arial, Helvetica, sans-serif;
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
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(73, 206, 255);
  text-align: center;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s linear;
  font-family: Arial, Helvetica, sans-serif;
}

.btn:hover {
  scale: 0.9;
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
  font-family: Arial, Helvetica, sans-serif;
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

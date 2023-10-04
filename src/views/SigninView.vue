<template>
  <div class="form-div">
    <!-- <adminRole ref="admin_role" /> -->
    <Form @submit="login" class="sign-in-form">
      <h1
        style="
          color: rgb(0, 191, 255);
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        Sign In
      </h1>
      <Field
        rules="required"
        :modelValue="form.username"
        v-slot="{ errors }"
        name="Username"
      >
        <input
          type="text"
          placeholder="Username..."
          v-model.trim="form.username"
          required
          class="input-field"
        />
        <p class="error-message" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <Field
        rules="required"
        :modelValue="form.password"
        v-slot="{ errors }"
        name="Password"
      >
        <input
          type="password"
          placeholder="Password..."
          v-model.trim="form.password"
          required
          class="input-field"
        />
        <p class="error-message" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <button type="submit" class="submit-button">Sign In</button>
    </Form>
  </div>
</template>

<!-- Your existing script and style sections remain unchanged -->

<script setup>
import http from "@/components/plugins/axios";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Notification from "../components/plugins/Notification.js";
import { Form, Field } from "vee-validate";
// import adminRole from "../components/pages/adminRole.vue";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});
// const admin_role = ref(adminRole());

const login = () => {
  http
    .post("http://34.125.211.64:3300/api/admins/login", {
      username: form.value.username,
      password: form.value.password,
    })
    .then((res) => {
      const data = res.data;
      console.log("Data:", data);
      console.log("Token:", data.token);
      console.log("Roles:", data.roles);
      if (data.token && data.roles) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        if (data.roles.includes("admin") && data.roles.includes("superadmin")) {
          router.push({ name: "role" });
        } else if (data.roles.includes("admin")) {
          router.push({ name: "admin" });
        } else if (data.roles.includes("superadmin")) {
          router.push({ name: "superadmin" });
        } else {
          Notification("Something incorrect with role", "danger");
        }
      }
    })
    .catch((err) => {
      console.log("Error in AdminLogin:", err);
      Notification("Error in Login", "danger");
    });
};
</script>

<style scoped>
.form-div {
  height: 100vh;
}
.sign-in-form {
  width: 35%;
  margin: auto;
  margin-top: 15%;
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.input-field {
  width: 90%;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.error-message {
  color: #e74c3c;
  float: left;
  margin-left: 15px;
}

.submit-button {
  width: 93%;
  padding: 10px;
  margin-top: 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #2980b9;
}
</style>

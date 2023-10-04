<template>
  <Form @submit="saveForm">
    <h1>Add User</h1>

    <Field
      rules="required"
      :modelValue="forms.name"
      v-slot="{ errors }"
      name="name"
    >
      <input type="text" placeholder="Name..." v-model="forms.name" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.surname"
      v-slot="{ errors }"
      name="surname"
    >
      <input type="text" placeholder="LastName..." v-model="forms.surname" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.age"
      v-slot="{ errors }"
      name="age"
    >
      <input type="number" placeholder="Age..." v-model="forms.age" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <select v-model="forms.is_diploma">
      <option :value="false">false</option>
      <option :value="true">true</option>
    </select>
    <Field
      rules="required"
      :modelValue="forms.address"
      v-slot="{ errors }"
      name="address"
    >
      <input type="address" placeholder="Address..." v-model="forms.address" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>

    <button type="submit">Save</button>
  </Form>
</template>

<script setup>
import http from "../plugins/axios";
import Notification from "../plugins/Notification";
import { ref } from "vue";
import appTable from "../ui/app-table.vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
const router = useRouter();

const forms = ref({
  name: "",
  surname: "",
  age: null,
  is_diploma: false,
  address: "",
});

const saveForm = () => {
  http
    .post("http://34.125.211.64:3300/api/users/add", {
      name: forms.value.name,
      surname: forms.value.surname,
      age: forms.value.age,
      is_diploma: forms.value.is_diploma,
      address: forms.value.address,
    })
    .then((res) => {
      router.push({ name: "users" });
      Notification("New user successfully added", "success");
      console.log(res.data);
      forms.value = {};
    })
    .catch((err) => {
      console.log("Error occured in adding User!", err);
      Notification("Error occured", "danger");
    });
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap");
h1 {
  font-size: 35px;
  font-family: sans-serif;
  color: rgb(73, 206, 255);
  text-align: center;
}

Form {
  width: 60%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(73, 206, 255);
  padding: 40px;
  margin-left: 100px;
  margin-top: 50px;
}

input,
select {
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 15px;
  border: 1px solid rgb(73, 206, 255);
  color: rgb(108, 108, 108);
  outline: none;
}

input::placeholder {
  color: rgb(199, 199, 199);
}

button {
  width: 100%;
  padding: 10px 15px;
  color: #000;
  margin-bottom: 50px;
  border-radius: 15px;
  background-color: rgb(73, 206, 255);
  color: white;
  font-family: sans-serif;
  border: none;
  font-size: 18px;
  transition: all 0.2s linear;
  margin-top: 25px;
}

button:hover {
  background-color: white;
  color: rgb(73, 206, 255);
  border: 2px solid rgb(73, 206, 255);
}

p {
  font-size: 15px;
  font-family: sans-serif;
  margin-top: 10px;
}
</style>

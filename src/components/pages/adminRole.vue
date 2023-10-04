<template>
  <app-modal v-model="dialog">
    <Form @submit="saveForm">
      <select class="selector1" v-model="forms.role">
        <option value="admin">Admin</option>
        <option value="superadmin">Superadmin</option>
      </select>
      <!-- Other form fields go here -->
      <button type="submit">Save</button>
    </Form>
  </app-modal>
</template>

<script setup lang="js">
import Notification from "../plugins/Notification";
import appModal from "../ui/app-modal.vue";
import { Form, Field } from "vee-validate";
import http from "../plugins/axios";
import { ref, watch, defineExpose } from "vue";
const dialog = ref(false);

const forms = ref({
  role: "", // Initialize role as an empty string
  // Add other form fields here
});

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};

const saveForm = () => {
  try {
    // Rest of your saveForm logic

    if (!forms.value.id) {
      // If role is not selected, show an error message
      if (!forms.value.role) {
        Notification("Please select a role.", "danger");
        return;
      }

      // Rest of your POST request logic
    } else {
      // Rest of your PUT request logic
    }
  } catch (error) {
    console.log("Error in saveForm function:", error);
  }
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped>
/* Your existing styles remain unchanged */
</style>

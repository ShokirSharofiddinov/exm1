import { createRouter, createWebHashHistory } from "vue-router";
import signin from "./signin";
import admin from "./admin";
import superadmin from "./superAdmin";
import role from "./role";
const routes = [signin, admin, superadmin, role];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("roles");
  console.log(from);
  console.log(to.name);
  console.log(role);
  const arr = ["superadmin", "add_users", "users"];
  const arr2 = ["admin", "products"];
  if (!role && (arr.includes(to.name) || arr2.includes(to.name))) {
    console.log(1);
    next(from);
  } else if (role && to.name == "signin") {
    console.log(2);
    next(from);
  } 
  else {
    console.log(3);
    next();
  }
});

export default router;

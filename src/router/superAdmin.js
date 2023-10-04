export default {
  path: "/superadmin",
  name: "superadmin",
  children: [
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("../components/superadmin/Users.vue");
      },
    },
    {
      path: "/add_user",
      name: "add_user",
      component: () => {
        return import("../components/superadmin/AddUsers.vue");
      },
    },
    {
      path: "/single_user/:id",
      name: "single_user",
      component: () => {
        return import("../components/superadmin/SingleUser");
      },
    },
  ],
  component: () => {
    return import("../views/Superadmin.vue");
  },
};

export default {
  path: "/",
  name: "signin",
  component: () => {
    return import("../views/SigninView.vue");
  },
};

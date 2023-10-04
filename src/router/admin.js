export default {
  path: "/admin",
  name: "admin",
  children: [
    {
      path: "/products",
      name: "products",
      component: () => {
        return import("../components/admin/products.vue");
      },
    },
    {
      path: "/get_products",
      name: "get_products",
      component: () => {
        return import("../components/admin/get_products.vue");
      },
    },
    {
      path: "/one_product/:id",
      name: "one_product",
      component: () => {
        return import("../components/admin/one_product.vue");
      },
    },
  ],
  component: () => {
    return import("../views/Admin.vue");
  },
};

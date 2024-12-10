import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TempHumView from "@/views/TempHumView.vue";
import SoilMoistView from "@/views/SoilMoistView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: HomeView,
    },
    {
      path: "/tempHum",
      name: "temperature-humidity",
      component: TempHumView,
    },
    {
      path: "/soil",
      name: "soil-moisture",
      component: SoilMoistView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;

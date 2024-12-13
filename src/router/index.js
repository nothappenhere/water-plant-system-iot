import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TempHumView from "@/views/TempHumView.vue";
import SoilMoistView from "@/views/SoilMoistView.vue";
import WaterLevel from "@/views/WaterLvlView.vue";
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
      path: "/tempHumid",
      name: "temperature-humidity",
      component: TempHumView,
    },
    {
      path: "/soilMoist",
      name: "soil-moisture",
      component: SoilMoistView,
    },
    {
      path: "/waterLvl",
      name: "water-level",
      component: WaterLevel,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;

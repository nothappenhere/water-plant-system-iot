import { ref } from "vue";
import ApexCharts from "apexcharts";
import { useChartData } from "@/utility/chartUtils.js";

const {
  maxData: maxHumid,
  minData: minHumid,
  getSevenLastData: getSevenLastHumidData,
  formattedSevenLastData: formattedSevenLastHumidData,
  formattedMaxDate: formattedMaxHumidFullDate,
  formattedMinDate: formattedMinHumidFullDate,
  getMaxData: getMaxHumid,
  getMinData: getMinHumid,
} = useChartData("humidity", "humidity");

// Konfigurasi chart khusus Humidity
const humidChartOptions = ref({
  colors: ["#264653", "#386641"],
  series: [
    {
      name: "Humidity",
      color: "#386641",
      data: [],
    },
  ],
  chart: {
    type: "bar",
    height: "450px",
    width: "100%",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "50%",
      borderRadiusApplication: "end",
      borderRadius: 6,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: {
      fontFamily: "Inter, sans-serif",
    },
  },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  grid: {
    show: true,
    strokeDashArray: 10,
    padding: {
      left: 2,
      right: 2,
      top: -14,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"],
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    floating: false,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
    },
    position: "bottom",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    show: false,
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%";
      },
    },
  },
  fill: {
    opacity: 1,
  },
});

if (
  document.getElementById("column-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(
    document.getElementById("column-chart"),
    humidChartOptions
  );
  chart.render();
}

// Ekspor
export {
  humidChartOptions,
  getMaxHumid,
  getMinHumid,
  getSevenLastHumidData,
  formattedSevenLastHumidData,
  maxHumid,
  minHumid,
  formattedMaxHumidFullDate,
  formattedMinHumidFullDate,
};
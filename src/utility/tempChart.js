import { ref } from "vue";
import ApexCharts from "apexcharts";
import { useChartData } from "@/utility/chartUtils.js";

const {
  maxData: maxTemp,
  minData: minTemp,
  sevenDataCelciusDegree: sevenDataCelciusDegree,
  sevenDataFahrenheitDegree: sevenDataFahrenheitDegree,
  getSevenLastData: getSevenLastTempData,
  formattedSevenLastData: formattedSevenLastTempData,
  formattedMaxDate: formattedMaxTempFullDate,
  formattedMinDate: formattedMinTempFullDate,
  getMaxData: getMaxTemp,
  getMinData: getMinTemp,
} = useChartData("temperature");

// Konfigurasi chart khusus Temperature
const TempChartOptions = ref({
  // set the labels option to true to show the labels on the X and Y axis
  xaxis: {
    show: true,
    categories: formattedSevenLastTempData.value.length
      ? [...formattedSevenLastTempData.value].reverse()
      : ["No Data"],
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    tickAmount: 2,
    min: 0,
    max: 100,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500",
      },
      formatter: function (value) {
        return `${value}°C`;
      },
    },
  },
  series: [
    {
      name: "Temperature (°F)",
      data: sevenDataFahrenheitDegree.value.length
        ? [...sevenDataFahrenheitDegree.value].reverse()
        : [0],
      color: "#7E3BF2",
    },
    {
      name: "Temperature (°C)",
      data: sevenDataCelciusDegree.value.length
        ? [...sevenDataCelciusDegree.value].reverse()
        : [0],
      color: "#1A56DB",
    },
  ],
  chart: {
    sparkline: {
      enabled: false,
    },
    height: "100%",
    width: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
    y: {
      formatter: function (value, { seriesIndex }) {
        if (seriesIndex === 0) {
          return `${value}°F`; // Data untuk Fahrenheit
        } else if (seriesIndex === 1) {
          return `${value}°C`; // Data untuk Celsius
        }
        return value; // Jika tidak sesuai
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    width: 6,
  },
  legend: {
    show: true,
  },
  grid: {
    show: true,
    strokeDashArray: 10,
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
});

if (
  document.getElementById("labels-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(
    document.getElementById("labels-chart"),
    TempChartOptions
  );
  chart.render();
}

// Ekspor
export {
  TempChartOptions,
  getMaxTemp,
  getMinTemp,
  getSevenLastTempData,
  sevenDataCelciusDegree,
  sevenDataFahrenheitDegree,
  formattedSevenLastTempData,
  maxTemp,
  minTemp,
  formattedMaxTempFullDate,
  formattedMinTempFullDate,
};

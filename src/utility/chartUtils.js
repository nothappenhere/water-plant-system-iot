import { ref } from "vue";
import axios from "axios";
import moment from "moment-timezone";

export function useChartData(type, property = null) {
  const maxData = ref(null);
  const minData = ref(null);
  const sevenLastData = ref([]);
  const sevenDataCelciusDegree = ref([]);
  const sevenDataFahrenheitDegree = ref([]);
  const formattedSevenLastData = ref([]);
  const formattedMaxDate = ref("");
  const formattedMinDate = ref("");

  // Fungsi untuk mendapatkan data maksimum
  async function getMaxData() {
    try {
      let response = "";

      if (type === "temperature" || type === "humidity") {
        response = await axios.get(`http://localhost:8000/api/dht/${type}/max`);
      } else if (type === "soil") {
        response = await axios.get(`http://localhost:8000/api/${type}/max`);
      }

      if (response.status === 200) {
        maxData.value = response.data.data[0];
        formatTimestamp(maxData.value.timestamp, "max");
      } else {
        maxData.value = null;
      }
    } catch (error) {
      console.error(`Error fetching max ${type} data:`, error);
    }
  }

  // Fungsi untuk mendapatkan data minimum
  async function getMinData() {
    try {
      let response = "";

      if (type === "temperature" || type === "humidity") {
        response = await axios.get(`http://localhost:8000/api/dht/${type}/min`);
      } else if (type === "soil") {
        response = await axios.get(`http://localhost:8000/api/${type}/min`);
      }

      if (response.status === 200) {
        minData.value = response.data.data[0];
        formatTimestamp(minData.value.timestamp, "min");
      } else {
        minData.value = null;
      }
    } catch (error) {
      console.error(`Error fetching min ${type} data:`, error);
    }
  }

  // Fungsi untuk mendapatkan data 7 terakhir
  async function getSevenLastData() {
    try {
      let response = "";

      response = await axios.get(`http://localhost:8000/api`);

      if (response.status === 200) {
        sevenLastData.value = response.data.data;

        if (type === "temperature") {
          sevenDataCelciusDegree.value = [];
          sevenDataFahrenheitDegree.value = [];
          formattedSevenLastData.value = [];

          sevenLastData.value.forEach((data) => {
            sevenDataCelciusDegree.value.push(data.temperature_C);
            sevenDataFahrenheitDegree.value.push(data.temperature_F);
            formatTimestamp(data.timestamp, "all");
          });
        } else if (type === "humidity" || type === "soil") {
          // Format data untuk chart
          formattedSevenLastData.value = sevenLastData.value.map((data) => ({
            x: moment(data.timestamp)
              .tz("Asia/Jakarta")
              .format("DD MMM YYYY, HH:mm:ss"),
            y: parseFloat(data[property]), // Gunakan properti sesuai jenis data
          }));
        }
      } else {
        sevenLastData.value = [];
        formattedSevenLastData.value = [];
      }
    } catch (error) {
      console.error(`Error fetching last 7 ${type} data:`, error);
    }
  }

  // Fungsi untuk format timestamp
  function formatTimestamp(timestamp, type) {
    const momentTimestamp = moment(timestamp).tz("Asia/Jakarta", true);

    const day = String(momentTimestamp.date()).padStart(2, "0");
    const fullMonth = momentTimestamp.format("MMMM");
    const shortMonth = momentTimestamp.format("MMM");
    const year = momentTimestamp.year();
    const fullTime = momentTimestamp.format("HH:mm:ss");

    if (type === "max") {
      formattedMaxDate.value = `${day} ${fullMonth} ${year}`;
    } else if (type === "min") {
      formattedMinDate.value = `${day} ${fullMonth} ${year}`;
    } else if (type === "all") {
      const formattedDate = `${day} ${shortMonth} ${year}, ${fullTime}`;
      formattedSevenLastData.value.push(formattedDate);
    }
  }

  return {
    maxData,
    minData,
    sevenDataCelciusDegree,
    sevenDataFahrenheitDegree,
    getSevenLastData,
    formattedSevenLastData,
    formattedMaxDate,
    formattedMinDate,
    getMaxData,
    getMinData,
  };
}

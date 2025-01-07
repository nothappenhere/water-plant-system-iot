import { ref } from "vue";
import axios from "axios";

// Data yang akan digunakan di seluruh komponen
const currentSensorValue = ref([]);

// Fungsi untuk mengambil data dari API
async function getCurrentSensorValue() {
  try {
    const response = await axios.get("http://localhost:8000/api/mqtt");
    currentSensorValue.value = response.data.data;
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

// Memanggil fungsi setiap 5 detik untuk update data
setInterval(() => {
  getCurrentSensorValue();
}, 5000);

// Mengekspor agar dapat digunakan di file lain
export { currentSensorValue };

import { ref } from "vue";
import axios from "axios";

// Data yang akan digunakan di seluruh komponen
const tempHumid = ref({
  suhuCelcius: null,
  suhuFahrenheit: null,
  kelembapan: null,
});

// Fungsi untuk mengambil data dari API
async function getCurrentTempHum() {
  try {
    const response = await axios.get("http://localhost:8000/api/sensors/mqtt");
    tempHumid.value = response.data; // Update nilai yang direferensikan
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

// Memanggil fungsi setiap 5 detik untuk update data
setInterval(() => {
  getCurrentTempHum();
}, 5000);

// Mengekspor agar dapat digunakan di file lain
export { tempHumid, getCurrentTempHum };

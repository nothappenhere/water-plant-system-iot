import mqtt from "mqtt";

let sensorData = "";

const options = {
  host: "be86a13dc13a4280905670d294a2e821.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "Testing001",
  password: "Testing001",
};

// Koneksi ke broker MQTT
const client = mqtt.connect(options);

const mqttTopicTemperature = "esp32/dht11";

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(mqttTopicTemperature, (err) => {
    if (!err) {
      console.log(`Subscribe to topic ${mqttTopicTemperature}`);
    } else {
      console.error(`Failure to subscribe, ${err}`);
    }
  });
});

client.on("message", (topic, message) => {
  if (topic === mqttTopicTemperature) {
    const rawData = message.toString(); // Data mentah dari broker MQTT

    // Parsing data untuk memisahkan suhu dan kelembapan
    const suhuCelciusMatch = rawData.match(/Temperature: ([\d.]+)°C/); // Ekstrak angka suhu
    const suhuFahrenheitMatch = rawData.match(/([\d.]+)°F/); // Ekstrak angka suhu
    const kelembapanMatch = rawData.match(/Humidity: ([\d.]+)%/); // Ekstrak angka kelembapan

    // Simpan data yang diparsing ke dalam variabel global
    sensorData = {
      suhuCelcius: suhuCelciusMatch ? parseFloat(suhuCelciusMatch[1]) : null, // Nilai suhu
      suhuFahrenheit: suhuFahrenheitMatch
        ? parseFloat(suhuFahrenheitMatch[1])
        : null, // Nilai suhu
      kelembapan: kelembapanMatch ? parseFloat(kelembapanMatch[1]) : null, // Nilai kelembapan
    };
  }
});

//* @desc   mqtt data sensors
//* @route  GET /api/mqtt
export const getMqtt = (req, res) => {
  res.status(200).json(sensorData);
};

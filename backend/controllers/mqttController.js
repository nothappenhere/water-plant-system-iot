import mqtt from "mqtt";
import dotenv from "dotenv";
dotenv.config();

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: process.env.MQTT_PROTOCOL,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

let sensorData = "";

// Koneksi ke broker MQTT
const client = mqtt.connect(options);
const mqttTopic = ["esp32/dht11", "esp32/soil", "esp32/waterLevel"];

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe(mqttTopic, (err, granted) => {
    if (err) {
      console.error(`Failed to subscribe: ${err.message}`);
    } else {
      granted.forEach((topic) => {
        console.log(`Subscribed to topic: ${topic.topic}`);
      });
    }
  });
});

client.on("message", (topic, message) => {
  const rawData = message.toString(); // Data mentah dari broker MQTT

  if (topic === "esp32/dht11") {
    // Parsing data untuk topik DHT11
    const celciusMatch = rawData.match(/Temperature: ([\d.]+)°C/);
    const fahrenheitMatch = rawData.match(/Fahrenheit: ([\d.]+)°F/);
    const humidityMatch = rawData.match(/Humidity: ([\d.]+)%/);

    sensorData = {
      celciusDegree: celciusMatch ? parseFloat(celciusMatch[1]) : null,
      fahrenheitDegree: fahrenheitMatch ? parseFloat(fahrenheitMatch[1]) : null,
      humidityPercent: humidityMatch ? parseFloat(humidityMatch[1]) : null,
      soilMoistPercent: sensorData?.soilMoistPercent || null,
      waterLevel: sensorData?.waterLevel || null,
    };
  } else if (topic === "esp32/soil") {
    // Parsing data untuk topik Soil Moisture
    const soilMoistMatch = rawData.match(/Soil moisture: ([\d.]+)%/);

    sensorData = {
      celciusDegree: sensorData?.celciusDegree || null,
      fahrenheitDegree: sensorData?.fahrenheitDegree || null,
      humidityPercent: sensorData?.humidityPercent || null,
      soilMoistPercent: soilMoistMatch ? parseFloat(soilMoistMatch[1]) : null,
      waterLevel: sensorData?.waterLevel || null,
    };
  } else if (topic === "esp32/waterLevel") {
    // Parsing data untuk topik Water Level
    const waterLevelMatch = rawData.match(/Water Level: ([A-Za-z\s]+)/);

    sensorData = {
      celciusDegree: sensorData?.celciusDegree || null,
      fahrenheitDegree: sensorData?.fahrenheitDegree || null,
      humidityPercent: sensorData?.humidityPercent || null,
      soilMoistPercent: sensorData?.soilMoistPercent || null,
      waterLevel: waterLevelMatch ? waterLevelMatch[1].trim() : null,
    };
  }
});

client.on("error", (err) => {
  console.error(`MQTT error: ${err.message}`);
});

//* @desc   GET current mqtt sensor value
//* @route  GET /api/mqtt
export const getMqttValue = (req, res) => {
  res
    .status(200)
    .json({ message: "Get current mqtt sensor value", data: sensorData });
};

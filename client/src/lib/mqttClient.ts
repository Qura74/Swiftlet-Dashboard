import mqtt, { MqttClient } from "mqtt";

const MQTT_URL = "wss://test.mosquitto.org:8081";

/**
 * Connect to MQTT and subscribe to a given topic
 */
export const connectMqtt = (
  topic: string,
  onData: (data: any) => void
): MqttClient => {
  const client = mqtt.connect(MQTT_URL);

  client.on("connect", () => {
    console.log(`✅ Connected to MQTT Broker`);
    console.log(`📡 Subscribing to topic: ${topic}`);
    client.subscribe(topic);
  });

  client.on("message", (incomingTopic, message) => {
    console.log("📩 Received message:", incomingTopic, message.toString());

    if (incomingTopic === topic) {
      try {
        const payload = JSON.parse(message.toString());
        console.log("✅ Parsed payload:", payload);
        onData(payload);
      } catch (err) {
        console.error("❌ Error parsing MQTT message:", err);
      }
    }
  });

  return client;
};

import mqtt, { MqttClient } from "mqtt";

const MQTT_URL = "wss://test.mosquitto.org:8081";
const TOPIC = "swiftlet/env";

export const connectMqtt = (onData: (data: any) => void): MqttClient => {
    const client = mqtt.connect(MQTT_URL);

    client.on("connect", () => {
        console.log("✅ Connected to MQTT Broker");
        client.subscribe(TOPIC);
    });

    client.on("message", (topic, message) => {
        console.log("📩 Received message:", topic, message.toString()); 

        if (topic === TOPIC) {
            try {
                const payload = JSON.parse(message.toString());
                console.log("✅ Parsed payload:", payload); 
                onData(payload);
            } catch (err) {
                console.error("Error parsing MQTT message:", err);
            }
        }
    });


    return client;
};
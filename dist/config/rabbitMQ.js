import amqplib from "amqplib";
import { startSongDeletedConsumer } from "../consumers/songDeleted.consumer.js";
let channel = null;
export async function initRabbitMQ() {
    const conn = await amqplib.connect(`${process.env.RABBITMQ_URL}`);
    channel = await conn.createChannel();
    if (channel) {
        console.log("RabbitMQ channel created successfully");
        await channel.assertExchange("song.events", "direct", {
            durable: true,
        });
        await startSongDeletedConsumer();
    }
}
export const getChannel = () => channel;
//# sourceMappingURL=rabbitMQ.js.map
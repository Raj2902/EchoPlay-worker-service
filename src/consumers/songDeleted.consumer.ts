import { getChannel } from "../config/rabbitMQ.js";
import { cleanupSong } from "../jobs/cleanupSong.job.js";

export const startSongDeletedConsumer = async () => {
  const channel = getChannel();
  if (!channel) throw new Error("RabbitMQ channel not initialized");

  const queue = "song.cleanup.queue";

  await channel.assertQueue(queue, { durable: true });

  await channel.bindQueue(queue, "song.events", "song.deleted");

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    try {
      await cleanupSong(data);

      channel.ack(msg);
    } catch (err) {
      console.error(err);

      channel.nack(msg, false, true);
    }
  });
};

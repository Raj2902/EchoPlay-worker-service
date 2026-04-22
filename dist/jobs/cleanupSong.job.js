import { cloudinaryService } from "../services/cloudinary.service.js";
export const cleanupSong = async (data) => {
    const { audio_public_id, thumbnail_public_id } = data;
    const audio_res = await cloudinaryService.del(audio_public_id, "video");
    let thumbnail_res = null;
    if (thumbnail_public_id)
        thumbnail_res = await cloudinaryService.del(thumbnail_public_id, "image");
    console.log("audio res:", audio_res);
    console.log("thumbnail res:", thumbnail_res);
};
//# sourceMappingURL=cleanupSong.job.js.map
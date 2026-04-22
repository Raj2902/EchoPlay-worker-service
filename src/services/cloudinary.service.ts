import cloudinary from "cloudinary";

const del = async (public_id: string, type: "video" | "image") => {
  const { result } = await cloudinary.v2.uploader.destroy(public_id, {
    resource_type: type,
  });
  if (result)
    return {
      statusCode: 200,
      msg: `${type.toUpperCase()} id ${public_id} deleted from the cloudinary successfully.`,
    };
  return {
    statusCode: 404,
    msg: `${type.toUpperCase()} id ${public_id} not found the cloudinary.`,
  };
};

export const cloudinaryService = { del };

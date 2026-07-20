import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  bytes: ArrayBuffer,
  folder: string,
  resourceType: 'image' | 'video' | 'raw' = 'image',
): Promise<string> {
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `microraptor/${folder}`, resource_type: resourceType },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}

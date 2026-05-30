import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import Gallery from "../models/Gallery";

const MONGODB_URI = process.env.MONGODB_URI;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const GALLERY_DIR = path.join(__dirname, "..", "public", "gallery");

async function uploadFile(folder: string, file: string): Promise<string | null> {
  const filePath = path.join(GALLERY_DIR, folder, file);
  const fileName = path.parse(file).name;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: fileName,
      folder: `dinar-wedding/gallery/${folder}`,
      overwrite: true,
      resource_type: "image",
    });
    return result.secure_url;
  } catch (err) {
    console.error(`  ✕ Failed ${folder}/${file}:`, err);
    return null;
  }
}

async function migrate() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Collect all files to upload
  const files: { folder: string; file: string; dbRecord: Record<string, unknown> | null }[] = [];
  const dbRecords = await Gallery.find({}).lean();

  const folders = fs.readdirSync(GALLERY_DIR);
  for (const folder of folders) {
    const folderPath = path.join(GALLERY_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const items = fs.readdirSync(folderPath).sort();
    for (const file of items) {
      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

      const localPath = `/gallery/${folder}/${file}`.replace(/\\/g, "/");
      const dbRecord = dbRecords.find((r) => r.src === localPath) || null;
      files.push({ folder, file, dbRecord });
    }
  }

  console.log(`Found ${files.length} files to upload\n`);

  // Upload in parallel batches of 3
  const BATCH = 3;
  for (let i = 0; i < files.length; i += BATCH) {
    const batch = files.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map((f) => uploadFile(f.folder, f.file))
    );

    for (let j = 0; j < batch.length; j++) {
      const url = results[j];
      const item = batch[j];
      if (url && item.dbRecord) {
        await Gallery.findByIdAndUpdate(item.dbRecord._id, { src: url });
        console.log(`  ✔ ${item.folder}/${item.file} -> updated`);
      } else if (url) {
        console.log(`  ✔ ${item.folder}/${item.file} -> uploaded (no DB record)`);
      }
    }
  }

  console.log("\n✅ All images uploaded to Cloudinary!");
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});

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

const CATEGORY_MAP: Record<string, string> = {
  MakeUp: "makeup",
  Akad: "akad",
  Dekorasi: "dekorasi",
};

async function migrate() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Bersihin dulu folder lama di Cloudinary kalo ada duplicate
  console.log("Cleaning up old Cloudinary folder...");
  try {
    const { resources } = await cloudinary.search
      .expression("folder:dinar-wedding/gallery/*")
      .max_results(100)
      .execute();
    if (resources.length > 0) {
      const publicIds = resources.map((r: { public_id: string }) => r.public_id);
      console.log(`  Found ${publicIds.length} existing images, deleting...`);
      await cloudinary.api.delete_resources(publicIds);
    }
  } catch {
    console.log("  No existing images to clean");
  }

  const folders = fs.readdirSync(GALLERY_DIR);

  for (const folder of folders) {
    const folderPath = path.join(GALLERY_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const category = CATEGORY_MAP[folder] || folder.toLowerCase();
    const files = fs.readdirSync(folderPath).sort();

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

      const fileName = path.parse(file).name;

      console.log(`Uploading ${folder}/${file}...`);

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: fileName,
          folder: `dinar-wedding/gallery/${folder}`,
          overwrite: true,
          resource_type: "image",
        });

        const existing = await Gallery.findOne({
          $or: [
            { src: { $regex: `/gallery/${folder}/${file}$` } },
            { src: { $regex: `dinar-wedding/gallery/${folder}/${fileName}` } },
          ],
        });

        if (existing) {
          await Gallery.findByIdAndUpdate(existing._id, {
            src: result.secure_url,
          });
          console.log(`  ✔ Updated DB: ${result.secure_url}`);
        } else {
          const newItem = await Gallery.create({
            id: `gallery-${folder.toLowerCase()}-${fileName}`,
            src: result.secure_url,
            alt: `Gambar ${folder} ${fileName}`,
            category,
            isActive: true,
          });
          console.log(`  ✔ Created DB: ${result.secure_url} (${newItem._id})`);
        }
      } catch (err) {
        console.error(`  ✕ Failed: ${folder}/${file}`, err);
      }
    }
  }

  console.log("\n✅ All images migrated to Cloudinary!");
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});

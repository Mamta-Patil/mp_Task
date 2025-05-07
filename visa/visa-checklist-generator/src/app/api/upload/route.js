// // app/api/upload/route.js

// import { writeFile } from 'fs/promises';
// import path from 'path';
// import { randomUUID } from 'crypto';

// export async function POST(req) {
//   const formData = await req.formData();
//   const files = formData.getAll('files');

//   const savedFiles = [];

//   // Loop through each file and save it to the 'uploads' folder
//   for (const file of files) {
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const filename = `${Date.now()}-${randomUUID()}-${file.name}`;
//     const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

//     await writeFile(filePath, buffer);  // Save the file locally
//     savedFiles.push(`/uploads/${filename}`);  // Add the URL path of the uploaded file
//   }

//   return new Response(JSON.stringify({ success: true, files: savedFiles }), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// app/api/upload/route.js
import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';

export async function POST(req) {
  const formData = await req.formData();
  const files = formData.getAll('files');

  const savedFiles = [];

  // Define the upload directory
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  // Check if the uploads folder exists, if not create it
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // Loop through each file and save it to the 'uploads' folder
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${randomUUID()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);  // Save the file locally
    savedFiles.push(`/uploads/${filename}`);  // Add the URL path of the uploaded file
  }

  return new Response(JSON.stringify({ success: true, files: savedFiles }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

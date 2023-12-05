import multer from "multer";
import { join, extname } from "path";
import Employee from "@/models/employeeModel";
import Team from "@/models/teamModal";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(process.cwd(), "public", "doc", "upload"));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = extname(file.originalname);
      cb(
        null,
        `${file.originalname.split(".")[0]}-${uniqueSuffix}${fileExtension}`
      );
    },
  });

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
    try {
      await new Promise((resolve, reject) => {
        upload.single("documents")(req, res, async (err) => {
          if (err) {
            console.error("Error uploading file:", err);
            return reject({
              status: 400,
              message: "File upload failed",
              success: false,
            });
          }

          const filePath = join(process.cwd(), "public", "doc", "upload", req.file.filename);
          console.log("File upload successful. Saved at:", filePath);
          resolve();
        });
      });

      res.status(200).json({ message: "File uploaded successfully", success: true });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message, success: false });
    }
  }
// import multer from "multer";
// import { join, extname } from "path";
// import fs from "fs/promises";

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     try {
//       const employeeName = req.body.employeeName;

//       if (!employeeName) {
//         console.error("Employee name not provided");
//         return cb({
//           status: 400,
//           message: "Employee name not provided",
//         });
//       }

//       const employeeFolder = join(
//         process.cwd(),
//         "public",
//         "doc",
//         "upload",
//         employeeName
//       );

//       console.log("Destination path:", employeeFolder);

//       await fs.mkdir(employeeFolder, { recursive: true });

//       cb(null, employeeFolder);
//     } catch (error) {
//       console.error("Error creating folder:", error);
//       cb(error);
//     }
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtension = extname(file.originalname);
//     cb(
//       null,
//       `${file.originalname.split(".")[0]}-${uniqueSuffix}${fileExtension}`
//     );
//   },
// });

// const upload = multer({ storage });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   try {
//     await new Promise((resolve, reject) => {
//       upload.single("documents")(req, res, async (err) => {
//         if (err) {
//           console.error("Error uploading file:", err);
//           return reject({
//             status: 400,
//             message: "File upload failed",
//             success: false,
//           });
//         }

//         const filePath = join(
//           process.cwd(),
//           "public",
//           "doc",
//           "upload",
//        employeeName,
//           req.file.filename
//         );
//         console.log("File upload successful. Saved at:", filePath);
//         resolve();
//       });
//     });

//     res
//       .status(200)
//       .json({ message: "File uploaded successfully", success: true });
//   } catch (error) {
//     res
//       .status(error.status || 500)
//       .json({ message: error.message, success: false });
//   }
// }

import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const EmployeeDocForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("documents", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("File uploaded successfully");
      } else {
        setError("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
 
  const documentsName = [
    "adhaar card",
    "pan card",
    "10th Marksheet",
    "12th Marksheet",
    "voter id",
  ];

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Box px={2} mt={2}>
            <Box>
              <Typography variant="h3" className="fw-medium">
                Personal Information*
              </Typography>
            </Box>
            <Box mt={2}>
              <Grid container spacing={2}>
                {/* {documentsName.map((doc)=>( */}
                <Grid item xs={12} sm={12}>
                  <Typography variant="h3" className="fw-medium">
                    {/* {doc} */}
                  </Typography>
                  {/* <input
                    id="file-input"
                    type="file"
                    name="documents"
                    onChange={handleFileChange}
                    required
                  /> */}
                  {/* {error ? (
                    <Typography className="text-danger">
                      {error}
                    </Typography>
                  ) : null} */}
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload File
                    </Button>
                  </label>
                  {selectedFile && (
                    <Box mt={2}>
                      <Typography variant="body1" color="textSecondary">
                        Selected File:
                      </Typography>
                      <Typography variant="body2">
                        {selectedFile.name}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                {/* ))} */}

                <Grid item xs={12}>
                  <Button
                    className="btn--dark"
                    type="submit"
                    onClick={handleSubmit}
                    sx={{
                      width: "15rem",
                      "@media only screen and (max-width: 600px)": {
                        width: "100%",
                      },
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDocForm;

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   TextField, // Import TextField from MUI
// } from "@mui/material";

// const EmployeeDocForm = () => {
//     const [file, setFile] = useState(null);
//     const [employeeName, setEmployeeName] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);

//     const handleFileChange = (e) => {
//       setFile(e.target.files[0]);
//     };

//     const handleNameChange = (e) => {
//       setEmployeeName(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();

//       if (!file || !employeeName) {
//         setError("Please select a file and enter the employee name");
//         return;
//       }

//       setLoading(true);

//       const formData = new FormData();
//       formData.append("documents", file);
//       formData.append("employeeName", employeeName); // Include employeeName in the form data

//       try {
//         const response = await fetch("/api/admin/upload", {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           setSuccessMessage("File uploaded successfully");
//         } else {
//           setError("Error uploading file");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setError("An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//   return (
//     <Box>
//       <Grid container>
//         <Grid item xs={12} sm={10}>
//           <Box px={2} mt={2}>
//             <Box>
//               <Typography variant="h3" className="fw-medium">
//                 Personal Information*
//               </Typography>
//             </Box>
//             <Box mt={2}>
//               <Grid container spacing={2}>
//                 {/* New Field for Employee Name */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Employee Name"
//                     value={employeeName}
//                     onChange={handleNameChange}
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 {/* File Input */}
//                 <Grid item xs={12} sm={6}>
//                   <input
//                     id="file-input"
//                     type="file"
//                     name="documents"
//                     onChange={handleFileChange}
//                     required
//                   />
//                   {error ? (
//                     <Typography className="text-danger">
//                       {error}
//                     </Typography>
//                   ) : null}
//                 </Grid>

//                 {/* Submit Button */}
//                 <Grid item xs={12}>
//                   <Button
//                     className="btn--dark"
//                     type="submit"
//                     onClick={handleSubmit}
//                     sx={{
//                       width: "15rem",
//                       "@media only screen and (max-width: 600px)": {
//                         width: "100%",
//                       },
//                     }}
//                   >
//                     Save
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default EmployeeDocForm;

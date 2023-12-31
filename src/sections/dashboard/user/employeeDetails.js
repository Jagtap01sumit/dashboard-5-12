import { removeEmployee } from "@/redux/actions/admin/employee-action";
import { Edit } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import EmployeeDocForm from "@/components/forms/employ-doc-form";
import { AddCircleOutlineIcon } from "@mui/icons-material/AddCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const EmployeeDetails = ({ employee }) => {
  const [section, setSection] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { message, actionT, error } = useSelector(
    (state) => state.adminEmployeeReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemoveEmployee = () => {
    if (employee) dispatch(removeEmployee(employee?._id));
  };
  const towordEditForm = () => {
    router.push(`/admin/dashboard/editForm/${employee?._id}`);
  };
  //   <Link href={`/editTopic/${t._id}`}>
  //   <HiPencilAlt size={24} />
  // </Link>

  useEffect(() => {
    if (!error && actionT === "remove") {
      toast.success(message);
      router.push("/admin/dashboard/user/");
    } else {
      toast.error(message);
    }
  }, [error, actionT]);
  const toggleSection = () => {
    setSection(!section);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  // console.log(employee?.documents[0])
  console.log(employee);

  return (
    <>
      <Typography variant="h1" className="fw-semibold">
        Employee Details
      </Typography>
      <Box mt={4}>
        <Box p={2} className="empDetail">
          <Grid container>
            <Grid item xs={12} sm={1.3}>
              <Box className="detailAvatar">
                {employee?.displayProfile && (
                  <img src={employee?.displayProfile} className="img-fluid" />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={9.7} className="d-flex align-items-center">
              <Box>
                <Typography variant="h3" className="fw-semibold" gutterBottom>
                  {employee?.firstName} {employee?.lastName}
                </Typography>
                <Typography sx={{ color: "#848A94" }}>
                  {employee.designation}
                </Typography>
                <Typography sx={{ color: "#848A94" }}>Rankfast</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={1}
              className="d-flex justify-content-end align-items-baseline"
            >
              <Button className="detailAvatarEditBtn" onClick={towordEditForm}>
                <Edit /> Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box p={2} mt={2} className="empDetail">
          <Box className="d-flex justify-content-between align-items-center">
            <Typography variant="h4" className="fw-semibold">
              Personal Information
            </Typography>
            <Button className="detailAvatarEditBtn">
              <Edit /> Edit
            </Button>
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Box>
                  <Typography className="empDetailLabel">
                    Email Address
                  </Typography>
                  <Typography variant="h5">{employee.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box>
                  <Typography className="empDetailLabel">
                    Phone number
                  </Typography>
                  <Typography variant="h5">{employee.phone}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Typography className="empDetailLabel">About</Typography>
                  <Typography variant="h5">{employee.about}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box>
                  <Typography className="empDetailLabel">
                    Email Address
                  </Typography>
                  <Typography variant="h5">{employee.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box>
                  <Typography className="empDetailLabel">
                    Email Address
                  </Typography>
                  <Typography variant="h5">{employee.email}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box p={2} mt={2} className="empDetail">
          <Box className="d-flex justify-content-between align-items-center">
            <Typography variant="h4" className="fw-semibold">
              Teams Information
            </Typography>
            <Button className="detailAvatarEditBtn">
              <Edit /> Edit
            </Button>
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              {employee?.teams?.map((team) => (
                <>
                  <Grid item xs={12} sm={5}>
                    <Box>
                      <Typography className="empDetailLabel">
                        Team Name
                      </Typography>
                      <Typography variant="h5">{team.teamName}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Box>
                      <Typography className="empDetailLabel">
                        Team Description
                      </Typography>
                      <Typography variant="h5">{team.teamDesc}</Typography>
                    </Box>
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box p={2} mt={2} className="empDetail">
          <Box className="d-flex justify-content-between align-items-center">
            <Typography variant="h4" className="fw-semibold">
              Documents
            </Typography>
            {!section ? (
              <Button className="detailAvatarEditBtn" onClick={toggleSection}>
                <Edit /> Upload
              </Button>
            ) : (
              <Button className="detailAvatarEditBtn" onClick={toggleSection}>
                <Edit /> Close
              </Button>
            )}
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              {employee &&
                employee.documents &&
                Object.keys(employee?.documents).map((key) => (
                  <DocumentItem
                    key={key}
                    label={key}
                    url={employee?.documents[key]}
                  />
                ))}
            </Grid>
          </Box>
        </Box>
        {section && (
          <Box mt={2} className="border">
            <Grid container spacing={2}>
              {/* here  */}
              <EmployeeDocForm />
            </Grid>
          </Box>
        )}
        <Box mt={5}>
          <Button className="btn btn-danger" onClick={handleRemoveEmployee}>
            Remove Employee
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EmployeeDetails;

const DocumentItem = ({ label, url }) => {
  return (
    <>
      <Grid item xs={12} sm={5}>
        <Box>
          <Typography className="empDetailLabel">Doc Name</Typography>
          <Typography variant="h5">{label}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Box>
          <Typography className="empDetailLabel">View</Typography>
          <a href={url} target="_blank">
            View Document
          </a>
        </Box>
      </Grid>
    </>
  );
};

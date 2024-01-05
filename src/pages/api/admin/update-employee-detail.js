import Employee from "@/models/employeeModel";
import Team from "@/models/teamModal";

export default async function handler(req, res) {
  try {
    const teamNames = req.body.teams;

    const existingEmployee = await Employee.findById(req.body.id);

    if (!existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employe does not exist", success: false });
    }

    const teams = await Team.find({ _id: { $in: teamNames } });
    console.log(teams);
    // Create employee
    const employeeData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      isManager: req.body.isManager,
      teams: teams.map((team) => team._id),
    };

    const updatedEmployeee = await Employee.findByIdAndUpdate(
      existingEmployee._id,
      employeeData,
      { new: true }
    );
    console.log(updatedEmployeee);

    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      data: updatedEmployeee,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error.message, success: false });
  }
}

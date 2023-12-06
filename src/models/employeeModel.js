import mongoose from "mongoose";
import Team from "@/models/teamModal";

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Provide phone number."],
  },
  designation: {
    type: String,
    required: [true, "Provide designation."],
  },
  displayProfile: {
    type: String,
    required: [true, "Please provide display profile."],
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  teams: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Team,
      },
    ],
    required: [true, "Please provide a team name"],
    default: [],
  },
  documents: {
    type: Map,
    of: String,
  },
});

// const Employee =
//   mongoose.models.employees || mongoose.model("employees", employeeSchema);

const Employee =
  mongoose.models.employees2 || mongoose.model("employees2", employeeSchema);

export default Employee;

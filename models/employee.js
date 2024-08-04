const { Schema , model } = require("mongoose");

const employeeSchema = new Schema(
  {
    AddharcardNumber: {
      type: String,
      required: true,
    },
    PANcard: {
      type: String,
      required: true,
    },
    ContactNumber: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Experience: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Employee = model("employee", employeeSchema);

module.exports = Employee;
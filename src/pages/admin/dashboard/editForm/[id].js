"use client";

import { useEffect, useState } from "react";
import ProfileEditForm from "@/components/forms/profileEditForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function EditTopicForm({ params }) {
  const router = useRouter();
  const { id } = router.query;
  const formData = useForm();

  const saveEmployee = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/update-employee-detail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData.getValues("profileEdit") }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to updated");
      }

      console.log("UPDATED EMPLOYEE: ", (await res.json()).data);
    } catch (error) {}
  };

  const getUserDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/get-employee-details`,
        {
          method: "POST",
          headers: { "Content-Type": "application/text" },
          body: JSON.stringify({ id: id }),
        }
      );

      if (!res.ok) {
        throw new Error("User does not exist");
      }
      const resJson = await res.json();
      const { employee } = resJson;
      if (employee) {
        formData.setValue("profileEdit.firstName", employee.firstName);
        formData.setValue("profileEdit.lastName", employee.lastName);
        formData.setValue("profileEdit.email", employee.email);
        formData.setValue("profileEdit.phone", employee.phone);
        formData.setValue("profileEdit.designation", employee.designation);
        formData.setValue("profileEdit.isManager", employee.isManager);
        formData.setValue(
          "profileEdit.teams",
          employee.teams.map((team) => team._id)
        );

        formData.setValue("profileEdit.id", id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails(id);
  }, [id]);

  return (
    <ProfileEditForm saveEmployee={saveEmployee} formData={formData} id={id} />
  );
}

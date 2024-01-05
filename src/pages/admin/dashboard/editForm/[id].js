"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default async function EditTopicForm({params}) {
 

  const router = useRouter();

  const getUserDetails = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/admin/editForm/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const {id}=params;
  console.log("id",id);
  const {name,lastname,email}=await getUserDetails(id);

  return (

    // <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    //   <input
    //     onChange={(e) => setNewTitle(e.target.value)}
    //     value={newTitle}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Topic Title"
    //   />

    //   <input
    //     onChange={(e) => setNewDescription(e.target.value)}
    //     value={newDescription}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Topic Description"
    //   />

    //   <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
    //     Update Topic
    //   </button>
    // </form>

    <profileEditForm id={id} name={name} email={email} lastname={lastname}/>
  );
}
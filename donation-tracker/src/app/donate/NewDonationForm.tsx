"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";

interface NewDonationFormProps {
  projectList: {
    value: string;
    label: string;
  }[];
}

interface NewDonationType {
  amount: number;
  project_id: string;
}

const NewDonationForm: React.FC<NewDonationFormProps> = ({ projectList }) => {
  const [amount, setAmount] = useState(0);
  const [projectId, setProjectId] = useState(projectList[0].value);
  const selectId = useId();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body: NewDonationType = {
      amount,
      project_id: projectId,
    };

    const response = await fetch("/api/donations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(response.statusText);
      return;
    }

    await fetch(`/api/revalidate?path=/projects/${projectId}`);
    router.push("/projects/");
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Donate</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Project Name:
            <Select
              className="mt-1 rounded-md shadow-sm"
              instanceId={selectId}
              options={projectList}
              defaultValue={projectList[0]}
              isSearchable={true}
              onChange={(e: any) => setProjectId(e.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Amount:
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={amount}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value)))
                  setAmount(Number(e.target.value));
              }}
            />
          </label>
        </div>
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDonationForm;

"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import toast from "react-hot-toast";

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
  const [amount, setAmount]: [number, Function] = useState(0);
  const [projectId, setProjectId]: [string, Function] = useState(
    projectList[0].value
  );
  const selectId = useId();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (amount < 1) {
      toast.error("Amount should be at least 1");
      return;
    }

    // create request body
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

    // catch error
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }

    await setAmount(0);

    // Show success message
    toast.success("Donation made successfully!");

    // revalidate project page path
    await fetch(`/api/revalidate?path=/projects/${projectId}`);
    router.push("/projects/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Project</h3>
      <label>
        <span>Project Name: </span>
        <Select
          instanceId={selectId}
          options={projectList}
          defaultValue={projectList[0]}
          isSearchable={true}
          onChange={(e: any) => {
            setProjectId(e.value);
          }}
        />
      </label>
      <label>
        <span>Amount: </span>
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value)))
              setAmount(Number(e.target.value));
          }}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default NewDonationForm;


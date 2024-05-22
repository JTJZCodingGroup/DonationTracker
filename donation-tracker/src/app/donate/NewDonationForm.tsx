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
  const [amount, setAmount]: [number, Function] = useState(0);
  const [projectId, setProjectId]: [string, Function] = useState(
    projectList[0].value
  );
  const selectId = useId();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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

    // revalidate project page path
    await fetch(`/api/revalidate?path=/projects/${projectId}`);
    router.push("/projects/");
    router.refresh();
  };

  return (
    <form className="donationForm" onSubmit={handleSubmit}>
      <label>
        <h3>Project Name: </h3>
        <Select
          className="rounded-md shadow-sm"
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
        <h3>Amount: </h3>
        <input
          className="input-field"
          type="text"
          value={amount}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value)))
              setAmount(Number(e.target.value));
          }}
        />
      </label>
      <button className="submit-button">Submit</button>
    </form>
  );
};

export default NewDonationForm;

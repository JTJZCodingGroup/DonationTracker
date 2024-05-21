"use client"

import { useState, useId } from "react";
import Select from 'react-select';

interface NewDonationFormProps {
    projectList: {
        value: string,
        label: string,
    }[]
}

interface NewDonationType {
  amount: number,
  project_id: string,
}

const NewDonationForm: React.FC<NewDonationFormProps> = ({projectList}) =>  {
  const [amount, setAmount]: [number, Function] = useState(0);
  const [projectId, setProjectId]: [string, Function] = useState(projectList[0].value);
  const selectId = useId();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // create request body
    const body:NewDonationType = {
      amount,
      project_id: projectId
    }

    const response = await fetch('/api/donations/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    // catch error
    if (!response.ok) {
      console.error('Network response was not ok', response.statusText);
      return;
    }

    const donationData = await response.json();
    console.log(donationData);

    await setAmount(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Project</h3>
      <label htmlFor="Project Name">
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
      <label htmlFor="Amount">
        <span>Amount: </span>
        <input 
          type="text" 
          value={amount}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) setAmount(Number(e.target.value))
          }}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}

export default NewDonationForm
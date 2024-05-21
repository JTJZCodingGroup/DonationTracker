"use client"

import { useState } from "react";

interface NewProjectFormProps {
  setIsAddProject: Function;
}

interface NewProjectType {
  name: string,
  goal: number,
  end_date: string,
  progress: number,
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({setIsAddProject}) =>  {
  const [name, setName]: [string, Function] = useState('');
  const [goal, setGoal]: [number, Function] = useState(0);
  const [date, setDate]: [string, Function] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // create request body
    const body:NewProjectType = {
      name,
      goal,
      end_date: date + ':00.000Z',
      progress: 0,
    }

    const response = await fetch('/api/projects', {
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

    const projectData = await response.json();

    console.log(projectData);

    // close modal
    setIsAddProject(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Project</h3>
      <label htmlFor="Project Name">
        <span>Project Name: </span>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="Funding Goal">
        <span>Funding Goal: </span>
        <input 
          type="text" 
          value={goal}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) setGoal(Number(e.target.value))
          }}
        />
      </label>
      <label htmlFor="End Date">
        <span>End Date: </span>
        <input 
          aria-label="Date and time" 
          type="datetime-local" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}

export default NewProjectForm;
"use client";

import { useState, useEffect, useRef } from "react";
import "../globals.css"; // Importing the global styles

interface NewProjectFormProps {
  setIsAddProject: Function;
}

interface NewProjectType {
  name: string;
  goal: number;
  end_date: string;
  progress: number;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ setIsAddProject }) => {
  const [name, setName] = useState<string>("");
  const [goal, setGoal] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // create request body
    const body: NewProjectType = {
      name,
      goal,
      end_date: date + ":00.000Z",
      progress: 0,
    };

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // catch error
    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      return;
    }

    const projectData = await response.json();

    // revalidate project page path
    await fetch(`/api/revalidate?path=/donate`);

    // close modal
    setIsAddProject(false);
  };

  // Close the modal if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsAddProject(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAddProject]);

  return (
    <div className="modal-background">
      <div ref={modalRef} className="modal-container">
        <h3 className="text-2xl font-bold mb-4">Add New Project</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="fundingGoal"
              className="block text-sm font-medium text-gray-700"
            >
              Funding Goal
            </label>
            <input
              id="fundingGoal"
              type="text"
              value={goal}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value)))
                  setGoal(Number(e.target.value));
              }}
              className="input-field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
              required
            />
          </div>
            <div className="flex justify-center items-center">
            <button type="submit" className="submit-button">
              Submit
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectForm;

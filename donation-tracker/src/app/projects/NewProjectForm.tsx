"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "../globals.css"; // Importing the global styles

type Project = {
  id: string;
  created_at: string;
  name: string;
  goal: number;
  progress: number;
  end_date: string;
  donations?: any[]; // Assuming donations are an array of donation objects
};

interface NewProjectFormProps {
  setIsAddProject: Function;
  mutate: Function;
  projects: Project[];
}

interface NewProjectType {
  name: string;
  goal: number;
  end_date: string;
  progress: number;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({
  setIsAddProject,
  mutate,
  projects,
}) => {
  const [name, setName] = useState<string>("");
  const [goal, setGoal] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    // mutate to have swr revalidate projects list
    // to implement optimistic UI rendering

    // const addOptions = (newProject: any, projects: any) => {
    //   return {
    //     optimisticData: [...projects, newProject, newProject],
    //     rollbackOnError: true,
    //     populateCache: true,
    //     revalidate: false,
    //   };
    // };

    await mutate();

    // close modal and refresh
    setIsAddProject(false);
    router.refresh();
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

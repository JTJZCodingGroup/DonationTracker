"use client"

import { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import NewProjectForm from "./NewProjectForm";

type Project = {
  id: string;
  created_at: string;
  name: string;
  goal: number;
  progress: number;
  end_date: string;
  donations: any[]; // Assuming donations are an array of donation objects
};

export default function Projects() {
  const [isAddProject, setIsAddProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };
    fetchProjects();
  }, []);



  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Project Page</h1>
      <button 
        className="mb-8 px-6 py-2 bg-black text-white rounded hover:text-orange-600 focus:outline-none"
        onClick={() => setIsAddProject(true)}>Add Project</button>
        <ReactModal
          isOpen={isAddProject}
          ariaHideApp={false}
        >
          <NewProjectForm setIsAddProject={setIsAddProject}/>
        </ReactModal>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded shadow-md flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-2">Goal: ${project.goal}</p>

            <p className="text-gray-600 mb-2">Start Date: {new Date(project.created_at).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">End Date: {new Date(project.end_date).toLocaleDateString()}</p>
            <div className="w-full flex justify-center items-center mb-2">
              <div className="bg-gray-200 w-full h-4 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${(project.progress / project.goal) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-gray-600">
             {(project.progress / project.goal * 100).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

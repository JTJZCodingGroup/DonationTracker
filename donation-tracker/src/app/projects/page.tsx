"use client"

import { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import NewProjectForm from "./NewProjectForm";
import '../globals.css'; // Importing the global styles

type Project = {
  id: string;
  created_at: string;
  name: string;
  goal: number;
  progress: number;
  end_date: string;
  donations: any[]; // Assuming donations are an array of donation objects
};

const titles = [
  "DONATION-LEVEL OVER 9000!!!",
  "Mega Super Awesome Project Support",
  "Skip Lunch, Donate NOW",
  "Master of Philanthropy",
  "PIKA-PIKACHU, PIKA PII!",
  "Support and Achieve Eternal Honors",
  "Donate as often as Taylor Swift takes Flights!",
  "Exquisite Project Patron Extraordinaire",
  "Alms for the poor, Me'Lord?",
  "PHD in Philanthropy",
  "YOU HAVE THE HIGH-GROUND, DONATE.",
  "Philanthropy Warlord",
  "Next Stop: Donation Station",
  "Glorius Supreme Leader of Charity",
  "Archduke of Altruism",
  "Benefaction Baron",
  "High Priest of Helping",
  "Dark Chancellor of Charity.. Do it",
  "Steal from your <Guild> Banks and Donate",
  "ALL YOUR ALMS ARE BELONG TO US",
  "Cancel your WoW subscription"
];

function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Projects() {
  const [isAddProject, setIsAddProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledTitles, setShuffledTitles] = useState<string[]>(shuffleArray([...titles]));
  const [fadeState, setFadeState] = useState<string>('fadeInRight');

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

    // Set the initial title
    setTitle(shuffledTitles[0]);

    // Set an interval to change the title automatically
    const interval = setInterval(() => {
      handleChangeTitle();
    }, 4000);

    return () => clearInterval(interval);
  }, [shuffledTitles]);

  const handleChangeTitle = () => {
    setFadeState('fadeOutLeft');
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % shuffledTitles.length;
      setCurrentIndex(nextIndex);
      setTitle(shuffledTitles[nextIndex]);
      setFadeState('fadeInRight');
    }, 1000); // Duration of fade-out animation
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 
        className={`text-4xl font-bold mb-8 transition transform ${fadeState} cursor-pointer`}
        onClick={handleChangeTitle}
      >
        {title}
      </h1>
      <button 
        className="button"
        onClick={() => setIsAddProject(true)}>Add Project</button>
      <ReactModal
        isOpen={isAddProject}
        onRequestClose={() => setIsAddProject(false)}
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <NewProjectForm setIsAddProject={setIsAddProject} />
      </ReactModal>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>

            <p className="text-gray-600 mb-2">Start Date: {new Date(project.created_at).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">End Date: {new Date(project.end_date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">Goal: ${project.goal}</p>

            <div className="w-full flex justify-center items-center mb-2">
              <div className="progress-bar">
                <div
                  className="progress-bar-inner"
                  style={{ width: `${(project.progress / project.goal) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-gray-600">
              Current Amount: {project.progress} ({(project.progress / project.goal * 100).toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import NewProjectForm from "./NewProjectForm";
import Link from "next/link";
import useSWR from "swr";
import "../globals.css"; // Importing the global styles

const titles = [
  "DONATION-LEVELS OVER 9000!",
  "Mega Super Awesome Project Support",
  "Skip Lunch, Donate NOW",
  "Master of Philanthropy",
  "Support and Achieve Eternal Honors",
  "Exquisite Project Patron Extraordinaire",
  "Alms for us, Me'Lord?",
  "PHD in Philanthropy",
  "Philanthropy Warlord",
  "Welcome to the Donation Station",
  "Glorius Supreme Leader of Charity",
  "Archduke of Altruism",
  "High Priest of Helping",
  "Dark Chancellor of Charity.. Do it",
  "Steal from your <Guild> Banks and Donate",
  "ALL YOUR ALMS ARE BELONG TO US",
  "Cancel your WoW subscription",
  "Aggressively Giving since 2024",
];

function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

// fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const Projects = () => {
  const [isAddProject, setIsAddProject] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledTitles, setShuffledTitles] = useState<string[]>(
    shuffleArray([...titles])
  );
  const [fadeState, setFadeState] = useState<string>("fadeInRight");
  const [sortOption, setSortOption] = useState<string>("");

  // useSWR call to get projects on render
  // call skipped if called mutate has revalidate = false
  const {
    data: projects,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/projects", fetcher);

  //   useEffect(() => {
  //     const fetchProjects = async () => {
  //       try {
  //         const response = await fetch("/api/projects");
  //         const data = await response.json();
  //         setProjects(data);
  //       } catch (error) {
  //         console.error("Failed to fetch projects", error);
  //       }
  //     };
  //     fetchProjects();

  //     // Set the initial title
  //     setTitle(shuffledTitles[0]);

  //     // Set an interval to change the title automatically
  //     const interval = setInterval(() => {
  //       handleChangeTitle();
  //     }, 4000);

  //     return () => clearInterval(interval);
  //   }, [shuffledTitles]);

  const handleChangeTitle = () => {
    setFadeState("fadeOutLeft");
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % shuffledTitles.length;
      setCurrentIndex(nextIndex);
      setTitle(shuffledTitles[nextIndex]);
      setFadeState("fadeInRight");
    }, 1000); // Duration of fade-out animation
  };

  // to sort projects, then mutates swr cache with new order
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    let sortedProjects = [...projects];
    switch (event.target.value) {
      case "percentageHighToLow":
        sortedProjects.sort(
          (a, b) => b.progress / b.goal - a.progress / a.goal
        );
        break;
      case "percentageLowToHigh":
        sortedProjects.sort(
          (a, b) => a.progress / a.goal - b.progress / b.goal
        );
        break;
      case "startDate":
        sortedProjects.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "endDate":
        sortedProjects.sort(
          (a, b) =>
            new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
        );
        break;
      default:
        break;
    }

    // set cache to updated project order, without revalidating
    mutate(sortedProjects, false);
  };

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading projects</div>;
  }

  const projectList = projects.map((project: any) => (
    <Link href={`/projects/${project.id}`} key={project.id}>
      <div
        key={project.id}
        className="project-card transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>

        <p className="text-gray-600 mb-2">
          Start Date: {new Date(project.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-2">
          End Date: {new Date(project.end_date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-2">Goal: ${project.goal}</p>

        <div className="w-full flex justify-center items-center mb-2">
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{
                width: `${(project.progress / project.goal) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <p className="text-gray-600">
          Current Amount: {project.progress} (
          {((project.progress / project.goal) * 100).toFixed(2)}%)
        </p>
      </div>
    </Link>
  ));

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="pageHeader">
        <h1>PROJECTS</h1>
      </div>
      <h1
        className={`title text-4xl font-bold transition transform cursor-pointer`}
      >
        {title}
      </h1>
      <button className="button" onClick={() => setIsAddProject(true)}>
        Add Project
      </button>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="percentageHighToLow">Percentage (High to Low)</option>
        <option value="percentageLowToHigh">Percentage (Low to High)</option>
        <option value="startDate">Start Date</option>
        <option value="endDate">End Date</option>
      </select>
      <ReactModal
        isOpen={isAddProject}
        onRequestClose={() => setIsAddProject(false)}
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <NewProjectForm
          setIsAddProject={setIsAddProject}
          mutate={mutate}
          projects={projects}
        />
      </ReactModal>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
        {projectList}
      </div>
    </main>
  );
};

export default Projects;

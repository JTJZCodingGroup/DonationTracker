"use client"

import { useState } from "react";
import ReactModal from 'react-modal';
import NewProjectForm from "./NewProjectForm";

export default function Projects() {
  const [isAddProject, setIsAddProject]: [boolean, Function] = useState(false);

  return (
    <main>
      <h1>Project Page</h1>
      <button onClick={() => setIsAddProject(true)}>click here</button>
      <ReactModal
        isOpen={isAddProject}
        ariaHideApp={false}
      >
        <NewProjectForm setIsAddProject={setIsAddProject}/>
      </ReactModal>
    </main>
  );
}
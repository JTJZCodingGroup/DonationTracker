import NewDonationForm from "./NewDonationForm";

const getProjects = async () => {
  const res = await fetch("http://localhost:3000/api/projects", {
    next: {
      revalidate: 60,
    },
  });
  const projects: any[] = await res.json();

  return projects.map((project) => ({
    value: project.id,
    label: project.name,
  }));
};

export default async function Donation() {
  const projectList = await getProjects();

  return (
    <main>
      <h1>Create Donation Page</h1>
      <NewDonationForm projectList={projectList} />
    </main>
  );
}

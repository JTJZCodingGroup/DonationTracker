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
      <div className="pageHeader">
        <h1>DONATE</h1>
      </div>
      <NewDonationForm projectList={projectList} />
    </main>
  );
}

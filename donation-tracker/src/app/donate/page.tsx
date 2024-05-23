import NewDonationForm from "./NewDonationForm";
import ShootingStars from '../components/shootingStars';

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
    <main style={{ position: 'relative', overflow: 'hidden' }}> 
      <div className="relative z-10">
        <NewDonationForm projectList={projectList} />
      </div>
      <ShootingStars />

    </main>
  );
}

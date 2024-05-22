import { notFound } from "next/navigation";
import LineChart from "./LineChart";

interface ProjectPageType {
  params: { id: string };
}

interface ProjectType {
  id: string;
  created_at: string;
  name: string;
  goal: number;
  progress: number;
  end_date: string;
}

interface DonationType {
  id: string;
  project_id: string;
  donated_at: string;
  amount: number;
}

// used to get all project IDs so that next can statically render all pages before visit
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/projects");
  const projects: ProjectType[] = await res.json();

  return projects.map((project) => {
    id: project.id;
  });
}

// grabs project info and all donation info for that project
async function getProjectData(id: string) {
  const res = await fetch("http://localhost:3000/api/projects/" + id, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    console.log(res.statusText);
    notFound();
  }

  return res.json();
}

const formatChartData = (donations: DonationType[]) => {
  // format donation data for chart
  const chartData = donations.map((donation) => {
    return {
      x: donation.donated_at.slice(0, 10),
      y: donation.amount,
    };
  });

  // sort from earliest to latest
  chartData.sort((a, b) => {
    return new Date(a.x).getTime() - new Date(b.x).getTime();
  });

  // adding amounts from previous points to current point to make progress line
  let sum = 0;
  chartData.forEach((point) => {
    point.y += sum;
    sum = point.y;
  });

  return chartData;
};

const Project: React.FC<ProjectPageType> = async ({ params }) => {
  const projectData = await getProjectData(params.id);
  const { name, created_at, goal, progress, end_date } = projectData.project;
  const donations: DonationType[] = projectData.donations;
  const DonationList = donations.map((donation, idx) => {
    return (
      <div className="donationCard" key={idx}>
        <p>
          <strong>Amount: </strong>${donation.amount}
        </p>
        <p>
          <strong>Date: </strong>
          {donation.donated_at.slice(0, 10)}
        </p>
      </div>
    );
  });

  // format data for chart
  const chartData = formatChartData(donations);

  return (
    <main>
      <div className="projectHeader">
        <h1>{name}</h1>
        <div className="projectHeader-goal">
          <p>
            <span>Goal: </span>
            {goal}
          </p>
        </div>
      </div>
      <div className="projectChartBox">
        <LineChart
          start={created_at.slice(0, 10)}
          end={end_date.slice(0, 10)}
          goal={goal}
          progress={progress}
          chartData={chartData}
        />
      </div>
      {DonationList}
    </main>
  );
};

export default Project;

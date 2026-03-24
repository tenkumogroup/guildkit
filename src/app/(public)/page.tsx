import { CenterBox } from "@/components/generic/CenterBox.tsx";
import { JobList } from "@/components/JobList.tsx";
import { prisma } from "@/lib/prisma.ts";

export default async function Index() {
  const today = new Date();
  const jobs = await prisma.job.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      employer: {
        select: {
          name: true,
        },
      },
    },
    where: {
      expiresAt: {
        gte: today,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <CenterBox>
      <JobList jobs={jobs} />
    </CenterBox>
  );
}

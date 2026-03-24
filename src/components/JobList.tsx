"use client";

import { useState, type ReactElement } from "react";
import { JobCard, type JobCardInfo } from "@/components/JobCard.tsx";
import { JobSearchFilter } from "@/components/JobSearchFilter.tsx";

type Props = {
  jobs: JobCardInfo[];
  editable?: boolean;
};

export const JobList = ({ jobs, editable = false }: Props): ReactElement => {
  const [ keyword, setKeyword ] = useState("");
  const [ selectedPositions, setSelectedPositions ] = useState<Set<string>>(new Set());
  const [ selectedSkills, setSelectedSkills ] = useState<Set<string>>(new Set());

  const handlePositionToggle = (position: string) => {
    const updated = new Set(selectedPositions);
    if (updated.has(position)) {
      updated.delete(position);
    } else {
      updated.add(position);
    }
    setSelectedPositions(updated);
  };

  const handleSkillToggle = (skill: string) => {
    const updated = new Set(selectedSkills);
    if (updated.has(skill)) {
      updated.delete(skill);
    } else {
      updated.add(skill);
    }
    setSelectedSkills(updated);
  };

  return (
    <div className="flex gap-x-10">
      <JobSearchFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        selectedPositions={selectedPositions}
        onPositionToggle={handlePositionToggle}
        selectedSkills={selectedSkills}
        onSkillToggle={handleSkillToggle}
      />
      <section className="flex flex-col justify-center gap-x-10 gap-y-10">
        { jobs.map((job) => <JobCard job={job} editable={editable} key={job.id} />) }

        { jobs.length <= 0 && <p>There are no open positions at the moment.</p>}
      </section>
    </div>
  );
};

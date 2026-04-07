"use client";

import { useActionState, useEffect, type ReactElement } from "react";
import { Button, Link } from "@/components/generic/ButtonLink.tsx";
import { deleteJob } from "@/lib/actions/jobs.ts";
import type { Organization } from "better-auth/plugins";
import type { Job } from "@/lib/prisma/client.ts";

export type JobCardInfo = Pick<Job, "id" | "title" | "description" | "createdAt" | "updatedAt"> & {
  employer: Pick<Organization, "name">;
};

type JobCardProps = {
  job: JobCardInfo;
  editable?: boolean;
};

export const JobCard = ({ job, editable = false }: JobCardProps): ReactElement => {
  const [ state, formAction, pending ] = useActionState(deleteJob, {});

  useEffect(() => {
    if (state.error) {
      alert(state.error);
    }
  }, [ state.error ]);

  return (
    <div className="flex flex-col gap-3 bg-white shadow-around shadow-gray-200 hover:shadow-gray-300 transition-shadow duration-300 rounded-lg w-full max-w-[32.5rem] p-4">
      <Link theme="none" href={`/jobs/${ job.id }`}>
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 leading-6 h-12">
          {job.title}
        </h3>
        <div className="text-sm text-gray-600 line-clamp-2 h-10">
          {job.description}
        </div>
      </Link>

      <hr className="h-px mt-1 mb-1 bg-gray-300 border-0" />

      <div className="flex justify-between items-center text-sm">
        <div className="font-bold">
          {job.employer.name}
        </div>

        <div className="flex justify-end items-center gap-2">
          <div>
            Last update: {(job.updatedAt ?? job.createdAt).toLocaleDateString()}
          </div>

          {editable && (
            <form className="flex items-end gap-2">
              <Link href={`/employer/jobs/edit/${ job.id }`} theme="button-pale" prefetch>
                Edit
              </Link>
              <input type="hidden" name="id" value={job.id} />
              <Button formAction={formAction} disabled={pending} theme="button-pale">
                Delete
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

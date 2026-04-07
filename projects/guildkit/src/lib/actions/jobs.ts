"use server";

import { redirect, unauthorized } from "next/navigation";
import { flattenError } from "zod";
import { requireAuthAs } from "@/lib/auth/server.ts";
import { prisma } from "@/lib/prisma.ts";
import { jobSchema, type Job } from "@/lib/validations/job.ts";
import type { ActionState } from "@/lib/types.ts";

export const createJob = async (_initialState: ActionState<Job>, formData: FormData): Promise<ActionState<Job>> => {
  const { err, session } = await requireAuthAs("recruiter");

  if (err) {
    unauthorized();
  }

  const { error, success, data: validatedNewJob } = jobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    applicationUrl: formData.get("applicationUrl"),
    location: formData.get("location"),
    salary: formData.get("salary"),
    expiresAt: formData.get("expiresAt"),
  });

  if (!success) {
    return {
      errors: flattenError(error),
    };
  }

  const createdJob = await prisma.job.create({
    data: {
      ...validatedNewJob,
      employerId: session.activeOrganizationId,
    },
    select: { id: true },
  });

  if (!createdJob?.id) {
    throw new Error("Failed to create job. Error code: GK-9JFB6");
  }

  redirect(`/jobs/${ createdJob.id }`);
};

type DeleteJobState = {
  error?: string;
};

export const deleteJob = async (_initialState: DeleteJobState, formData: FormData): Promise<DeleteJobState> => {
  const { err, session } = await requireAuthAs("recruiter");

  if (err) {
    unauthorized();
  }

  const id = formData.get("id");

  if (!id) {
    console.error("`id` of the job to delete was not given.");
    return {
      error: "Something technically wrong. Sorry, this is probably a bug of this website. If you report this issue, tell us the following error code: GK-L587W",
    };
  }

  if (id instanceof File) {
    console.error("`id` must not be a File.");
    return {
      error: "Something technically wrong. Sorry, this is probably a bug of this website. If you report this issue, tell us the following error code: GK-B324R",
    };
  }

  await prisma.job.deleteMany({
    where: {
      id: id,
      employerId: session.activeOrganizationId,
    },
  });

  redirect("/employer/jobs");
};

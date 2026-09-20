import React from "react";
import { prisma } from "@/lib/prisma";
import { PipelineClient } from "@/components/PipelineClient";

export const revalidate = 0;

export default async function PipelinePage() {
  const pipelineRecords = await prisma.placementPipeline.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PipelineClient pipelineRecords={pipelineRecords} />
    </div>
  );
}


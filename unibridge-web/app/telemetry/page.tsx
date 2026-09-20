import React from "react";
import { prisma } from "@/lib/prisma";
import { TelemetryClient } from "@/components/TelemetryClient";

export const revalidate = 0;

export default async function TelemetryPage() {
  const telemetryRecords = await prisma.skillGapTelemetry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TelemetryClient telemetryRecords={telemetryRecords} />
    </div>
  );
}


import React from "react";
import { prisma } from "@/lib/prisma";
import { RepositoryClient } from "@/components/RepositoryClient";

export const revalidate = 0;

interface RepositoryPageProps {
  searchParams?: { search?: string };
}

export default async function RepositoryPage({ searchParams }: RepositoryPageProps) {
  const query = searchParams?.search?.trim() || "";

  const allProblems = await prisma.problemStatement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <RepositoryClient initialProblems={allProblems} initialSearchQuery={query} />
    </div>
  );
}


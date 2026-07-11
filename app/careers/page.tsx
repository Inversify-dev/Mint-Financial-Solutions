import React from 'react';
import type { Metadata } from 'next';
import { getJobs } from '../../lib/cms';
import CareersPageClient from './CareersPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Careers in Financial Operations & Support | Mint',
  description: 'Join our growing team in Colombo. Apply for premium roles in paraplanning, mortgage processing, and accounting support with CA/CIMA assistance.',
  alternates: {
    canonical: '/careers',
  }
};

export default async function CareersPage(props: {
  searchParams: Promise<{ search?: string; dept?: string; type?: string }>;
}) {
  const searchParams = await props.searchParams;
  const activeSearch = searchParams.search || '';
  const activeDept = searchParams.dept || '';
  const activeType = searchParams.type || '';

  // Fetch jobs dynamically on the server from WordPress CPT
  const jobs = await getJobs({
    search: activeSearch,
    department: activeDept,
    type: activeType
  });

  // Dynamically build filter dropdown lists based on ALL active jobs
  const allJobs = await getJobs();
  const departments = Array.from(new Set(allJobs.map(j => j.department)));
  const jobTypes = Array.from(new Set(allJobs.map(j => j.type)));

  return (
    <CareersPageClient
      jobs={jobs}
      departments={departments}
      jobTypes={jobTypes}
      activeSearch={activeSearch}
      activeDept={activeDept}
      activeType={activeType}
    />
  );
}


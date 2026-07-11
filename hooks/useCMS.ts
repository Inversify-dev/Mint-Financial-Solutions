'use client';

import { useMemo } from 'react';
import { mockServices } from '../data/mockData';
import { ServiceDetail } from '../lib/cms';

export function useServices(): ServiceDetail[] {
  return mockServices;
}

export function useService(id: string): ServiceDetail | undefined {
  return useMemo(() => {
    return mockServices.find(s => s.id === id);
  }, [id]);
}

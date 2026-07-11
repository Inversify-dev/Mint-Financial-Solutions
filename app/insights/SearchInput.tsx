'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchInputProps {
  initialValue: string;
}

export default function SearchInput({ initialValue }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);

  // Sync state with URL parameter if it changes elsewhere
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSearchSubmit = (searchVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchVal.trim()) {
      params.set('search', searchVal);
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset page when query changes
    router.push(`/insights?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(value);
    }
  };

  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-4 top-3 text-neutral-400" size={16} />
      <input
        type="text"
        placeholder="Search insights..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-neutral-50 border border-neutral-200 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary text-charcoal"
      />
    </div>
  );
}

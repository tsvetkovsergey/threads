'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { isValidSearch } from '@/lib/validations/search';

interface Props {
  initialValue?: string;
  placeholder?: string;
}

export default function SearchBar({ initialValue = '', placeholder }: Props) {
  const [input, setInput] = useState(initialValue);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const debounceUpdateUrl = setTimeout(() => {
      // Get current params
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      // Get user input in search bar
      const query = input.trim();

      // Update current params
      if (!query) {
        params.delete('q');
      } else {
        params.set('q', query);
      }

      // Construct and push new url string
      const paramsString = params.size > 0 ? `?${params.toString()}` : '';
      const url = `${pathname}${paramsString}`;
      // router.push(url);
    }, 300);

    return () => clearTimeout(debounceUpdateUrl);
  }, [input]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Validate user input
    if (!isValidSearch(e.target.value)) return;

    setInput(e.target.value);
  };

  return (
    <form className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        className="no-focus searchbar_input"
      />
    </form>
  );
}

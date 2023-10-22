'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  pageNumber: number;
  isNotLastPage: boolean;
}

export default function Pagination({ pageNumber, isNotLastPage }: Props) {
  // If there is only one page don't show pagination buttons
  if (pageNumber === 1 && !isNotLastPage) return null;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const prevButtonHandler = () => {
    // Get current params
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (pageNumber > 1) {
      params.set('page', `${pageNumber - 1}`);
    } else {
      params.delete('page');
    }

    // Update url
    const paramsString = params.size > 0 ? `?${params.toString()}` : '';
    router.push(`${pathname}${paramsString}`);
  };

  const nextButtonHandler = () => {
    // Get current params
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', `${pageNumber + 1}`);

    // Update url
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-6 justify-center">
      <Button
        className=" text"
        disabled={pageNumber === 1}
        onClick={prevButtonHandler}
      >
        Prev
      </Button>
      <p className="text-light-1">{pageNumber}</p>
      <Button disabled={!isNotLastPage} onClick={nextButtonHandler}>
        Next
      </Button>
    </div>
  );
}

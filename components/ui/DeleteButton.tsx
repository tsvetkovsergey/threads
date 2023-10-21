'use client';

import { deleteThread } from '@/lib/actions/thread.actions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Props {
  threadId: string;
  authorId: string;
  userId: string;
}

export default function DeleteButton({ threadId, authorId, userId }: Props) {
  if (authorId !== userId) return null;

  const path = usePathname();

  const clickHandler = () => {
    deleteThread(threadId, path);
  };

  return (
    <button onClick={clickHandler}>
      <Image
        src="/assets/delete.svg"
        alt="delete thread"
        width={20}
        height={20}
      />
    </button>
  );
}

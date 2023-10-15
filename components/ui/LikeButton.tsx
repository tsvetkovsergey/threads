'use client';

import { dislikeThread, likeThread } from '@/lib/actions/thread.actions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Props {
  threadId?: string;
  userId?: string;
  isLiked?: boolean;
}

export default function LikeButton({
  threadId,
  userId,
  isLiked = false,
}: Props) {
  const [liked, setLiked] = useState(isLiked);
  const pathname = usePathname();

  const handleClick = () => {
    if (!threadId || !userId) return;

    // Like or dislike a thread
    if (!liked) {
      likeThread(threadId, userId, pathname);
    } else {
      dislikeThread(threadId, userId, pathname);
    }

    // Toggle liked state
    setLiked((current) => !current);
  };

  return (
    <button onClick={handleClick}>
      <Image
        src={liked ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'}
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
    </button>
  );
}

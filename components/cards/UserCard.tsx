'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  personType: 'User' | 'Community';
}

export default function UserCard({
  id,
  name,
  username,
  imageUrl,
  personType,
}: Props) {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative w-12 h-12">
          <Image
            src={imageUrl}
            alt="logo"
            fill
            sizes="10vw"
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button
        className="user-card_btn"
        onClick={() =>
          router.push(
            personType === 'User' ? `/profile/${id}` : `/communities/${id}`
          )
        }
      >
        View
      </Button>
    </article>
  );
}

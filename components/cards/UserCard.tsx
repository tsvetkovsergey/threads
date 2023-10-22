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
  isAdmin?: boolean;
}

export default function UserCard({
  id,
  name,
  username,
  imageUrl,
  personType,
  isAdmin = false,
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

        <div className="text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>

        {isAdmin && (
          <div className="flex-1 pl-4 flex gap-2 items-center">
            <Image src="/assets/admin.svg" alt="Admin" height={32} width={32} />
            <p className="text-gray-1 text-base-semibold">Admin</p>
          </div>
        )}
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

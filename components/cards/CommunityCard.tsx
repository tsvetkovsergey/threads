import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';

interface Props {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

export default function CommunityCard({
  id,
  name,
  username,
  imageUrl,
  bio,
  members,
}: Props) {
  return (
    <article className="community-card flex flex-col">
      {/* LOGO AND NAME */}
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/communities/${id}`} className="relative h-12 w-12">
          <Image
            src={imageUrl}
            alt="community_logo"
            fill
            sizes="10vw"
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className="text-base-semibold text-light-1">{name}</h4>
          </Link>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      {/* BIO */}
      <p className="flex-1 mt-8 text-subtle-medium text-gray-1 line-clamp-4">
        {bio}
      </p>

      {/* BUTTON & MEMBERS */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/communities/${id}`}>
          <Button size="sm" className="community-card_btn">
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && '-ml-2'
                } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

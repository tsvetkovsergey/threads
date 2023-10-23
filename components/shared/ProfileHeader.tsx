import Image from 'next/image';
import Link from 'next/link';

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  communityAdminId?: string;
  type?: 'User' | 'Community';
}

export default function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  communityAdminId,
  type = 'User',
}: Props) {
  // console.log(communityAdminId);
  // console.log(authUserId);

  const isEditable =
    (type === 'User' && accountId === authUserId) ||
    (type === 'Community' && communityAdminId === authUserId);
  const editLink =
    type === 'User' ? '/profile/edit' : `/communities/edit/${accountId}`;

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* PROFILE IMAGE */}
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile Image"
              fill
              sizes="20vw"
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          {/* NAME AND USERNAME */}
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>

        {/* EDIT BUTTON */}
        {isEditable && (
          <Link href={editLink}>
            <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2 items-center">
              <div className="w-4 h-4 relative">
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-light-2 max-sm:hidden">Edit</p>
            </div>
          </Link>
        )}
      </div>

      {/* TODO: Community */}

      {/* BIO */}
      <p className="mt-6 text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

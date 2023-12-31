import { formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import RepliesCount from './additional/RepliesCount';
import LikeButton from '../ui/LikeButton';
import DeleteButton from '../ui/DeleteButton';

interface Props {
  id: string;
  clerkId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  isLiked?: boolean;
  disableRepliesLink?: boolean;
  isRootPage?: boolean;
}

export default function ThreadCard({
  id,
  clerkId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  isLiked = false,
  disableRepliesLink = false,
  isRootPage = false,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? 'px-0 xs:px-7 mb-2' : 'bg-dark-2 p-7'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          {/* AUTHOR IMAGE */}
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                sizes="10vw"
                className="cursor-pointer rounded-full"
              />
            </Link>

            {/* VERTICAL LINE INDICATING THREAD */}
            <div className="thread-card_bar" />
          </div>

          {/* AUTHOR NAME */}
          <div className="flex flex-col w-full">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            {/* CONTENT OF THE THREAD */}
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            {/* SOCIAL BUTTONS */}
            <div className={`mt-5 flex flex-col gap-3 ${isComment && 'mb-10'}`}>
              <div className="flex gap-3.5">
                <LikeButton
                  threadId={id.toString()}
                  userId={clerkId}
                  isLiked={isLiked}
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {/* NUMBER OF REPLIES FOR COMMENT */}
              {isComment && (
                <RepliesCount threadId={id} comments={comments} isComment />
              )}
            </div>
          </div>
        </div>

        {/* TODO: Delete thread */}
        <DeleteButton
          threadId={id.toString()}
          authorId={author.id}
          userId={clerkId}
        />
      </div>

      {/* COMMUNITY DETAILS */}
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {' - '}
            {community.name} Community
          </p>

          <div className="w-4 h-4 relative">
            <Image
              src={community.image}
              alt={community.name}
              fill
              sizes="5vw"
              className="ml-1 rounded-full object-cover"
            />
          </div>
        </Link>
      )}

      {/* NUMBER OF REPLIES FOR THREAD */}
      {!isComment && (
        <RepliesCount
          threadId={id}
          comments={comments}
          disableRepliesLink={!isRootPage}
        />
      )}
    </article>
  );
}

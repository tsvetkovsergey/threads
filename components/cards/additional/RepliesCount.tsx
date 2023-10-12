import Image from 'next/image';
import Link from 'next/link';

interface Props {
  threadId: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  disableRepliesLink?: boolean;
}

export default function RepliesCount({
  threadId,
  comments,
  isComment = false,
  disableRepliesLink = false,
}: Props) {
  const commentsCount = comments.length;
  const uniqueAuthorImgs = Array.from(
    new Set([...comments.map((comment) => comment.author.image)])
  );

  if (commentsCount === 0) return null;

  return (
    <div className={`flex items-center ${isComment ? 'mt-1' : 'mt-4'}`}>
      {uniqueAuthorImgs.slice(0, 2).map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`user_${index}`}
          width={28}
          height={28}
          className={`${index !== 0 && '-ml-2'} rounded-full object-cover`}
        />
      ))}
      <Link
        href={`/thread/${threadId}`}
        className={`${disableRepliesLink && 'pointer-events-none'}`}
      >
        <p className="ml-2 text-subtle-medium text-gray-1">
          {commentsCount} replies
        </p>
      </Link>
    </div>
  );
}

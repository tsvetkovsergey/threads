import { fetchUser, fetchUserThreads } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.actions';

interface Props {
  clerkId: string;
  accountId: string;
  accountType: 'User' | 'Community';
}

export default async function ThreadsTab({
  clerkId,
  accountId,
  accountType,
}: Props) {
  let result: any;
  if (accountType === 'Community') {
    result = await fetchCommunityPosts(accountId);
  }

  if (accountType === 'User') {
    result = await fetchUserThreads(accountId);
  }

  if (!result) redirect('/');

  // Get current user id
  const userInfo = await fetchUser(clerkId);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          clerkId={clerkId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === 'Community'
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          isLiked={thread.likedBy.includes(userInfo._id)}
        />
      ))}
    </section>
  );
}

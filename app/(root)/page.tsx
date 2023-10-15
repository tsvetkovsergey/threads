import ThreadCard from '@/components/cards/ThreadCard';
import { fetchThreads } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const { threads, isNotLastPage } = await fetchThreads(1, 30);
  const user = await currentUser();

  let userId = '';
  if (user) {
    const userInfo = await fetchUser(user.id);
    userId = userInfo._id;
  }

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {threads.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                clerkId={user?.id || ''}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                isLiked={thread.likedBy.includes(userId)}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}

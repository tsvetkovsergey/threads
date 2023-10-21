import ThreadCard from '@/components/cards/ThreadCard';
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

type Thread = {
  _id: string;
  id: string;
  text: string;
  author: { name: string; image: string; id: string };
  community: { id: string; name: string; image: string };
  likedBy: string[];
  createdAt: string;
  parentId: string;
  children: Thread[];
};

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread: Thread = await fetchThreadById(params.id);
  // console.log(thread.children);

  return (
    <section className="relative">
      <div>
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
          isLiked={thread.likedBy.includes(userInfo._id)}
          disableRepliesLink
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      {/* COMMENTS */}
      <div className="mt-10">
        {thread.children
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((comment: any) => (
            <ThreadCard
              key={comment._id}
              id={comment._id}
              clerkId={user?.id || ''}
              parentId={comment.parentId}
              content={comment.text}
              author={comment.author}
              community={comment.community}
              createdAt={comment.createdAt}
              comments={comment.children}
              isComment
            />
          ))}
      </div>
    </section>
  );
}

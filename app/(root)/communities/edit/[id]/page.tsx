import CommunityProfile from '@/components/forms/CommunityProfile';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // Check if the user is logged in
  const user = await currentUser();
  if (!user) return null;

  // Get Community details
  const communityFromDB = await fetchCommunityDetails(params.id);
  const community = communityFromDB.toObject();

  // Check if the current user is the admin of the community
  if (community.createdBy.id !== user.id) {
    redirect(`/communities/${params.id}`);
  }

  const safeCommunity = {
    ...community,
    _id: community._id.toString(),
    createdBy: {
      ...community.createdBy,
      _id: community.createdBy._id.toString(),
      communities: community.createdBy.communities.map((id: any) =>
        id.toString()
      ),
    },
    members: community.members.map((user: any) => ({
      ...user,
      _id: user._id.toString(),
    })),
  };

  return (
    <>
      <h1 className="head-text">Edit Community</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-12">
        <Image
          src={community.image}
          alt="Community photo"
          width={96}
          height={96}
          priority
          className="rounded-full object-contain"
        />

        <CommunityProfile community={safeCommunity} />
      </section>
    </>
  );
}

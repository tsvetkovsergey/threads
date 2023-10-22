import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { communityTabs } from '@/constants';

import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import UserCard from '@/components/cards/UserCard';

export default async function Page({ params }: { params: { id: string } }) {
  // Check if the user is logged in
  const user = await currentUser();
  if (!user) return null;

  // Get Community details
  const community = await fetchCommunityDetails(params.id);

  // console.log(community);

  return (
    <section>
      <ProfileHeader
        accountId={community.id}
        authUserId={user.id}
        name={community.name}
        username={community.username}
        imgUrl={community.image}
        bio={community.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <div className="relative w-6 h-6">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    fill
                    sizes="10vw"
                    className="object-contain"
                  />
                </div>
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {community?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* THREADS */}
          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              clerkId={user.id}
              accountId={community._id}
              accountType="Community"
            />
          </TabsContent>

          {/* MEMBERS */}
          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {community?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imageUrl={member.image}
                  personType="User"
                  isAdmin={community.createdBy.id === member.id}
                />
              ))}
            </section>
          </TabsContent>

          {/* REQUESTS */}
          <TabsContent value="requests" className="w-full text-light-1">
            <ThreadsTab
              clerkId={user.id}
              accountId={community._id}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

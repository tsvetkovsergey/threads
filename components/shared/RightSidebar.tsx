import { fetchRandomCommunities } from '@/lib/actions/community.actions';
import UserCard from '../cards/UserCard';
import { fetchRandomUsers } from '@/lib/actions/user.actions';

export default async function RightSidebar() {
  const randomCommunities = await fetchRandomCommunities(3);
  const randomUsers = await fetchRandomUsers(3);

  return (
    <section className="custom-scrollbar rightsidebar">
      {/* COMMUNITIES */}
      <div className="flex flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        <div className="mt-6 flex w-80 flex-col gap-9">
          {randomCommunities && randomCommunities.length > 0 ? (
            randomCommunities.map((community) => (
              <UserCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imageUrl={community.image}
                personType="Community"
              />
            ))
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )}
        </div>
      </div>

      {/* USERS */}
      <div className="flex flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>

        <div className="mt-6 flex w-80 flex-col gap-9">
          {randomUsers && randomUsers.length > 0 ? (
            randomUsers.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imageUrl={user.image}
                personType="User"
              />
            ))
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

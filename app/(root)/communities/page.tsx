import CommunityCard from '@/components/cards/CommunityCard';
import Pagination from '@/components/shared/Pagination';
import SearchBar from '@/components/shared/SearchBar';
import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { isValidSearch } from '@/lib/validations/search';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const pageSize = 4;

export default async function Page({ searchParams }: Props) {
  // Check if query in params is valid search string
  if (searchParams.q && !isValidSearch(searchParams.q)) {
    redirect('/communities');
  }

  // If there is no page param in url use page number 1
  const pageNumber = Number(searchParams.page) || 1;

  // Check if the user is logged in
  const user = await currentUser();
  if (!user) return null;

  // Check if the user properly onboarded
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  // Fetch communities
  const { communities, isNotLastPage } = await fetchCommunities({
    searchString: searchParams.q || '',
    pageNumber,
    pageSize,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* SEARCH BAR */}
      <SearchBar
        initialValue={searchParams.q}
        placeholder="Search communities"
      />

      {/* LIST OF COMMUNITIES */}
      <div className="mt-14 flex flex-col gap-9">
        {communities.length === 0 ? (
          <p className="no-result">No communities</p>
        ) : (
          <>
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imageUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}

        {/* PAGINATION */}
        <Pagination pageNumber={pageNumber} isNotLastPage={isNotLastPage} />
      </div>
    </section>
  );
}

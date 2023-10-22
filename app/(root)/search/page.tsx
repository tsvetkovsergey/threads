import UserCard from '@/components/cards/UserCard';
import SearchBar from '@/components/shared/SearchBar';
import { fetchAllUsers, fetchUser } from '@/lib/actions/user.actions';
import { isValidSearch } from '@/lib/validations/search';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Pagination from '@/components/shared/Pagination';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const pageSize = 25;

export default async function Page({ searchParams }: Props) {
  // Check if query in params is valid search string
  if (searchParams.q && !isValidSearch(searchParams.q)) redirect('/search');

  // If there is no page param in url use page number 1
  const pageNumber = Number(searchParams.page) || 1;

  // Check if the user is logged in
  const user = await currentUser();
  if (!user) return null;

  // Check if the user properly onboarded
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  // Fetch users
  const { users, isNotLastPage } = await fetchAllUsers({
    userId: user.id,
    searchString: searchParams.q || '',
    pageNumber,
    pageSize,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* SEARCH BAR */}
      <SearchBar initialValue={searchParams.q} placeholder="Search users" />

      {/* LIST OF USERS */}
      <div className="mt-14 flex flex-col gap-9">
        {users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imageUrl={person.image}
                personType="User"
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

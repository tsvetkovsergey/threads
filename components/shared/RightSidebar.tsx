import { fetchRandomCommunities } from '@/lib/actions/community.actions';

export default async function RightSidebar() {
  const randomCommunities = await fetchRandomCommunities();
  // console.log(randomCommunities);

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
      </div>
    </section>
  );
}

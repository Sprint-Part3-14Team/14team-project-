import { EDIT_PAGE_DATA_SIZE } from '@/constants/TEAM_BASE_URL';

import { getMember } from '../../actions';
import SectionTitle from '../section-title';
import MemberList from './member-list';

export default async function Member({ dashboardId }: { dashboardId: number }) {
  const initialData = await getMember(1, dashboardId);
  const { members, totalCount } = initialData;

  const lastPage =
    totalCount < EDIT_PAGE_DATA_SIZE
      ? 1
      : Math.ceil(totalCount / EDIT_PAGE_DATA_SIZE);

  return (
    <section className="relative mt-3 rounded-lg border border-gray-600 bg-secondary-foreground pb-5 xl:w-[620px]">
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <SectionTitle sectionTitle="구성원" listTitle="이름" />
      </div>
      <MemberList
        dashboardId={dashboardId}
        initialData={members}
        lastPage={lastPage}
      />
    </section>
  );
}

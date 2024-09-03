import { EDIT_PAGE_DATA_SIZE } from '@/constants/TEAM_BASE_URL';

import { getInvitation } from '../../actions';
import SectionTitle from '../section-title';
import InvitationButton from './invitation-button';
import InvitationList from './invitation-list';

export default async function Invitation({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const initialData = await getInvitation(1, dashboardId);
  const { invitations, totalCount } = initialData;

  const lastPage =
    totalCount < EDIT_PAGE_DATA_SIZE
      ? 1
      : Math.ceil(totalCount / EDIT_PAGE_DATA_SIZE);

  return (
    <section className="relative mt-3 rounded-lg border border-gray-600 bg-secondary-foreground pb-5 xl:w-[620px]">
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <SectionTitle sectionTitle="초대 내역" listTitle="이메일" />
      </div>
      <InvitationButton />
      <InvitationList
        dashboardId={dashboardId}
        initialData={invitations}
        lastPage={lastPage}
      />
    </section>
  );
}

'use client';

import Pagination from '@/app/components/pagination/pagination';
import { Invitation } from '@/types/invitations';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getInvitation } from '../../actions';
import InvitationCard from './invitation-card';

interface InvitationListProps {
  dashboardId: number;
  initialData: Invitation[];
  lastPage: number;
}

export default function InvitationList({
  dashboardId,
  initialData,
  lastPage,
}: InvitationListProps) {
  const [dataList, setDataList] = useState<Invitation[]>(initialData);
  const searchParams = useSearchParams();

  const paramKey = 'invitationPage';
  const currentPage = Number(searchParams.get(paramKey)) || 1;

  async function getData() {
    const data = await getInvitation(currentPage, dashboardId);
    const { invitations } = data;
    setDataList(invitations);
  }

  const deleteData = (invitationId: number) => {
    const nextData: Invitation[] = dataList.filter(
      (data) => data.id !== invitationId
    );
    setDataList(nextData);
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <>
      <ul>
        {dataList?.map((data: Invitation) => (
          <InvitationCard
            key={data.id}
            dashboardId={dashboardId}
            invitation={data}
            deleteHandler={deleteData}
          />
        ))}
      </ul>

      <div className="absolute right-[145px] top-8">
        <span className="mr-4 text-sm">
          {lastPage || 1} 페이지 중 {currentPage}
        </span>
        <Pagination
          paramKey={paramKey}
          currentPage={currentPage}
          lastPage={lastPage}
        />
      </div>
    </>
  );
}

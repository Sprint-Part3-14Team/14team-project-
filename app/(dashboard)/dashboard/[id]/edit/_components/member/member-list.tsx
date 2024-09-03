'use client';

import Pagination from '@/app/components/pagination/pagination';
import { DashboardMembers } from '@/types/members';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getMember } from '../../actions';
import MemberCard from './member-card';

interface MemberListProps {
  dashboardId: number;
  initialData: DashboardMembers[];
  lastPage: number;
}

export default function MemberList({
  dashboardId,
  initialData,
  lastPage,
}: MemberListProps) {
  const [dataList, setDataList] = useState<DashboardMembers[]>(initialData);

  const searchParams = useSearchParams();

  const paramKey = 'memberPage';
  const currentPage = Number(searchParams.get(paramKey)) || 1;

  async function getData() {
    const data = await getMember(currentPage, dashboardId);
    const { members } = data;
    setDataList(members);
  }

  const deleteData = (memberId: number) => {
    const nextData: DashboardMembers[] = dataList.filter(
      (data) => data.id !== memberId
    );
    setDataList(nextData);
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <>
      <ul>
        {dataList?.map((data: DashboardMembers) => (
          <MemberCard key={data.id} member={data} deleteHandler={deleteData} />
        ))}
      </ul>

      <div className="absolute right-9 top-8">
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

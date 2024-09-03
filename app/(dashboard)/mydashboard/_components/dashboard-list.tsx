'use client';

import Pagination from '@/app/components/pagination/pagination';
import { DashboardDetail } from '@/types/dashboard';
import makeDashboardArr from '@/utils/makeDashboardResponse';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getDashboard } from '../actions';
import DashboardCard from './dashboard-card';

interface DashboardListProps {
  initialData: DashboardDetail[];
  lastPage: number;
}

export default function DashboardList({
  initialData,
  lastPage,
}: DashboardListProps) {
  const [dashboardList, setDashboardList] =
    useState<DashboardDetail[]>(initialData);
  const searchParams = useSearchParams();

  const paramKey = 'boardPage';
  const currentPage = Number(searchParams.get(paramKey)) || 1;

  async function getData() {
    const data = await getDashboard(currentPage);
    const { dashboards } = data;

    const checkDashboard: DashboardDetail[] = dashboards.reduce(
      (acc: DashboardDetail[], cur: DashboardDetail) => {
        if (acc.findIndex(({ id }) => id === cur.id) === -1) {
          acc.push(cur);
        }
        return acc;
      },
      []
    );

    // NOTE: 6개 이하일 경우(=중복 데이터 존재) 함수 호출
    if (checkDashboard.length < 6 && dashboards.length > 6) {
      setDashboardList(
        await makeDashboardArr(
          checkDashboard,
          currentPage,
          6 - checkDashboard.length
        )
      );
      return;
    }

    setDashboardList(checkDashboard);
  }

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <>
      <ul className="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3">
        {dashboardList?.map((dashboard: DashboardDetail) => (
          <DashboardCard dashboard={dashboard} key={dashboard.id} />
        ))}
      </ul>

      <div className="mb-11 mt-3 text-right">
        <span className="mr-4">
          {lastPage} 페이지 중 {currentPage}
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

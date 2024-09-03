'use client';

import { SIDE_DASHBOARD_COUNT, TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardDetail } from '@/types/dashboard';
import makeDashboardArr from '@/utils/makeDashboardResponse';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Pagination from '../pagination/pagination';
import SidebarDashboardCard from './sidebar-dashboard-card';

interface SidebarDashboardListProps {
  initialData: DashboardDetail[];
  lastPage: number;
}

export default function SidebarDashboardList({
  initialData,
  lastPage,
}: SidebarDashboardListProps) {
  const [dashboardList, setDashboardList] =
    useState<DashboardDetail[]>(initialData);
  const searchParams = useSearchParams();

  const paramKey = 'sidePage';
  const currentPage = Number(searchParams.get(paramKey)) || 1;

  const token = getCookie('token');

  async function fetchData() {
    const url = `${TEAM_BASE_URL}/dashboards?navigationMethod=pagination&page=${currentPage}&size=${SIDE_DASHBOARD_COUNT}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
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

    if (
      checkDashboard.length < SIDE_DASHBOARD_COUNT &&
      dashboards.length > SIDE_DASHBOARD_COUNT
    ) {
      setDashboardList(
        await makeDashboardArr(
          checkDashboard,
          currentPage,
          SIDE_DASHBOARD_COUNT - checkDashboard.length
        )
      );
      return;
    }

    setDashboardList(checkDashboard);
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <ul className="flex flex-col gap-[16px] pb-5">
        {dashboardList.map((dashboard: DashboardDetail) => (
          <SidebarDashboardCard dashboard={dashboard} key={dashboard.id} />
        ))}
      </ul>
      <div className="text-center md:flex md:h-10 md:w-20">
        <Pagination
          paramKey={paramKey}
          currentPage={currentPage}
          lastPage={lastPage}
        />
      </div>
    </>
  );
}

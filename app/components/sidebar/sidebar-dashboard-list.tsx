import getDashboards from '@/app/api/dashboard/getDashboards';
import crown from '@/public/icons/crown_icon.svg';
import { Dashboard } from '@/types/dashboard';
import Image from 'next/image';
import Link from 'next/link';

export default async function SidebarDashboardList() {
  const data = await getDashboards();
  const { dashboards } = data;

  return (
    <ul className="flex flex-col gap-[38px] md:gap-[27px]">
      {dashboards.map((dashboard: Dashboard) => (
        <li key={dashboard.id} className="flex items-center">
          <p
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: dashboard.color }}
          />
          <Link
            href={`/dashboard/${dashboard.id}`}
            className="ml-4 mr-1 hidden text-base font-medium text-gray-500 md:block xl:mr-[6px] xl:text-lg"
          >
            {dashboard.title}
          </Link>
          {dashboard.createdByMe && (
            <div className="relative hidden h-3 w-4 md:block">
              <Image src={crown} alt="내가 만든 대시보드 왕관" fill />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

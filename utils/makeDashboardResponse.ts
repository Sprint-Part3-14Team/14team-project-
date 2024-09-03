import { getDashboard } from '@/app/(dashboard)/mydashboard/actions';
import { DashboardDetail } from '@/types/dashboard';

// NOTE: 대시보드 중복 제거 후 원하는 사이즈로 맞추는 함수
export default async function makeDashboardArr(
  arr: DashboardDetail[],
  page: number,
  size: number
): Promise<DashboardDetail[]> {
  async function reFetch() {
    const data = await getDashboard(page + 1);
    const { dashboards } = data;
    return dashboards;
  }

  const fetchArr: DashboardDetail[] = await reFetch();

  const checkDashboard: DashboardDetail[] = fetchArr.reduce(
    (acc: DashboardDetail[], cur: DashboardDetail) => {
      if (acc.findIndex(({ id }) => id === cur.id) === -1) {
        acc.push(cur);
      }
      return acc;
    },
    []
  );

  arr.push(...checkDashboard);

  if (arr.length < 6) {
    makeDashboardArr(arr, page + 1, size - arr.length);
  }

  return arr;
}

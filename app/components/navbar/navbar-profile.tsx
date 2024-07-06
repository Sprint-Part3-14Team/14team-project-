'use client';

import { User } from '@/types/user';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import ProfileImage from '../profile/profile-image';

export default function NavbarProfile({ user }: { user: User }) {
  const router = useRouter();
  const [isProfileOptionOpen, setIsProfileOptionOpen] = useState(false);

  const handleProfileOption = () => {
    setIsProfileOptionOpen(!isProfileOptionOpen);
  };

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/');
    toast.success('로그아웃 되었습니다.');
  };

  return (
    // eslint-disable-next-line
    <div
      className="relative flex cursor-pointer items-center gap-3 text-base font-medium"
      onClick={handleProfileOption}
    >
      <ProfileImage
        nickname={user.nickname}
        profileImageUrl={user.profileImageUrl}
        id={user.id}
        size="34px"
      />
      <p className="hidden text-gray-700 md:block">{user.nickname}</p>
      {isProfileOptionOpen && (
        <div className="absolute right-0 top-10 z-[9999] flex h-[280px] w-[250px] flex-col justify-between rounded-md border bg-white p-5">
          <div className="flex flex-col items-center">
            <ProfileImage
              nickname={user.nickname}
              profileImageUrl={user.profileImageUrl}
              id={user.id}
              size="65px"
              textSize="20px"
            />
            <p className="text-lg font-semibold">{user.nickname}</p>
            <p>{user.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/mypage">
              <button type="button" className="h-11 w-full rounded-sm border">
                마이페이지
              </button>
            </Link>
            <button
              type="button"
              className="h-11 w-full rounded-sm border"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

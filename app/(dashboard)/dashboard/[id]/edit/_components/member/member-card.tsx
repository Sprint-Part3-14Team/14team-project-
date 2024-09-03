'use client';

import Button from '@/app/components/button';
import ProfileImage from '@/app/components/profile/profile-image';
import { DashboardMembers } from '@/types/members';

import { deleteMember } from '../../actions';

interface MemberCardProps {
  member: DashboardMembers;
  deleteHandler: (memberId: number) => void;
}

export default function MemberCard({ member, deleteHandler }: MemberCardProps) {
  const buttonHandler = async () => {
    await deleteMember(member.id);
    deleteHandler(member.id);
  };

  return (
    <li
      key={member.id}
      className="flex items-center justify-between gap-2 border-b border-solid border-gray-600 px-5 py-4 last:border-0 md:px-7 md:py-5"
    >
      <ProfileImage
        profileImageUrl={member.profileImageUrl}
        nickname={member.nickname}
        id={member.userId}
        size="34"
      />
      <p className="grow text-left text-sm md:text-base">{member.nickname}</p>
      <Button
        variant="mobile52x28"
        className="rounded border border-gray-700 text-xs text-primary hover:bg-primary/25 md:text-sm"
        onClick={buttonHandler}
      >
        삭제
      </Button>
    </li>
  );
}

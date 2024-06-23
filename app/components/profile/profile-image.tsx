import { useProfileColor } from '@/hooks/useProfileColor';
import Image from 'next/image';

interface ProfileImageProps {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export default function ProfileImage({
  profileImageUrl,
  nickname,
  id,
}: ProfileImageProps) {
  const profileColor = useProfileColor(id);
  return (
    <div>
      {profileImageUrl ? (
        <div className="relative size-[34px] rounded-full">
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            layout="fill"
            className="rounded-full"
          />
        </div>
      ) : (
        <div
          className="flex size-[34px] items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: profileColor }}
        >
          {nickname.charAt(0)}
        </div>
      )}
    </div>
  );
}

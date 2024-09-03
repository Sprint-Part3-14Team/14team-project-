'use client';

import Button from '@/app/components/button';
import { Invitation } from '@/types/invitations';

import { deleteInvitation } from '../../actions';

interface InvitationCardProps {
  dashboardId: number;
  invitation: Invitation;
  deleteHandler: (invitationId: number) => void;
}

export default function InvitationCard({
  dashboardId,
  invitation,
  deleteHandler,
}: InvitationCardProps) {
  const buttonHandler = async () => {
    await deleteInvitation(dashboardId, invitation.id);
    deleteHandler(invitation.id);
  };

  return (
    <li className="flex items-center justify-between gap-2 border-b border-solid border-gray-600 px-5 py-4 last:border-0 md:px-7 md:py-5">
      <p className="grow text-left text-sm md:text-base">
        {invitation.invitee.email}
      </p>
      <Button
        variant="mobile52x28"
        className="rounded border border-gray-700 text-xs text-primary md:text-sm"
        onClick={buttonHandler}
      >
        취소
      </Button>
    </li>
  );
}

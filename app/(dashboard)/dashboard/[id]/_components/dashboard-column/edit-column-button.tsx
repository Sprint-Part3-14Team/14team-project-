'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import EditColumnModal from './edit-column-modal';

interface EditColumnButtonProps {
  columnId: number;
}

export default function EditColumnButton({ columnId }: EditColumnButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        type="button"
        className="relative size-[22px] md:size-6"
        aria-label="설정"
        onClick={openModal}
      >
        <Image src="/icons/setting_icon.svg" alt="설정" fill />
      </button>
      <EditColumnModal
        isOpen={isModalOpen}
        onClose={closeModal}
        columnId={columnId}
      />
    </div>
  );
}

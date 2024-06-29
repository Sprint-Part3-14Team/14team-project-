/* eslint-disable */
'use client';

import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import calendar from '@/public/icons/icon_calendar.svg';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

/* eslint-disable */

/* eslint-disable */

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddToDoModal({ isOpen, onClose }: AddToDoModalProps) {
  const labelClassName = 'font-medium text-base md:text-lg';

  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-[70vh] w-[327px] flex-col text-left md:w-[506px] md:px-7 md:pb-7"
    >
      <h2 className="md:md-[32px] mb-[24px] px-5 pt-8 text-xl font-bold md:text-2xl">
        할 일 생성
      </h2>
      <form className="flex flex-grow flex-col overflow-hidden px-5 pb-5">
        <div className="flex flex-grow flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-y-2">
            <label className={labelClassName}>담당자</label>
          </div>
          <InputField
            id="title"
            name="title"
            label="제목 *"
            type="text"
            placeholder="제목을 입력해 주세요"
            register={register}
            labelClassName={labelClassName}
          />
          <div className="flex flex-col gap-y-2">
            <label htmlFor="description" className={labelClassName}>
              설명 *
            </label>
            <textarea
              id="description"
              name="description"
              className="h-[84px] resize-none rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
              placeholder="설명을 입력해 주세요"
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="dueDate">마감일</label>
            <div className="relative">
              <input
                id="dueDate"
                name="dueDate"
                placeholder="날짜를 입력해 주세요"
                className="h-[50px] rounded-lg border border-gray-300 py-4 pl-[46px] pr-4 placeholder:text-gray-400"
              />
              <Image
                src={calendar}
                alt="마감일 달력"
                className="absolute left-[23px] top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
          <InputField
            id="tags"
            name="tags"
            label="태그"
            type="text"
            placeholder="입력 후 Enter"
            register={register}
            labelClassName={labelClassName}
          />
        </div>
        <div className="mt-5 flex w-full gap-[11px]">
          <input
            value="취소"
            type="button"
            className="flex h-[42px] min-w-[138px] rounded border border-gray-300 bg-white text-center text-sm font-medium text-gray-500"
            onClick={onClose}
          />
          <input
            value="생성"
            type="submit"
            className="h-[42px] min-w-[138px] rounded bg-violet-primary text-center text-sm font-medium text-white"
          />
        </div>
      </form>
    </Modal>
  );
}
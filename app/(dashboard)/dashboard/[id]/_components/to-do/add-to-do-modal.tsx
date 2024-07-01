'use client';

import ImageInputField from '@/app/components/image-input-field';
import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import { createTodoSchema } from '@/lib/schemas/createToDo';
import calendar from '@/public/icons/icon_calendar.svg';
import { toDoCardValue } from '@/types/toDoCard';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import postToDoCardImage from '../../action';
import AddTagInput from './add-tag-input';
import AssigneeUserDropdown from './assignee-user-dropdown';

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}
export default function AddToDoModal({
  isOpen,
  onClose,
  columnId, // columnId
}: AddToDoModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<toDoCardValue>({
    resolver: yupResolver(createTodoSchema),
    mode: 'onChange',
  });

  const { id } = useParams<{ id: string }>(); // dashboardId
  const [selectedAssignee, setSelectedAssignee] = useState<number | null>(null);

  const onSubmit: SubmitHandler<toDoCardValue> = async (data) => {
    const formData = new FormData();
    formData.append('columnId', columnId.toString());
    formData.append('dashboardId', id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.dueDate) formData.append('dueDate', data.dueDate);

    console.log('hi');
    console.log(data);
    console.log('Form Data:', formData.get('columnId'));

    const { imageUrl } = await postToDoCardImage(formData, columnId);

    // NOTE - ESLint 우회, 지우기
    console.log(selectedAssignee, imageUrl, isValid);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-[70vh] w-[327px] flex-col text-left md:w-[506px] md:px-7 md:pb-7"
    >
      <h2 className="md:md-[32px] mb-[24px] px-5 pt-8 text-xl font-bold md:text-2xl">
        할 일 생성
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col overflow-hidden px-5 pb-5"
      >
        <div className="flex flex-grow flex-col gap-6 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-y-2">
            <p className="text-base font-medium md:text-lg">담당자</p>
            <AssigneeUserDropdown
              dashboardId={id}
              onSelectAssignee={setSelectedAssignee}
              register={register}
            />
          </div>
          <InputField
            id="title"
            label="제목 *"
            type="text"
            placeholder="제목을 입력해 주세요"
            register={register}
            labelClassName="'font-medium text-base md:text-lg'"
            error={errors.title?.message || ''}
          />
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="description"
              className="'font-medium md:text-lg' text-base"
            >
              설명 *
            </label>
            <textarea
              id="description"
              className="h-[84px] resize-none rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
              placeholder="설명을 입력해 주세요"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="dueDate">마감일</label>
            <div className="relative">
              <input
                id="dueDate"
                placeholder="날짜를 입력해 주세요"
                className="h-[50px] rounded-lg border border-gray-300 py-4 pl-[46px] pr-4 placeholder:text-gray-400"
                {...register('dueDate')}
              />
              <Image
                src={calendar}
                alt="마감일 달력"
                className="absolute left-[23px] top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
          <AddTagInput />
          <div className="mb-4 flex flex-col gap-y-2">
            <p className="text-base font-medium md:text-lg">이미지</p>
            <ImageInputField id="imageUrl" setValue={setValue} />
          </div>
        </div>
        <div className="mt-5 flex gap-[11px] md:ml-auto">
          <button
            type="button"
            className="h-[42px] w-full rounded border border-gray-300 bg-white text-center text-sm font-medium text-gray-500 md:w-[120px] md:text-base"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="submit"
            className="h-[42px] w-full rounded bg-violet-primary text-center text-sm font-medium text-white disabled:bg-gray-400 md:w-[120px] md:text-base"
            // disabled={!isValid}
          >
            생성
          </button>
        </div>
      </form>
    </Modal>
  );
}

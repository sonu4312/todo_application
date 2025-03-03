import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./Button";
import { format } from "date-fns";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => void;
  initialData?: TodoFormData;
  mode: "add" | "edit";
}

export interface TodoFormData {
  title: string;
  description: string;
  completionDate: string;
}

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    completionDate: yup.string().required("Completion date is required"),
  })
  .required();

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: "",
      description: "",
      completionDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  // Reset form with initialData when modal opens
  useEffect(() => {
    if (isOpen) {
      reset(
        initialData || {
          title: "",
          description: "",
          completionDate: format(new Date(), "yyyy-MM-dd"),
        }
      );
    }
  }, [isOpen, initialData, reset]);

  const onSubmitHandler = (data: TodoFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleReset = () => {
    reset();
  };

  const minDate = format(new Date(), "yyyy-MM-dd");

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle className="text-lg font-medium leading-6 text-primary">
                  {mode === "add" ? "Add New Todo" : "Edit Todo"}
                </DialogTitle>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      {...register("title")}
                      className="w-full rounded-md border border-gray-300  px-3 py-2 text-gray-900  placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      {...register("completionDate")}
                      min={minDate}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />
                    {errors.completionDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.completionDate.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button type="button" variant="reset" onClick={handleReset}>
                      Reset
                    </Button>
                    <Button type="submit">
                      {mode === "add" ? "Add Todo" : "Update Todo"}
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomModal;

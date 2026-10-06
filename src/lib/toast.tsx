import toast, { ToastOptions, Renderable } from "react-hot-toast";
import React from "react";

export interface CustomToastOptions extends ToastOptions {
  description?: React.ReactNode;
}

const renderMessage = (message: React.ReactNode, description?: React.ReactNode): Renderable => {
  if (!description) {
    return (message as Renderable) ?? null;
  }
  return (
    <div className="flex flex-col gap-0.5 text-left">
      <div className="text-sm leading-tight font-semibold">{message}</div>
      <div className="text-xs leading-normal font-normal opacity-80">{description}</div>
    </div>
  );
};

export const customToast = {
  success: (message: React.ReactNode, options?: CustomToastOptions) => {
    const { description, ...opts } = options || {};
    return toast.success(renderMessage(message, description), opts);
  },
  error: (message: React.ReactNode, options?: CustomToastOptions) => {
    const { description, ...opts } = options || {};
    return toast.error(renderMessage(message, description), opts);
  },
  info: (message: React.ReactNode, options?: CustomToastOptions) => {
    const { description, ...opts } = options || {};
    return toast(renderMessage(message, description), {
      icon: "ℹ️",
      ...opts,
    });
  },
  loading: (message: React.ReactNode, options?: CustomToastOptions) => {
    const { description, ...opts } = options || {};
    return toast.loading(renderMessage(message, description), opts);
  },
  dismiss: (toastId?: string) => toast.dismiss(toastId),
  remove: (toastId?: string) => toast.remove(toastId),
  custom: toast.custom,
  promise: toast.promise,
};

export { customToast as toast };
export default customToast;

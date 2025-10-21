import { Bounce, toast, type ToastOptions } from "react-toastify";

export async function HandleTry<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return null;
  }
}

export const toast_pro: ToastOptions<unknown> = {
  position: "top-right",
  autoClose: 3000,
  theme: "dark",
  transition: Bounce,
};

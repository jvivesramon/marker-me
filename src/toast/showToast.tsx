import { toast } from "react-toastify";

const showToast = (message: string, type: "error" | "success"): void => {
  toast[type](message, {
    position: "top-center",
  });
};

export default showToast;

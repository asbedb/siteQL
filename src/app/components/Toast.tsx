import React from "react";
import { ToastProps } from "../../types/types";
import { toast } from "sonner";

const Toast: React.FC<ToastProps> = ({ message }) => {
    return toast(message);
};

export default Toast;

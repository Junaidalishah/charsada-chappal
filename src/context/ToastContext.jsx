import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div
            className={`px-6 py-4 rounded-xl shadow-2xl text-white min-w-[250px]
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            <p className="text-sm font-medium tracking-wide">{toast.message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

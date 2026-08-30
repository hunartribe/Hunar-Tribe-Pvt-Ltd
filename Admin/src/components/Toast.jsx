import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(() => {});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, tone = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
      tone === "error" ? 6000 : 3500
    );
  }, []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`max-w-sm rounded-lg px-4 py-3 text-sm shadow-lg ${
              toast.tone === "error"
                ? "bg-red-600 text-white"
                : "bg-stone-900 text-white"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

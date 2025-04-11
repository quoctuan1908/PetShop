// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

// eslint-disable-next-line react/prop-types
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: "",
    type: "info", // Can be 'success', 'error', 'warning', 'info'
    visible: false,
  });

  const showAlert = (message, type = "info") => {
    console.log("you alert this");
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
      {alert.visible && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-999 ${
            alert.type === "success"
              ? "bg-green-500 text-white"
              : alert.type === "error"
                ? "bg-red-500 text-white"
                : alert.type === "warning"
                  ? "bg-yellow-500 text-black"
                  : "bg-blue-500 text-white"
          }`}
          style={{ zIndex: 9999 }}
        >
          {alert.message}
          <button className="ml-4 text-sm hover:underline" onClick={hideAlert}>
            Close
          </button>
        </div>
      )}
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export default AlertContext;

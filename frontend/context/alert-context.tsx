"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

type AlertType = "default" | "destructive" | "success";

interface AlertData {
  message: string;
  type: AlertType;
  title?: string;
}

interface AlertContextType {
  showAlert: (message: string, type?: AlertType, title?: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const showAlert = useCallback(
    (message: string, type: AlertType = "default", title?: string) => {
      setAlert({ message, type, title });
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    },
    [],
  );

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-20 right-4 z-50 w-full max-w-sm"
          >
            <Alert variant={alert.type}>
              {alert.type === "destructive" ? (
                <XCircle className="h-4 w-4" />
              ) : alert.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {alert.title ||
                  (alert.type === "destructive"
                    ? "Error"
                    : alert.type === "success"
                      ? "Success"
                      : "Notification")}
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}

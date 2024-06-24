import { ReactNode, createContext, useCallback, useContext } from "react";
import { toast } from "react-toastify";

const ErrorContext = createContext({
  showError: (message: string) => {},
});

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const showError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
    </ErrorContext.Provider>
  );
};

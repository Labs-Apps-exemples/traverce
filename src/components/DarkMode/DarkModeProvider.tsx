import React, { createContext, useState } from 'react';

export interface DarkModeProps {
  dark: boolean;
  setDark(isDark: boolean): void;
}

export const DarkModeContext = createContext<DarkModeProps>({
  dark: false,
  setDark: () => {},
});

interface Props {
  children: React.ReactNode;
}

const DarkModeProvider = ({ children }: Props): JSX.Element => {
  const [dark, setDark] = useState(false);

  return (
    <DarkModeContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;

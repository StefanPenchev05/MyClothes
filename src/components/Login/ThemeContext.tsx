import React, {ReactNode,useContext, useState} from 'react'

const ThemeContext = React.createContext({} as any);

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
    children: ReactNode
}

function ThemeProvider({children}: ThemeProviderProps) {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [emailOrUsernameError, setEmailOrUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const[rememberMe, setRememberMe] = useState(false);

  return (
    <ThemeContext.Provider value={{
      emailOrUsername, setEmailOrUsername, 
      emailOrUsernameError, setEmailOrUsernameError,
      password, setPassword,
      passwordError, setPasswordError,
      rememberMe, setRememberMe }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
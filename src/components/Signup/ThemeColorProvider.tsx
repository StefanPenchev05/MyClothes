import { createContext, useContext,useState, ReactNode, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

interface ThemeContextValue {
    darkMode: boolean;
    toggleDarkMode: () => void;
  }

export const ThemeColorContext = createContext<ThemeContextValue | undefined>(undefined);
export const useThemeColor = () => {
    const context = useContext(ThemeColorContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
      return context;
};

export const ThemeColorProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour >= 20  || currentHour <= 6);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeColorContext.Provider value={{ darkMode, toggleDarkMode }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeColorContext.Provider>
    );
};


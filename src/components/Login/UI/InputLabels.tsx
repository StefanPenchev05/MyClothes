import React, {useState, useCallback, useContext, useEffect} from 'react'
import { TextField, InputAdornment, IconButton, createTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '../ThemeContext';

function InputLabels() {
    
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleClickShowPassword = useCallback(() => {
        setShowPassword((showPassword) => !showPassword);
    }, []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        setShowPassword((showPassword) => !showPassword);
    }, []);
    
    const {setEmailOrUsername, emailOrUsernameError, setPassword, passwordError} = useTheme();

    useEffect(() => {
        const currentHour = new Date().getHours();
        setIsDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });

  return (
    <>
        <TextField className={`h-14 w-full mb-4`}
                label={"Email or Username"}
                type='emailOrUsername'
                autoComplete='emailOrUsername'
                autoFocus
                error={!!emailOrUsernameError}
                helperText={emailOrUsernameError}
                onChange={e => setEmailOrUsername(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.text.primary
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.text.primary
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary
                        }
                    }
                
                }}
                InputProps={{
                    style: {
                        color: theme.palette.text.primary
                    }
                }}
                InputLabelProps={{
                    style: {
                        color: theme.palette.text.primary
                    }
                }}
            />
            <TextField className={`h-14 w-full`}
                label={"Password"}
                type= {showPassword ? 'text' : 'password'}
                autoComplete='password'
                onChange={e => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.text.primary
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.text.primary
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary
                        }
                    }
                
                
                }}
                InputProps={{
                    style: {
                        color: theme.palette.text.primary
                    },
                    endAdornment: (
                        <InputAdornment position='end'>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    style: {
                        color: theme.palette.text.primary
                    }
                }}
            />
    </>
  )
}

export default InputLabels
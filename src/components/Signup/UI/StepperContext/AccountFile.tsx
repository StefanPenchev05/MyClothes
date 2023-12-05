import { useState } from 'react';
import { TextField, Box, InputAdornment, IconButton , useTheme} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { useTheme as useAppTheme } from '../../ThemeContext';

function AccountFile() {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    const { 
        username, setUsername, 
        email, setEmail, 
        password, setPassword, 
        confirmPassword, setConfirmPassword 
    } = useAppTheme();
    const theme = useTheme();


    return (
            <Box>
                <Box marginBottom={2} width={'100%'}>
                    <TextField
                        id='username'
                        name='username'
                        label={t('registration.Username')}
                        variant='outlined'
                        error={!!username.error}
                        helperText={username.msg}
                        fullWidth= {true}
                        value={username.value}
                        onChange={(e) =>  setUsername({ value: e.target.value, error: false, msg: '' })}
                        required
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
                </Box>
                <Box marginBottom={2} width={'100%'}>
                    <TextField
                        id='email'
                        name='email'
                        label={t('registration.Email')}
                        variant='outlined'
                        error={!!email.error}
                        helperText={email.msg}
                        fullWidth= {true}
                        value={email.value}
                        onChange={(e) => setEmail({ value: e.target.value, error: false, msg: '' })}
                        required
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
                </Box>
                <Box marginBottom={2} width={'100%'}>
                    <TextField
                        id='password'
                        name='password'
                        label={t('Password')}
                        type={showPassword ? 'text' : 'password'}
                        error={!!password.error}
                        helperText={password.msg}
                        fullWidth= {true}
                        value={password.value}
                        onChange={(e) => setPassword({ value: e.target.value, error: false, msg: ''})}
                        required
                        InputProps={{
                            style: {
                                color: theme.palette.text.primary
                            },
                            endAdornment: (
                                <InputAdornment position='end'>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={() => setShowPassword(!showPassword)}
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
                </Box>
                <Box marginBottom={2} width={'100%'}>
                    <TextField
                        id='confirmPassword'
                        name='confirmPassword'
                        label={t('registration.ConfirmPassword')}
                        type={showPassword ? 'text' : 'password'}
                        error={!!confirmPassword.error}
                        helperText={confirmPassword.msg}
                        fullWidth= {true}
                        value={confirmPassword.value}
                        onChange={(e) => setConfirmPassword({ value: e.target.value, error: false, msg: ''})}
                        required
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
                </Box>
            </Box>
    );
}

export default AccountFile;
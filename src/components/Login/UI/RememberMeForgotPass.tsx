import { Checkbox, Typography } from '@mui/material';
import { useState, lazy, Suspense, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const ForgotPassModel = lazy(() => import('./ForgotPasswordModal'))
const SnackBar = lazy(() => import('./SnackBar'))

type SnackBarMsgTypes = {
    type: boolean,
    msg: string
}

function RememberMeForgotPass() {
    const [modelPassForgot, setModelPassForgot] = useState(false);
    const [snackBarShow, setSnackBarShow] = useState(false);
    const [snackBarMsg, setSnakBarMsg] = useState<SnackBarMsgTypes>({ type: false, msg: "" });
    const [isDarkMode, setIsDarkMode] = useState(false);

    const { rememberMe, setRememberMe } = useTheme();

    useEffect(() => {
        const currentHour = new Date().getHours();
        setIsDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);

    return (
        <div className={`flex justify-between items-center mt-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <div className='flex items-center space-x-2'>
                <Checkbox className={`rounded-lg ${isDarkMode ? 'text-white' : 'text-black'}`} onClick={() => setRememberMe(!rememberMe)} />
                <div className="flex items-center h-[20px]">
                    <Typography variant='body1'>Remember me</Typography>
                </div>
            </div>
            <div className={`underline ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                <Typography>
                    <Link to={''} onClick={() => setModelPassForgot(!modelPassForgot)}>
                        Forgot Password?
                    </Link>
                </Typography>
                {modelPassForgot && (
                    <Suspense fallback={<></>}>
                        <ForgotPassModel
                            open={modelPassForgot}
                            setSnackBarShow={setSnackBarShow}
                            setSnakBarMsg={setSnakBarMsg}
                            setModelPassForgot={setModelPassForgot}
                        />
                    </Suspense>
                )}
                {snackBarShow && (
                    <SnackBar
                        snackBarShow={snackBarShow}
                        msg={snackBarMsg}
                        setSnackBarShow={setSnackBarShow}
                    />
                )}
            </div>
        </div>
    )
}

export default RememberMeForgotPass
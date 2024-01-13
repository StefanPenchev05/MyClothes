import { useTranslation } from 'react-i18next';
import { Button as MuiButton} from "@mui/material";
import { styled } from '@mui/system';

const Button = styled(MuiButton)({
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.2)',
    },
});

function LoginSignupButtons() {
    const { t } = useTranslation();

  return (
    <div className="w-1/4 space-x-4">
        <Button variant="contained" className="w-32 h-8 font-bold text-lg bg-purple-button" href="/user/login">
            {t('Login')}
        </Button>
        <Button variant="outlined" color="primary" className="w-32 h-8 font-semibold text-base rounded-lg" href="/user/registration">
            {t('Sign up')}
        </Button>
    </div>
  )
}

export default LoginSignupButtons
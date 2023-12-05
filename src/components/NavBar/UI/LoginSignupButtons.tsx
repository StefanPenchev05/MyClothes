import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from "@mui/material";


function LoginSignupButtons() {
    const { t } = useTranslation();

  return (
    <div className="w-1/4 space-x-4">
        <Button variant="contained" className="w-32 h-8 font-bold text-lg bg-purple-button">
            <Link to={'/user/login'}>
                {t('Login')}
            </Link>
        </Button>
        <Button variant="outlined" color="primary" className="w-32 h-8 font-semibold text-base rounded-lg">
            <Link to={'/user/registration'}>
                {t('Sign up')}
            </Link>
        </Button>
    </div>
  )
}

export default LoginSignupButtons
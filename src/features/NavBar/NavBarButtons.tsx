import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Home, Checkroom, Email, Star } from "@mui/icons-material";
import { IconButton as MuiIconButton, Tooltip } from "@mui/material";
import { styled } from '@mui/system';

function NavBarButtons() {
    const { t } = useTranslation();
    const IconButton = styled(MuiIconButton)({
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    });

  return (
    <div className="flex justify-center w-full sm:w-3/4 md:w-1/2 space-x-2 sm:space-x-4 md:space-x-8">
        <IconButton color="primary">
            <Tooltip title={t('navbar.Home page')}>
                <Link to={'/'}>
                    <Home sx={{width:'50px', height:'50px', sm:{width:'35px', height:'35px'}, md:{width:'40px', height:'40px'}}}/>
                </Link>
            </Tooltip>
        </IconButton>
        <IconButton color="secondary">
            <Tooltip title={t('navbar.Products')}>
                <Link to={'/products'}>
                    <Checkroom sx={{width:'50px', height:'50px', sm:{width:'35px', height:'35px'}, md:{width:'40px', height:'40px'}}}/>
                </Link>
            </Tooltip>
        </IconButton>
        <IconButton color="success">
            <Tooltip title={t('navbar.Contact us')}>
                <Link to={'/contactus'}>
                    <Email sx={{width:'50px', height:'50px', sm:{width:'35px', height:'35px'}, md:{width:'40px', height:'40px'}}}/>
                </Link>
            </Tooltip>
        </IconButton>
        <IconButton color="warning">
            <Tooltip title={t('navbar.Best Products')}>
                <Link to={'/bestproducts'}>
                    <Star sx={{width:'50px', height:'50px', sm:{width:'35px', height:'35px'}, md:{width:'40px', height:'40px'}}}/>
                </Link>
            </Tooltip>
        </IconButton>
    </div>
  )
}

export default NavBarButtons
import React from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Home, Checkroom, Email, Star } from "@mui/icons-material";
import { IconButton, Tooltip, } from "@mui/material";

function NavBarButtons() {
    const { t } = useTranslation();

  return (
    <div className="flex justify-center w-1/2 space-x-8">
        <IconButton color="primary">
            <Tooltip title={t('navbar.Home page')}>
                <Link to={'/home'}>
                    <Home sx={{width:'40px', height:'40px'}}/>
                </Link>
            </Tooltip>
        </IconButton>
        <IconButton color="secondary">
            <Tooltip title={t('navbar.Products')}>
                <Link to={'/products'}>
                    <Checkroom sx={{width:'40px', height:'40px'}}/>
                </Link>
            </Tooltip>
        </IconButton>
        <IconButton color="success">
            <Tooltip title={t('navbar.Contact us')}>
                <Link to={'/contactus'}>
                    <Email sx={{width:'40px', height:'40px'}}/>
                </Link>
            </Tooltip>
        </IconButton>
        <IconButton color="warning">
            <Tooltip title={t('navbar.Best Products')}>
                <Link to={'/bestproducts'}>
                    <Star sx={{width:'40px', height:'40px'}}/>
                </Link>
            </Tooltip>
        </IconButton>
    </div>
  )
}

export default NavBarButtons
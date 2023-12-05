import React from 'react'
import { useTranslation } from 'react-i18next';
import { Typography, Box} from "@mui/material";

interface UserInfo {
    firstName: string,
    lastName: string,
    avatar: string,
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number
}

interface UserDetailsProps {
    userInfo: UserInfo
}

function UserDetails({userInfo}: UserDetailsProps) {
    const { t } = useTranslation();

  return (
    <Box sx={{ ml: 2 }}>
        <Typography variant="h6" className="h-6">
            {userInfo.firstName} {userInfo.lastName}
        </Typography>
        <Typography variant="subtitle1" color={'gray'}>
            {userInfo.role === 'Designer' ? `${t('navbar.Designs')}: ${userInfo.products}` : `${t('navbar.PurchasedProducts')}: ${userInfo.purchasedProducts}`}
        </Typography>
    </Box>
  )
}

export default UserDetails
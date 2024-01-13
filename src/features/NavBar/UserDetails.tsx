import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Box} from "@mui/material";

function UserDetails() {
    const { t } = useTranslation();
    const userInfo = useSelector((state: any) => state.userNavBar);

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
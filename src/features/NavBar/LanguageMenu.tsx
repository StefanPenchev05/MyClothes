import React,{useState, useEffect} from 'react'
import { Menu, MenuItem, Button, Badge } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { ArrowDropDown } from "@mui/icons-material";

import EnglishFlag from "../../assets/images/EnglishFlag.png"
import BulgarianFlag from "../../assets/images/BulgarianFlag.png"

function LanguageMenu() {
    const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);
    const [countryFlag, setCountryFlag] = useState<string>(() => {
        const lang = document.querySelector('html')?.lang;
        if(lang === 'en'){
            return EnglishFlag
        }
        return BulgarianFlag;
    });
    const {i18n} = useTranslation();

    const handleClickLang = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorElLang(null);
      };

    useEffect(() => {
        const lang = countryFlag === EnglishFlag ? 'en' : 'bg';
        document.querySelector('html')!.lang = lang;
        i18n.changeLanguage(lang);
    }, [countryFlag]);

  
  return (
    <div className="1/6">
        <Button onClick={handleClickLang}>
            <Badge 
                badgeContent={<ArrowDropDown fontSize="large" sx={{color:'black'}}/>} 
                anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}
            >
                <img src={countryFlag} alt="user" className="w-14 h-8 rounded-md"/>
            </Badge>
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorElLang}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLang}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        >
            <MenuItem onClick={() => setCountryFlag(EnglishFlag)}>
                <img src={EnglishFlag} alt="user" className="w-8 h-8 rounded-md"/>
                <span className="ml-2">English</span>
            </MenuItem>
            <MenuItem onClick={() => setCountryFlag(BulgarianFlag)}>
                <img src={BulgarianFlag} alt="user" className="w-8 h-8 rounded-md"/>
                <span className="ml-2">Български</span>
            </MenuItem>
        </Menu>
    </div>
  )
}

export default LanguageMenu
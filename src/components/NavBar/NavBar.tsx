import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Checkroom, Email, Star, ArrowDropDown } from "@mui/icons-material";
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Badge, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

import EnglishFlag from "../../assets/images/EnglishFlag.png";
import BulgarianFlag from "../../assets/images/BulgarianFlag.png";


import SearchBar from "./UI/SearchBar";
import SearchResultMenu from "./UI/SearchResultMenu";
import { getData } from "../../service/api";

interface Data {
    message? : string,
    username: string,
    avatar: string,
}

interface UserInfo {
    firstName: string,
    lastName: string,
    avatar: string,
    role: string,
}

interface DesignerData extends UserInfo {
    products: number,
    sales: number,
}

function NavBar() {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [searchResult, setSearchResult] = useState<Data[]>();

    const {i18n, t} = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [countryFlag, setCountryFlag] = useState<string>(() => {
        const lang = document.querySelector('html')?.lang;
        if(lang === 'en'){
            return EnglishFlag
        }
        return BulgarianFlag;
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        const lang = countryFlag === EnglishFlag ? 'en' : 'bg';
        document.querySelector('html')!.lang = lang;
        i18n.changeLanguage(lang);
    }, [countryFlag]);

    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const data = await getData('/navBar/userInfo');
                if(!data.message){
                    setUserInfo(data);
                }else{
                   setUserInfo(undefined);
                }
            }catch(err){
                console.log(err);
            }
            
        }
        getUserInfo();
        console.log(userInfo);
    }, []);

  return (
    <AppBar position="static" sx={{backgroundColor: '#f8f9fa', height:'80px'}} className="justify-center">
        <Toolbar sx={{color: 'black', padding: '0 1rem'}}>
            <div className="flex flex-row justify-between items-center  w-full">
                {userInfo ? (
                <div className="flex flex-row w-1/4 space-x-4">
                    <div className="inline">
                        <img src={userInfo.avatar} alt="user" className="w-16 h-14 rounded-2xl object-cover"/>                   
                    </div>
                    <div>
                        
                    </div>
                </div>
                ) : (
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
                )}
                <div className="flex justify-center w-1/2 space-x-8">
                  <IconButton>
                    <Tooltip title={t('navbar.Home page')}>
                        <Link to={'/home'}>
                            <Home sx={{width:'40px', height:'40px'}}/>
                        </Link>
                    </Tooltip>
                  </IconButton>
                  <IconButton>
                    <Tooltip title={t('navbar.Products')}>
                        <Link to={'/products'}>
                            <Checkroom sx={{width:'40px', height:'40px'}}/>
                        </Link>
                    </Tooltip>
                  </IconButton>
                  <IconButton>
                    <Tooltip title={t('navbar.Contact us')}>
                        <Link to={'/contactus'}>
                            <Email sx={{width:'40px', height:'40px'}}/>
                        </Link>
                    </Tooltip>
                  </IconButton>
                  <IconButton>
                    <Tooltip title={t('navbar.Best Products')}>
                        <Link to={'/bestproducts'}>
                            <Star sx={{width:'40px', height:'40px'}}/>
                        </Link>
                    </Tooltip>
                  </IconButton>
                </div>
                <div className="flex flex-row items-center w-1/4">
                    <div className="1/6">
                        <Button onClick={handleClick}>
                            <Badge 
                                badgeContent={<ArrowDropDown fontSize="large" sx={{color:'black'}}/>} 
                                anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}
                            >
                                <img src={countryFlag} alt="user" className="w-12 h-10 rounded-md"/>
                            </Badge>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
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
                    <div className="relative items-center w-5/6 ml-8">
                        <SearchBar setSearchResult= {setSearchResult}/>
                        {searchResult && (
                            <div className="absolute w-full mt-1">
                                <SearchResultMenu searchResult = {searchResult}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar
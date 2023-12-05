import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Checkroom, Email, Star, ArrowDropDown, Person2, Settings, Logout, ChatBubble, ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Badge, Tooltip, Typography, Box, Avatar, ListItemIcon, ListItemText} from "@mui/material";
import { useTranslation } from "react-i18next";

import EnglishFlag from "../../assets/images/EnglishFlag.png";
import BulgarianFlag from "../../assets/images/BulgarianFlag.png";


import SearchBar from "./UI/SearchBar";
import SearchResultMenu from "./UI/SearchResultMenu";
import { getData, sendData } from "../../service/api";

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
    purchasedProducts: number,
    products?: number,
    sales?: number
}

function NavBar() {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [searchResult, setSearchResult] = useState<Data[]>();
    const [isLoaded, setIsLoaded] = useState(false);

    const {i18n, t} = useTranslation();

    const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);
    const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);

    const [countryFlag, setCountryFlag] = useState<string>(() => {
        const lang = document.querySelector('html')?.lang;
        if(lang === 'en'){
            return EnglishFlag
        }
        return BulgarianFlag;
    });

    const handleLogOut = async(event:React.MouseEvent) => {
        event.preventDefault();
        try{
            await sendData('/user/logout');
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    const handleClickLang = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    }

    const handleCloseProfile = () => {
        setAnchorElProfile(null);
    }
  
    const handleCloseLang = () => {
      setAnchorElLang(null);
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
                setIsLoaded(true);
            }catch(err){
                console.log(err);
            }
            
        }
        getUserInfo();
    }, []);

  return (
    <AppBar position="static" sx={{backgroundColor: '#f8f9fa', height:'80px'}} className="justify-center">
        <Toolbar sx={{color: 'black', padding: '0 1rem'}}>
            <div className="flex flex-row justify-between items-center  w-full">
                {userInfo ? (
                <div className="flex flex-row justify-between items-center w-1/4">
                    <div className="flex flex-row items-center">
                        <div className="inline">
                            <Tooltip title={t('navbar.MyProfile')}>
                                <IconButton
                                    size="small"
                                    sx={{ width: 56, height: 56 }}
                                    onClick={handleClickProfile}
                                >
                                    <Avatar src={userInfo.avatar} alt="user" sx={{ width: 56, height: 56 }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                            id="basic-menu"
                            anchorEl={anchorElProfile}
                            open={Boolean(anchorElProfile)}
                            onClose={handleCloseProfile}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            >
                            <MenuItem onClick={handleCloseProfile}>
                                <ListItemIcon>
                                    <Person2 fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link to={'/user/profile'}>
                                        {t('navbar.MyProfile')}
                                    </Link>
                                </ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link to={'/user/settings'}>
                                        {t('navbar.Settings')}
                                    </Link>
                                </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleCloseProfile}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link to={'/home'} onClick={handleLogOut}>
                                        {t('LogOut')}
                                    </Link>
                                </ListItemText>
                            </MenuItem>
                            </Menu>
                        </div>
                        <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" className="h-6">
                            {userInfo.firstName} {userInfo.lastName}
                        </Typography>
                        <Typography variant="subtitle1" color={'gray'}>
                            {userInfo.role === 'Designer' ? `${t('navbar.Designs')}: ${userInfo.products}` : `${t('navbar.PurchasedProducts')}: ${userInfo.purchasedProducts}`}
                        </Typography>
                        </Box>
                    </div>
                    <Tooltip title="Chat">
                        <Badge 
                             badgeContent={3} 
                             color="error"
                             anchorOrigin={{
                               vertical: 'top',
                               horizontal: 'right',
                             }}
                        >
                            <IconButton sx={{padding:'0px'}}>
                                <ChatBubble fontSize="large" color="action"/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                    <Tooltip title="Shopping Cart">
                        <IconButton color="secondary">
                            <ShoppingCart fontSize="large" />
                        </IconButton>
                    </Tooltip>
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
                <div className="flex flex-row items-center w-1/4">
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
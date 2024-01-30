import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Settings, Logout, Person } from "@mui/icons-material";

import { getData } from "../../service/api";
import { clearUser } from "../users/userNavBarSlice";

function ProfileMenu() {
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { avatar, id } = useSelector((state: any) => state.userNavBar);

  const handleClickProfile = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElProfile(event.currentTarget);
    },
    []
  );

  const handleCloseProfile = useCallback(
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setAnchorElProfile(null);
    },
    []
  );

  const handleMenuItemClick = useCallback(
    (event: React.SyntheticEvent | Event, path: string) => {
      handleCloseProfile(event);
      navigate(path);
    },
    [navigate]
  );

  const handleLogOut = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      handleCloseProfile(event);
      try {
        await getData("/user/logout");
        dispatch(clearUser());
        navigate("/user/login");
      } catch (err) {
        console.error("Error during logout: ", err);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className="inline">
      <Tooltip title={t("navbar.MyProfile")}>
        <IconButton
          size="small"
          sx={{ width: 56, height: 56 }}
          onClick={handleClickProfile}
        >
          <Avatar
            src={avatar.avatar ? avatar.avatar : avatar}
            alt="user"
            sx={{ width: 56, height: 56 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={handleCloseProfile}
      >
        <MenuItem
          onClick={(e) => handleMenuItemClick(e, `/user/profile/${id}`)}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("navbar.MyProfile")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuItemClick(e, "/user/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("navbar.Settings")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("Logout")}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu;

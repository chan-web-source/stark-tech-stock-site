import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import {
  KeyboardArrowDown,
  Search,
  AccountCircle
} from "@mui/icons-material";
import style from "./style.module.css";
import LeftPanel from "../LeftPanel";
const Header: React.FC = () => {
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('個股');
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  const handleNavClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>, menu: string) => {
    setAnchorEl(prev => ({ ...prev, [menu]: event.currentTarget }));
  };

  const handleDropdownClose = (menu: string) => {
    setAnchorEl(prev => ({ ...prev, [menu]: null }));
  };

  const navItems = [
    { name: '個股', hasDropdown: false },
    { name: '選股', hasDropdown: true },
    { name: '產業', hasDropdown: true },
    { name: '市場', hasDropdown: true },
    { name: '購買', hasDropdown: false },
    { name: '更多', hasDropdown: true },
  ];

  return (
    <AppBar position="fixed" className={style.stockHeader} elevation={0}>
      <Toolbar className={style.stockContainer}>
        {/* Logo Section */}
        <Box className={style.logoSection}>
          <Box className={style.logoIcon}>
            <AccountCircle sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" className={style.logoText}>
            股票平台
          </Typography>
        </Box>

        {/* Navigation Menu */}
        <Box component="nav" className={style.navigationMenu}>
          {navItems.map((item) => (
            <Box key={item.name} className={style.navItemContainer}>
              <Button
                className={`${style.navButton} ${activeMenu === item.name ? style.active : ''}`}
                onClick={(e) => {
                  handleNavClick(item.name);
                  if (item.hasDropdown) {
                    handleDropdownOpen(e, item.name);
                  }
                }}
                endIcon={item.hasDropdown ? <KeyboardArrowDown className={style.dropdownArrow} /> : null}
                disableRipple
              >
                {item.name}
              </Button>

              {item.hasDropdown && (
                <Menu
                  anchorEl={anchorEl[item.name]}
                  open={Boolean(anchorEl[item.name])}
                  onClose={() => handleDropdownClose(item.name)}
                  className={style.dropdownMenu}
                  MenuListProps={{
                    className: style.dropdownList
                  }}
                >
                  <MenuItem className={style.dropdownItem} onClick={() => handleDropdownClose(item.name)}>
                    選項 1
                  </MenuItem>
                  <MenuItem className={style.dropdownItem} onClick={() => handleDropdownClose(item.name)}>
                    選項 2
                  </MenuItem>
                  <MenuItem className={style.dropdownItem} onClick={() => handleDropdownClose(item.name)}>
                    選項 3
                  </MenuItem>
                </Menu>
              )}
            </Box>
          ))}
        </Box>

        {/* Search Bar */}
        <Box className={style.searchContainer}>
          <TextField
            placeholder="輸入台/美股代號,查看公司價值"
            variant="outlined"
            size="small"
            className={style.searchField}
            fullWidth
            sx={{
              minWidth: '300px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#bdbdbd',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputBase-input': {
                fontSize: '14px',
                padding: '12px 16px',
                '&::placeholder': {
                  color: '#999',
                  opacity: 1,
                }
              },
            }}
            slotProps={{
              input: {
                className: style.searchInput
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search className={style.searchIcon} />
                </InputAdornment>
              )
            }}
          />
        </Box>

        {/* User Actions */}
        <Box className={style.userActions}>
          <Button
            className={style.loginButton}
            disableRipple
          >
            登入
          </Button>
          <Button
            variant="contained"
            className={style.registerButton}
            disableRipple
          >
            免費註冊
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


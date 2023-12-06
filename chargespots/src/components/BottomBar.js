import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled } from '@mui/system';
import { Home as HomeIcon, ShoppingBasket as ShoppingBasketIcon, Assignment as AssignmentIcon,
   People as PeopleIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

function BottomBar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Function to get the index based on the route
  const getPageIndex = (route) => {
    switch (route) {
      case '/':
        return 0;
      case '/buy':
        return 1;
      case '/lease':
        return 2;
      case '/team':
        return 3;
      case '/mine':
        return 4;
      default:
        return 0;
    }
  };

  // Get the index based on the current route
  useEffect(() => {
    setActiveTab(getPageIndex(location.pathname));
  }, [location.pathname]);

  const handleTabClick = (event, tab) => {
    setActiveTab(tab);
  };

  const TabBarButton = styled(BottomNavigationAction)({
    '&.MuiBottomNavigationAction-label': {
      color: 'gray',
    },
    '&.Mui-selected': {
      color: '#1895b0',
    },
  });

  return (
    <BottomNavigation
      sx={{ width: '100%' }}
      value={activeTab}
      onChange={(event, newValue) => handleTabClick(event, newValue)}
      showLabels
      className="flex justify-between sm:gap-[2px] px-4 py-8 mx-auto bg-white fixed bottom-0 w-screen h-8 md:gap-32"
    >
      <TabBarButton
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <TabBarButton
        label="Buy"
        icon={<ShoppingBasketIcon />}
        component={Link}
        to="/buy"
      />
      <TabBarButton
        label="Lease"
        icon={<AssignmentIcon />}
        component={Link}
        to="/lease"
      />
      <TabBarButton
        label="Team"
        icon={<PeopleIcon />}
        component={Link}
        to="/team"
      />
      <TabBarButton
        label="Mine"
        icon={<AccountCircleIcon />}
        component={Link}
        to="/mine"
      />
    </BottomNavigation>
  );
}

export default BottomBar;

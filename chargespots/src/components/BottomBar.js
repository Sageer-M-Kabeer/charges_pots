import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home as HomeIcon, ShoppingBasket as ShoppingBasketIcon, Assignment as AssignmentIcon, People as PeopleIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

function BottomBar() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <BottomNavigation
      value={activeTab}
      onChange={(event, newValue) => handleTabClick(newValue)}
      showLabels
      className="flex justify-between px-10 py-8  bg-white fixed bottom-0 w-screen h-8 md:gap-32"
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon/>}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Buy"
        icon={<ShoppingBasketIcon />}
        component={Link}
        to="/buy"
      />
      <BottomNavigationAction
        label="Lease"
        icon={<AssignmentIcon />}
        component={Link}
        to="/lease"
      />
      <BottomNavigationAction
        label="Team"
        icon={<PeopleIcon/>}
        component={Link}
        to="/team"
      />
      <BottomNavigationAction
        label="Mine"
        icon={<AccountCircleIcon/>}
        component={Link}
        to="/mine"
      />
    </BottomNavigation>
  );
}

export default BottomBar;

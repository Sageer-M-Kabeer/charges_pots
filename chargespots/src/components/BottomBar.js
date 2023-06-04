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
      className="flex justify-between  bg-white fixed bottom-0 w-full md:gap-32"
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon style={{ color: activeTab === 1 ? 'rgb(24, 149, 176)' : 'inherit' }} />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Buy"
        icon={<ShoppingBasketIcon style={{ color: activeTab === 2 ? 'rgb(24, 149, 176)' : 'inherit' }} />}
        component={Link}
        to="/buy"
      />
      <BottomNavigationAction
        label="Lease"
        icon={<AssignmentIcon style={{ color: activeTab === 3 ? 'rgb(24, 149, 176)' : 'inherit' }} />}
        component={Link}
        to="/lease"
      />
      <BottomNavigationAction
        label="Team"
        icon={<PeopleIcon style={{ color: activeTab === 4 ? 'rgb(24, 149, 176)' : 'inherit' }} />}
        component={Link}
        to="/team"
      />
      <BottomNavigationAction
        label="Mine"
        icon={<AccountCircleIcon style={{ color: activeTab === 5 ? 'rgb(24, 149, 176)' : 'inherit' }} />}
        component={Link}
        to="/mine"
      />
    </BottomNavigation>
  );
}

export default BottomBar;

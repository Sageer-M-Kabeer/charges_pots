import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled} from '@mui/system';
import { Home as HomeIcon, ShoppingBasket as ShoppingBasketIcon, Assignment as AssignmentIcon, People as PeopleIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

function BottomBar() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const TabBarButton = styled(BottomNavigationAction)({
    color: 'gray',
    '&.Mui-selected': {
      color: '#1895b0',
    },
  });

  return (
    <BottomNavigation
      sx={{width:'100%'}}
      value={activeTab}
      onChange={(event, newValue) => handleTabClick(newValue)}
      showLabels
      className="flex justify-between sm:gap-[2px] px-2 py-8 bg-white  fixed bottom-0 w-screen h-8 md:gap-32"
    >
      <TabBarButton 
        className=""
        label="Home"
        icon={<HomeIcon/>}
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
        icon={<PeopleIcon/>}
        component={Link}
        to="/team"
      />
      <TabBarButton
        label="Mine"
        icon={<AccountCircleIcon/>}
        component={Link}
        to="/mine"
      />
    </BottomNavigation>
  );
}

export default BottomBar;

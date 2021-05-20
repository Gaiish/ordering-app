import { useState } from 'react';

const useSidebarToggle = (): [boolean, () => void] => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return [isSidebarVisible, toggleSideBar];
};

export default useSidebarToggle;

import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useOutsideClicker } from '../../hooks/useOutsideClicker';
import useWindowSize from '../../hooks/useWindowSize';
import { useMantineColorScheme } from '@mantine/core';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const size = useWindowSize();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const bgForTheme = `${
    dark
      ? ' bg-gradient-to-t from-slate-500 to-[#1a1b1e] animate-fadeIn md:w-64 w-[250px]'
      : ' bg-gradient-to-t from-orange-500 to-white animate-fadeIn md:w-64 w-[250px]'
  }`;
  const [customCSS, setCustomCSS] = useState(bgForTheme);

  useEffect(() => {
    if (size.width <= 768) {
      setCustomCSS(`${isOpen ? bgForTheme : 'hidden'}`);
    } else {
      setCustomCSS(bgForTheme);
    }
  }, [size.width, isOpen, dark]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, setIsOpen);

  return (
    <div class="h-[calc(100vh-64px)] flex fixed z-20" data-dev-hint="container">
      <input
        type="checkbox"
        id="menu-open"
        class="hidden"
        onChange={(e) => {
          setIsOpen(e.target.checked);
        }}
      />

      <aside
        id="sidebar"
        ref={wrapperRef}
        class={customCSS}
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div className="h-3/4 flex flex-col justify-center mt-8">
          <nav className="flex flex-col items-center justify-between gap-2">
            <NavLink to="/dashboard" className=" hover:font-semibold p-2">
              Orders
            </NavLink>{' '}
            <NavLink
              to="/dashboard/profile"
              className=" hover:font-semibold p-2"
            >
              Profile
            </NavLink>{' '}
            <NavLink
              to="/dashboard/addreview"
              className=" hover:font-semibold p-2"
            >
              Add Review
            </NavLink>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideNavbar;

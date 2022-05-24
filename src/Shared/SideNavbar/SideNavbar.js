import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useOutsideClicker } from '../../hooks/useOutsideClicker';
import useWindowSize from '../../hooks/useWindowSize';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const size = useWindowSize();
  const [customCSS, setCustomCSS] = useState(
    'bg-gradient-to-t from-orange-400  md:w-64 w-3/4  '
  );

  useEffect(() => {
    if (size.width <= 768) {
      setCustomCSS(
        `${
          isOpen
            ? 'bg-gradient-to-t from-orange-400  animate-fadeIn md:w-64 w-[250px]  '
            : 'hidden'
        }`
      );
    } else {
      setCustomCSS('bg-gradient-to-t from-orange-400  md:w-64 w-3/4  ');
    }
  }, [size.width, isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, setIsOpen);

  return (
    <div class=" min-h-[calc(100vh-64px)] flex" data-dev-hint="container">
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

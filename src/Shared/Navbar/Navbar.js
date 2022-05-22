import { ActionIcon, useMantineColorScheme, Highlight } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as Sun } from '../../Assets/sun.svg';
import { ReactComponent as Moon } from '../../Assets/moon.svg';
import { ReactComponent as Bars } from '../../Assets/bars.svg';
import { ReactComponent as Cross } from '../../Assets/cross.svg';
import { useOutsideClicker } from '../../hooks/useOutsideClicker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

const menuItems = (
  <>
    <NavLink
      className={(navData) =>
        navData.isActive
          ? 'text-sm font-semibold text-orange-400 px-3 py-3'
          : 'text-sm hover:font-semibold px-3 py-3'
      }
      to="/blog"
    >
      Blog
    </NavLink>
    <NavLink
      to="/contact"
      className={(navData) =>
        navData.isActive
          ? 'text-sm font-semibold text-orange-400 px-3 py-3'
          : 'text-sm hover:font-semibold px-3 py-3'
      }
    >
      Contact
    </NavLink>
    <NavLink
      to="/products"
      className={(navData) =>
        navData.isActive
          ? 'text-sm font-semibold text-orange-400 px-3 py-3'
          : 'text-sm hover:font-semibold px-3 py-3'
      }
    >
      Products
    </NavLink>
    <NavLink
      to="/portfolio"
      className={(navData) =>
        navData.isActive
          ? 'text-sm font-semibold text-orange-400 px-3 py-3'
          : 'text-sm hover:font-semibold px-3 py-3'
      }
    >
      Portolio
    </NavLink>
  </>
);

const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, setIsOpen);

  //const [user] = useAuthState(auth);

  const logout = () => {};

  return (
    <div ref={wrapperRef} className="container-lg">
      <nav className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center">
              <img className="h-7 mr-3" src="/logo.png" alt="Workflow" />
              <Highlight
                size="xl"
                highlight="Pati"
                weight={900}
                highlightStyles={(theme) => ({
                  backgroundImage: theme.fn.linearGradient(45, '#f4900c'),
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                })}
              >
                JontroPati
              </Highlight>
            </NavLink>

            <div className="hidden md:block">
              <div className="mr-5 flex items-baseline space-x-4">
                {menuItems}
              </div>
            </div>

            <div className="hidden md:block  ">
              <div className="flex items-center space-x-4">
                <ActionIcon
                  variant=""
                  color={dark ? '' : 'dark'}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {dark ? <Sun /> : <Moon />}
                </ActionIcon>
                <NavLink
                  to="/login"
                  className={' font-semibold text-orange-500 px-3 py-3'}
                >
                  Login/Signup
                </NavLink>
              </div>
            </div>

            <div className="mr-4 flex md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <Cross /> : <Bars />}
              </button>
            </div>
          </div>
        </div>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </div>
  );
};

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <div
      id="mobile-menu"
      className={`${dark ? 'bg-[#1a1b1e]' : 'bg-white'}
        ${
          isOpen
            ? 'container absolute z-[100] md:hidden animate-fadeIn px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center'
            : 'hidden'
        }
      `}
    >
      <ActionIcon
        variant=""
        color={dark ? '' : 'dark'}
        onClick={() => {
          toggleColorScheme();
          setIsOpen(false);
        }}
        title="Toggle color scheme"
      >
        {dark ? <Sun /> : <Moon />}
      </ActionIcon>
      {menuItems}
      <NavLink
        to="/login"
        className={' font-semibold text-orange-500 px-3 py-3'}
      >
        Login/Signup
      </NavLink>
    </div>
  );
};

export default Navbar;

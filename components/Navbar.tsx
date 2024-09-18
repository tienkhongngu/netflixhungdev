import { useCallback, useState } from "react";


import { FaChevronDown,FaSearch, FaRegBell  } from "react-icons/fa";

import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";

const Navbar = () => {

    const [showMobileMenu, setshowMobileMenu] = useState(false);
    const [showAccountMenu, setshowAccountMenu] = useState(false);

    const toggleMobileMenu = useCallback(() =>{
        setshowMobileMenu((current) => !current)
    },[ ])

    const toggleAccountMenu = useCallback(() =>
    {
        setshowAccountMenu((current) => !current)
    }, [])

  return (
    <nav className="w-full fixed z-40">
      <div
        className="
       px-4
       md:px-16
       py-6
       flex
       flex-row
       items-center
       transition
       bg-zinc-900
       bg-opacity-90"
      >
        <img className="h-4 lg:h-7" src="/images/logopng.png" alt="logo" />
        {/* Menu */}
        <div className="
            flex-grow
            ml-8
            gap-7
            hidden
            lg:flex
        ">
            <NavbarItem label="Trang chủ"/>
            <NavbarItem label="Phim T.hình"/>
            <NavbarItem label="Phim truyện"/>
            <NavbarItem label="Mới và phổ biến"/>
            <NavbarItem label="Danh sách của tôi"/>
            <NavbarItem label="Theo ngôn ngữ"/>
        </div>

        {/* Mobile menu */}
        <div onClick={toggleMobileMenu}
             className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <FaChevronDown className={`text-white transition  ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
            <MobileMenu visible={showMobileMenu}/>
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <FaSearch />
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <FaRegBell />
            </div>
            <div className="flex flex-grow items-center gap-2 cursor-pointer relative" onClick={toggleAccountMenu}>
                <div className="w-6 rounded-r-md" >
                    <img src="/images/profiles1.jpg" alt="User" />
                </div>
                <FaChevronDown className={`text-white transition  ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
            </div>
            <AccountMenu visible={showAccountMenu}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

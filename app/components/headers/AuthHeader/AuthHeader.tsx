// import Image from 'next/image'

export default function AuthHeader() {
  return <div> this is authheader</div>

  //   example from Dillon's app -- do not use without reviewing!!
  //   return (
  //     <header className="relative p-4 flex justify-between items-center">
  //       {/* Left side: Menu Icon and Logo */}
  //       <div className="flex items-center gap-4">
  //         {/* Hamburger Menu Button */}
  //         <Button
  //           ref={buttonRef} // Attach the ref to the button
  //           variant="ghost"
  //           size="icon"
  //           onClick={toggleMenu}
  //           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  //         >
  //           {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  //         </Button>
  //         <img src={DailyMindfullLogo || "/placeholder.svg"} alt="Daily Mindfull Logo" className="h-12 w-auto" />
  //         <Link to="/profile" className="text-xl font-bold tracking-tight">
  //           Daily Mindfull
  //         </Link>
  //       </div>
  //       <ThemeToggle />
  //       {/* Dropdown Menu */}
  //       {isMenuOpen && (
  //         <div
  //           ref={menuRef} // Attach the ref to the menu container
  //           className={cn(
  //             "absolute top-16 left-4 w-56 rounded-md shadow-lg border z-10",
  //             theme === 'light' ? 'bg-white text-black' : 'bg-[#1C2033] text-white'
  //           )}
  //         >
  //           <div className="p-2 flex flex-col space-y-1">
  //             <Button
  //               variant="ghost"
  //               className="justify-start"
  //               onClick={() => handleNavigate('/profile')}
  //             >
  //               My Dashboard
  //             </Button>
  //             <Button
  //               variant="ghost"
  //               className="justify-start"
  //               onClick={() => handleNavigate('/journal')}
  //             >
  //               Log Today's Entry
  //             </Button>
  //             <Button
  //               variant="ghost"
  //               className="justify-start"
  //               onClick={handleLogout}
  //             >
  //               Logout
  //             </Button>
  //           </div>
  //         </div>
  //       )}
  //     </header>
  //   );
}

import Image from 'next/image'
import NavLinks from './navlinks/LandingNavLinks'

export default function PublicHeader() {
  return (
    <header className="flex flex-row justify-between m-2">
      <Image
        src="/images/logo_placeholder.jpeg"
        alt="Logo"
        width="100"
        height="100"
      />
      <div className="flex flex-row justify-around mt-2 items-center gap-x-10">
        <NavLinks />
        <div className="flex flex-row gap-x-5 ">
          <button className="bg-red-700 rounded-lg text-black px-5 py-2.5 border border-black-600">
            Register
          </button>
          <button className="rounded-lg text-black px-5 py-2.5 border border-green-600">
            Log In
          </button>
        </div>
      </div>
    </header>
  )
}

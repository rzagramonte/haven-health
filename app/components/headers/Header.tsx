import AuthHeader from './AuthHeader/AuthHeader'
import PublicHeader from './PublicHeader/PublicHeader'

export default function Header() {
  //put in a session here
  //return session ? AuthHeader: PublicHeader
  return <PublicHeader />
}

// import PatientAuthHeader from './AuthHeader/PatientAuthHeader'
import ProviderAuthHeader from './AuthHeader/ProviderAuthHeader'
// import PublicHeader from './PublicHeader/PublicHeader'

export default function Header() {
  //put in a session here
  //return session ? AuthHeader: PublicHeader
  return (
    <div className="bg-background">
      <ProviderAuthHeader />
    </div>
  )
}

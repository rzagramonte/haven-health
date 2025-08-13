import { ProviderInfo } from '@/lib/types/provider'

type Props = {
  provider: ProviderInfo
}

export default function ProviderCard({ provider }: Props) {
  return (
    <div className="border border-border rounded-xl shadow-sm p-4 hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-2">
        Dr. {provider.first_name} {provider.last_name}, MD
      </h2>

      {provider.contact?.map((c, i) => (
        <p key={i} className="text-sm text-muted-foreground mb-1">
          {c.contact_type}: {c.contact_value}
        </p>
      ))}

      {provider.address?.[0] && (
        <p className="text-sm text-muted-foreground mb-1">
          {provider.address[0].streeta}, {provider.address[0].city},{' '}
          {provider.address[0].address_state} {provider.address[0].zip_code}
        </p>
      )}
    </div>
  )
}

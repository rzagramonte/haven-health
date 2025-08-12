export function getDisplayName(
  person: {
    role?: string | null
    first_name?: string | null
    last_name?: string | null
  },
  isCurrentUser?: boolean,
) {
  if (isCurrentUser) {
    return 'You'
  }

  const displayName =
    [person.first_name, person.last_name].filter(Boolean).join(' ') || 'Unknown'

  return person.role === 'provider' ? `Dr. ${displayName}` : displayName
}

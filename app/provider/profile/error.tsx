'use client'

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="p-4 text-red-500">
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  )
}

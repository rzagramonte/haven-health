import { hasEnvVars } from '@/lib/utils'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>
        {hasEnvVars
          ? 'Environment variables are set. Ready to code!'
          : 'Environment variables are not set.'}
      </p>
    </main>
  )
}

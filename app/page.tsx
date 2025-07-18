import { hasEnvVars } from '@/lib/utils'
import Header from './components/headers/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <p>
          {hasEnvVars
            ? 'Environment variables are set. Ready to code!'
            : 'Environment variables are not set.'}
        </p>
      </main>
    </div>
  )
}

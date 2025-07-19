'use client'

import { hasEnvVars } from '@/lib/utils'
import { showError, showSuccess } from '@/utils/toast'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <p>
        {hasEnvVars
          ? 'Environment variables are set. Ready to code!'
          : 'Environment variables are not set.'}
      </p>
      <div className="space-x-4">
        <button
          className="text-[hsl(var(--destructive-foreground))] p-2 bg-[hsl(var(--destructive))]"
          onClick={() => showSuccess('Success! Everything is working.')}
        >
          Show Success Toast
        </button>

        <button
          className="text-[hsl(var(--destructive-foreground))] p-2 bg-[hsl(var(--destructive))]"
          onClick={() => showError('Something went wrong.')}
        >
          Show Error Toast
        </button>
      </div>
    </main>
  )
}

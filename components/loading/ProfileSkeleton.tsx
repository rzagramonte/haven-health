import { Button } from '@/components/ui/button'
import { CardAction } from '@/components/ui/card'

import { Skeleton } from '../ui/skeleton'

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <ul className="w-full max-w-[350px] flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center w-full justify-between gap-2 p-1 border-b border-destructive"
          >
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <Skeleton className="w-6 h-6 rounded" />
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <Skeleton className="w-20 h-3 rounded" /> {/* label */}
                <Skeleton className="w-full max-w-[180px] h-4 rounded" />{' '}
                {/* value */}
              </div>
            </div>
            <CardAction>
              <div className="flex gap-1">
                <Button
                  disabled
                  className="w-6 h-6 cursor-not-allowed"
                  aria-label="Cancel edit loading"
                >
                  <Skeleton className="w-4 h-4 rounded" />
                </Button>
                <Button
                  disabled
                  className="w-6 h-6 cursor-not-allowed"
                  aria-label="Save changes loading"
                >
                  <Skeleton className="w-4 h-4 rounded" />
                </Button>
              </div>
            </CardAction>
          </li>
        ))}
      </ul>
    </div>
  )
}

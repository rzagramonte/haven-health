import { toast } from 'sonner'

export function showSuccess(message: string) {
  toast.success(message, {
    className: `bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]`,
  })
}

export function showError(message: string) {
  toast.error(message, {
    className: `bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]`,
  })
}

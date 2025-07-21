export default function Error404() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center bg-[var(--color-background)] px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center border-1 border-black p-[2em] bg-[var(--color-card)]">
          <p className="text-base font-semibold text-[var(--color-accent)]">
            404
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-[var(--color-foreground)] sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-[var(--color-muted-foreground)] sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-[var(--color-accent)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a
              href="#"
              className="text-sm font-semibold text-[var(--color-foreground)]"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

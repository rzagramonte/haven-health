import Image from 'next/image'

export default function Error404() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
        <div className="bg-background">
          <Image
            alt="googly eyes"
            height={600}
            width={600}
            src="/images/googlyeyes.jpg"
          />
        </div>
        <div className="text-center border-1 border-black p-[2em] bg-card">
          <p className="text-base font-semibold text-accent">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-foreground">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

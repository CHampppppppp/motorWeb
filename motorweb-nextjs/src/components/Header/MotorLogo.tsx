import Link from 'next/link'

const MotorLogo = () => {
  return (
    <Link id="brand-link" href="/" className="text-text no-underline relative inline-block group" aria-label="主页">
          <span className="inline-flex gap-0.5 items-end leading-[1]" aria-hidden="true">
            <span className="inline-block transition-transform duration-250 ease-in-out  group-hover:animate-press-bounce" style={{ animationDelay: '2500ms' }}>m</span>
            <span className="letter group-hover:animate-press-bounce" style={{ animationDelay: '2400ms' }}>o</span>
            <span className="letter group-hover:animate-press-bounce" style={{ animationDelay: '2300ms' }}>t</span>
            <span className="letter group-hover:animate-press-bounce" style={{ animationDelay: '2200ms' }}>o</span>
            <span className="letter group-hover:animate-press-bounce" style={{ animationDelay: '2100ms' }}>r</span>
            <span className="letter group-hover:animate-press-bounce" style={{ animationDelay: '2000ms' }}>W</span>
            <span className="letter group-hover:animate-press-bounce" style={{ animationDelay: '1900ms' }}>e</span>
            <span className="letter group-hover:animate-press-bounce" style={{ animationDelay: '1800ms' }}>b</span>
          </span>
          <span
            className="absolute -right-10 -top-3 inline-block opacity-0 transform-gpu will-change-transform pointer-events-none transition-all duration-300 ease-in-out group-hover:opacity-100
            group-hover:animate-bike-move"
            aria-hidden="true"
          >
            🏍️
          </span>
        </Link>
  )
}

export default MotorLogo
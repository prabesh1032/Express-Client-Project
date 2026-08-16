import Image from 'next/image'
import Link from 'next/link'

type BrandLogoProps = { className?: string; imageClassName?: string; showName?: boolean }

export default function BrandLogo({ className = '', imageClassName = 'h-12 w-12', showName = true }: BrandLogoProps) {
  return <Link href='/' aria-label='Nepali Store home' className={`flex items-center gap-3 ${className}`}>
    <Image src='/logo.png' alt='Nepali Store logo' width={80} height={80} className={`object-contain ${imageClassName}`} priority />
    {showName && <span className='text-lg font-black tracking-tight text-[#251b2b]'>Nepali Store</span>}
  </Link>
}

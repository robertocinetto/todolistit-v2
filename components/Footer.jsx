import Link from 'next/link'

const Footer = () => {
  return (
    <div className='text-center p-5 border-t border-slate-100 dark:border-slate-600 text-slate-500'>
      © {new Date().getFullYear()}{' '}
      <a
        href='https://robertocinetto.com'
        target='_blank'
        rel='nofollow noopener noreferrer'
      >
        robertocinetto.com
      </a>
      <p>
        This is not a real project and it has only portfolio purpose. Checkout the design on{' '}
        <Link href='/design'>
          <a>Figma</a>
        </Link>
      </p>
    </div>
  )
}

export default Footer

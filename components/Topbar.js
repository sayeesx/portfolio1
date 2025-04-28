import Link from 'next/link';
import styles from './Topbar.module.css';
import { useRouter } from 'next/router';

export default function Topbar() {
  const router = useRouter();

  return (
    <div className={styles.topbar}>
      <nav className={styles.nav}>
        <Link href="/" className={router.pathname === '/' ? styles.active : ''}>
          Home
        </Link>
        <Link href="/works" className={router.pathname === '/works' ? styles.active : ''}>
          Works
        </Link>
        <Link href="/skills" className={router.pathname === '/skills' ? styles.active : ''}>
          Skills
        </Link>
        <Link href="/aboutme" className={router.pathname === '/aboutme' ? styles.active : ''}>
          About
        </Link>
        <Link href="/contact" className={router.pathname === '/contact' ? styles.active : ''}>
          Contact
        </Link>
      </nav>
    </div>
  );
}

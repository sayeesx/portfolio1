// components/Layout.js
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const router = useRouter(); // Get the router object

  return (
    <div>
      {/* Top Bar with Navigation Links */}
      <nav className={styles.topbar}>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={router.pathname === '/' ? styles.active : ''}>Home</Link>
          </li>
          <li>
            <Link href="/works" className={router.pathname === '/works' ? styles.active : ''}>Works</Link>
          </li>
          <li>
            <Link href="/skills" className={router.pathname === '/skills' ? styles.active : ''}>Skills</Link>
          </li>
          <li>
            <Link href="/aboutme" className={router.pathname === '/aboutme' ? styles.active : ''}>About</Link>
          </li>
          <li>
            <Link href="/contact" className={router.pathname === '/contact' ? styles.active : ''}>Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

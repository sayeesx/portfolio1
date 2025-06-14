// components/Layout.js
import styles from './Layout.module.css';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <main className="relative" style={{ margin: 0, padding: 0 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

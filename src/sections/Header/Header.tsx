import { motion } from 'framer-motion';
import { navItems } from '@/data/nav';
import { Button } from '@/components/ui/Button';
import { EASE_PREMIUM } from '@/lib/motion';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
    >
      <div className={styles.inner}>
        <a href="#top" className={styles.wordmark} aria-label="Newbii home">
          newbii
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href="#banner" variant="light" className={styles.joinBtn}>
            Join us
          </Button>
          <button
            className={styles.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? styles.barTop : ''} />
            <span className={open ? styles.barMid : ''} />
            <span className={open ? styles.barBot : ''} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#banner" variant="light" className={styles.mobileJoin}>
          Join us
        </Button>
      </div>
    </motion.header>
  );
}

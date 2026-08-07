import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { footerColumns, socials } from '@/data/footer';
import { inViewOnce, EASE_PREMIUM, qaInitial } from '@/lib/motion';
import { NewsletterForm } from './NewsletterForm';
import styles from './Footer.module.css';

const tilt = [-6, 4, -3, 6];

export function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <Container>
        <div className={styles.top}>
          {footerColumns.map((col) => (
            <nav key={col.heading} className={styles.col} aria-label={col.heading}>
              <h3 className={`display ${styles.colHeading}`}>{col.heading}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.newsletter}>
            <h3 className={`display ${styles.colHeading}`}>Subscribe</h3>
            <p className={styles.newsletterText}>
              Join our newsletter for the latest updates and insights.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.socialRow}>
          {socials.map((s, i) => (
            <motion.a
              key={s.platform}
              href={s.href}
              className={styles.tile}
              style={{ rotate: `${tilt[i]}deg` }}
              aria-label={s.label}
              initial={qaInitial({ opacity: 0, y: 30 })}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: i * 0.1 }}
              whileHover={{ rotate: 0, y: -6 }}
              drag
              dragSnapToOrigin
              dragElastic={0.6}
              dragMomentum={false}
              whileDrag={{ scale: 1.12, zIndex: 5 }}
              draggable={false}
              // Placeholder links go nowhere — don't let a click jump to top.
              // Real hrefs (added later) navigate normally.
              onClick={(e) => {
                if (s.href === '#') e.preventDefault();
              }}
            >
              <SocialIcon platform={s.platform} className={styles.tileIcon} />
            </motion.a>
          ))}
        </div>
      </Container>
    </footer>
  );
}

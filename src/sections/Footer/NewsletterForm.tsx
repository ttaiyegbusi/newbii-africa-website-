import { useState, type FormEvent } from 'react';
import styles from './Footer.module.css';

/**
 * Front-end-only newsletter capture. Validates the email and shows a success
 * state without pretending anything was persisted server-side.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.inputShell}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Email Here........."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          className={styles.input}
          autoComplete="email"
        />
        <button type="submit" className={styles.subscribe}>
          Subscribe
        </button>
      </div>
      <p className={styles.privacy} aria-live="polite">
        {status === 'success'
          ? "You're on the list — thanks for subscribing!"
          : status === 'error'
            ? 'Please enter a valid email address.'
            : 'By subscribing, you agree to our Privacy Policy and consent to receive updates.'}
      </p>
    </form>
  );
}

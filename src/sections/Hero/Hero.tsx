import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { staggerParent, staggerChild, EASE_PREMIUM, QA, qaInitial } from '@/lib/motion';
import { AudiencePills } from './AudiencePills';
import { HeroShapeCluster } from './HeroShapeCluster';
import styles from './Hero.module.css';

// Served from /public — referenced by URL, not imported.
const chefImg = '/assets/images/chef.png';

export function Hero() {
  return (
    <section className={`${styles.hero} texture`} id="top">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* ---- Left column ---- */}
          <motion.div
            className={styles.copy}
            initial={QA ? 'visible' : 'hidden'}
            animate="visible"
            variants={staggerParent(0.12, 0.15)}
          >
            <motion.p className={styles.badge} variants={staggerChild}>
              <span aria-hidden="true">🌍</span> A Home For Ambitious Africans In Tech
            </motion.p>

            <motion.h1 className={styles.heading} variants={staggerChild}>
              You were never
              <br />
              meant to do this
              <br />
              alone.
            </motion.h1>

            <motion.p className={styles.body} variants={staggerChild}>
              Newbii is where people all across Africa learn tech, find mentors who actually get it,
              and chase real opportunities with a whole community in their corner. Pull up a chair.
              We saved you one.
            </motion.p>

            <motion.div className={styles.ctas} variants={staggerChild}>
              <Button href="#banner" variant="light">
                Join us
              </Button>
              <Button href="#backstory" variant="ghost">
                Explore Community
              </Button>
            </motion.div>
          </motion.div>

          {/* ---- Right column ---- */}
          <div className={styles.media}>
            <AudiencePills />

            <motion.div
              className={styles.card}
              initial={qaInitial({ opacity: 0, scale: 0.97 })}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.2 }}
            >
              <img
                src={chefImg}
                alt="A chef standing confidently in a commercial kitchen, with career labels reading Chef transitioning to DevOps Engineer."
                width={760}
                height={980}
              />
            </motion.div>

            <HeroShapeCluster />
          </div>
        </div>
      </div>
    </section>
  );
}

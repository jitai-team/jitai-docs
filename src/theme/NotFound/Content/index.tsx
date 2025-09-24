import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/NotFound/Content';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx(styles.container, className)}>
      <div className={styles.content}>
        <div className={styles.errorContainer}>
          <Heading as="h2" className={styles.errorMessage}>
            <Translate
              id="theme.NotFound.message"
              description="The main message of the 404 page">
              Uh oh. That page doesn't exist
            </Translate>
          </Heading>
          <p className={styles.errorDescription}>
            <Translate
              id="theme.NotFound.description"
              description="The description of the 404 page">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Translate>
          </p>
          <a 
            className={styles.homeLink}
            href="https://jit.pro"
          >
            <Translate
              id="theme.NotFound.button"
              description="The button text for going back home">
              Go back home
            </Translate>
          </a>
        </div>
      </div>
    </main>
  );
}

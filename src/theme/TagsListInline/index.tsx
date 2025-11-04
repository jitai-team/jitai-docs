import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export interface Props {
  readonly tags: readonly {
    readonly label: string;
    readonly permalink: string;
  }[];
}

export default function TagsListInline({ tags }: Props): React.JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh';
  const tagsTitle = isZh ? '标签：' : 'Tags: ';

  return (
    <>
      <span className={styles.tagsTitle}>{tagsTitle}</span>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag.permalink} className={styles.tag}>
            <span className={styles.tagLabel}>{tag.label}</span>
          </li>
        ))}
      </ul>
    </>
  );
}


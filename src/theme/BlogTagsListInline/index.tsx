import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export interface Props {
  readonly tags: readonly {
    readonly label: string;
    readonly permalink: string;
  }[];
}

export default function BlogTagsListInline({ tags }: Props): React.JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh';
  const tagsTitle = isZh ? '标签：' : 'Tags: ';

  if (tags.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.tagsContainer}>
      <span className={styles.tagsTitle}>{tagsTitle}</span>
      <div className={styles.tagsWrapper}>
        {tags.map((tag) => (
          <span key={tag.permalink} className={styles.tag}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}


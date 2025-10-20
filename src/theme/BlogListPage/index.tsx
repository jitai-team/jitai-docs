import React from 'react';
import type {Props} from '@theme/BlogListPage';
import BlogListPaginator from '@theme/BlogListPaginator';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import PageLayout from '../../components/PageLayout';
import styles from './styles.module.css';

// 采用首页的设计语言：容器、卡片、按钮等变量来自全局 CSS 变量

export default function BlogListPage(props: Props): React.JSX.Element {
  const {metadata, items} = props;
  const title = 'JitAI Blog';
  const description = 'Stay updated with the latest insights, tutorials, and announcements from the JitAI team';

  return (
    <PageLayout 
      title={title} 
      description={description}
      containerClassName={styles.container}
    >
      <header className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Blog</h1>
        {description && (
          <p className={styles.pageSubtitle}>{description}</p>
        )}
      </header>

      <section className={clsx(styles.sectionContent)}>
        <div className={clsx(styles.gridContainer, styles.gridAutoFit)}>
          {items.map(({content: BlogPost}) => {
            const {frontMatter, metadata: postMeta} = BlogPost;
            const {title: postTitle, description: postExcerpt, authors, tags, image} = frontMatter as any;
            const {permalink, date, formattedDate, readingTime} = postMeta as any;

            return (
              <article key={permalink} className={clsx(styles.baseCard, styles.blogCard)}>
                {image && (
                  <Link to={permalink} className={styles.cardImage}>
                    <img src={image} alt={postTitle} />
                  </Link>
                )}

                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.postDate}>{formattedDate ?? date}</span>
                    </div>
                    {readingTime && (
                      <div className={styles.metaItem}>
                        <span className={styles.readTime}>{Math.ceil(readingTime)} min</span>
                      </div>
                    )}
                  </div>

                  <h2 className={styles.cardTitle}>
                    <Link to={permalink}>{postTitle}</Link>
                  </h2>
                  {postExcerpt && (
                    <p className={styles.cardExcerpt}>{postExcerpt}</p>
                  )}

                  <div className={styles.cardFooter}>
                    <div className={styles.authorInfo}>
                      {authors && Array.isArray(authors) && authors.length ? (
                        <span className={styles.authorName}>
                          {authors.map((a:any)=>a.name).filter(Boolean).join(', ')}
                        </span>
                      ) : null}
                    </div>
                    {tags && Array.isArray(tags) && tags.length ? (
                      <div className={styles.tagsContainer}>
                        {tags.slice(0,2).map((t:any)=> (
                          <span key={t.label} className={styles.tag}>{t.label}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <Link className={styles.readMoreButton} to={permalink}>
                    Read more
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className={styles.paginatorWrapper}>
        <BlogListPaginator metadata={metadata} />
      </div>
    </PageLayout>
  );
}



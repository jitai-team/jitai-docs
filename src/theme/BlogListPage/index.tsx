import React from 'react';
import type {Props} from '@theme/BlogListPage';
import BlogListPaginator from '@theme/BlogListPaginator';
import Link from '@docusaurus/Link';
import PageLayout from '../../components/PageLayout';
import styles from './styles.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

// 相对时间格式化函数
function formatRelativeTime(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = [
    { label: locale === 'zh' ? '年' : 'year', seconds: 31536000 },
    { label: locale === 'zh' ? '个月' : 'month', seconds: 2592000 },
    { label: locale === 'zh' ? '周' : 'week', seconds: 604800 },
    { label: locale === 'zh' ? '天' : 'day', seconds: 86400 },
    { label: locale === 'zh' ? '小时' : 'hour', seconds: 3600 },
    { label: locale === 'zh' ? '分钟' : 'minute', seconds: 60 },
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      if (locale === 'zh') {
        return `${count}${interval.label}前`;
      } else {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
  }
  
  return locale === 'zh' ? '刚刚' : 'just now';
}

export default function BlogListPage(props: Props): React.JSX.Element {
  const {metadata, items} = props;
  
  // 检测当前语言
  const currentLocale = typeof window !== 'undefined' 
    ? window.location.pathname.startsWith('/zh') ? 'zh' : 'en'
    : 'en';
  
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;
  
  const title = CONTENT.title;
  const description = CONTENT.description;

  return (
    <PageLayout
      title={title}
      description={description}
      containerClassName={styles.container}
    >
      {/* 英雄区域 */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{CONTENT.heroTitle}</h1>
            <p className={styles.heroDescription}>
              {CONTENT.heroDescription}
            </p>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.105 20 20 19.105 20 18V6C20 4.895 19.105 4 18 4H6C4.895 4 4 4.895 4 6V18C4 19.105 4.895 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>


      {/* 博客文章网格 */}
      <section className={styles.blogGridSection}>
        <div className={styles.blogGrid}>
              {items.map(({content: BlogPost}) => {
                const {frontMatter, metadata: postMeta} = BlogPost;
                const {title: postTitle, description: postExcerpt, authors, tags, image} = frontMatter as any;
                const {permalink, date, formattedDate, readingTime} = postMeta as any;

                return (
                  <Link key={permalink} to={permalink} className={styles.blogCardLink}>
                    <article className={styles.blogCard}>
                      <div className={styles.cardContent}>
                        <div className={styles.cardText}>
                          <h2 className={styles.cardTitle}>
                            {postTitle}
                          </h2>
                          <p className={styles.cardExcerpt}>
                            {postExcerpt || CONTENT.noDescriptionAvailable}
                          </p>
                          <div className={styles.cardMeta}>
                            <span className={styles.postDate}>
                              {formatRelativeTime(date, currentLocale)}
                            </span>
                          </div>
                        </div>
                        <div className={styles.cardImage}>
                          {image ? (
                            <img src={image} alt={postTitle} />
                          ) : (
                            <div className={styles.imagePlaceholder}>
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.105 20 20 19.105 20 18V6C20 4.895 19.105 4 18 4H6C4.895 4 4 4.895 4 6V18C4 19.105 4.895 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
        </div>
      </section>

      {/* 分页 */}
      <div className={styles.paginatorWrapper}>
        <BlogListPaginator metadata={metadata} />
      </div>

      {/* 订阅区域 */}
      <section className={styles.subscriptionSection} style={{ display: 'none' }}>
        <div className={styles.subscriptionContent}>
          <div className={styles.subscriptionText}>
            <h2 className={styles.subscriptionTitle}>{CONTENT.subscriptionTitle}</h2>
            <p className={styles.subscriptionDescription}>
              {CONTENT.subscriptionDescription}
            </p>
          </div>
          <div className={styles.subscriptionForm}>
            <input
              type="email"
              placeholder={CONTENT.subscriptionEmailPlaceholder}
              className={styles.emailInput}
            />
            <button className={styles.subscribeButton}>{CONTENT.subscriptionButton}</button>
            <div className={styles.successMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{CONTENT.subscriptionSuccessMessage}</span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import AnimatedSection from '../AnimatedSection';

const CONTENT = {
  devops: {
    color: '#f59e0b', // 添加统一的主题颜色
    title: 'Jit DevOps工具',
    subtitle: '构建、发布、部署、运维全面简化轻量化',
    features: [
      {
        title: '支持应用多环境、多版本',
        description: '应用可区分开发、测试、生产等多个环境，不同环境使用不同版本，环境隔离，提高系统稳定性。',
        image: '/img/devops/multi-env-placeholder.svg',
        imageAlt: '多环境多版本管理'
      },
      {
        title: '多种应用分发方式',
        description: '线上分发，可直接上传、下载；线下分发，可导出、导入代码包。',
        image: '/img/devops/distribution-placeholder.svg',
        imageAlt: '应用分发方式'
      },
      {
        title: '物理环境虚拟化',
        description: '隔离物理服务器环境，一套应用程序的部署和更新可以直接无感同步到部署的任意节点',
        image: '/img/devops/virtualization-placeholder.svg',
        imageAlt: '环境虚拟化'
      },
      {
        title: '可视化配置分布式集群',
        description: '简单配置，即可7*24小时轻松保障百万级用户规模的平台稳定运行。',
        image: '/img/devops/cluster-placeholder.svg',
        imageAlt: '分布式集群配置'
      }
    ]
  }
};

const DevOpsSection: React.FC = () => {
  return (
    <AnimatedSection animationType="fadeInUp" duration={500}>
      <section
        id="devops-section"
        className={`${styles.devopsSection} ${globalStyles.gradientBackground}`}
        style={{
          '--section-color': CONTENT.devops.color,
          '--card-color': CONTENT.devops.color,
          '--card-hover-color': CONTENT.devops.color
        } as React.CSSProperties}
      >
        <div className={globalStyles.sectionContent}>
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <h2 className={globalStyles.sectionTitle}>{CONTENT.devops.title}</h2>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay={200}>
            <p className={styles.sectionSubtitle}>
              {CONTENT.devops.subtitle}
            </p>
          </AnimatedSection>

          <div className={styles.featuresContainer}>
            {CONTENT.devops.features.map((feature, index) => (
              <AnimatedSection
                key={index}
                animationType={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
                delay={300 + index * 100}
                duration={500}
              >
                <div className={`${styles.featureRow} ${index % 2 === 0 ? styles.featureRowLeft : styles.featureRowRight}`}>
                  <div className={styles.featureImage}>
                    <img
                      src={feature.image}
                      alt={feature.imageAlt}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className={styles.fallbackIcon} style={{ display: 'none' }}>
                      📊
                    </div>
                  </div>
                  <div className={styles.featureContent}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default DevOpsSection;
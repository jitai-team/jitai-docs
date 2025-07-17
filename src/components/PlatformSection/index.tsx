import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import AnimatedSection from '../AnimatedSection';

const CONTENT = {
  platform: {
    title: 'Jit 应用平台',
    subtitle: '全面支持 JAAP 协议，支持应用模块智能化即时识别和调用、图形化即时编排和构建',
    features: [
      {
        icon: '🏢',
        title: '私有化',
        description: '企业级私有化部署，数据安全可控，支持内网环境部署',
        image: '/img/platform/private-deployment.svg'
      },
      {
        icon: '⚡',
        title: '自动加载/部署',
        description: '应用自动发现、加载和部署机制，无需手动配置',
        image: '/img/platform/auto-deploy.svg'
      },
      {
        icon: '🐳',
        title: '容器化虚拟机',
        description: '基于容器技术的轻量级虚拟化环境，资源隔离，高效运行',
        image: '/img/platform/container-vm.svg'
      },
      {
        icon: '🛡️',
        title: '沙盒化运行环境',
        description: '安全的沙盒化应用运行环境，防止恶意代码执行',
        image: '/img/platform/sandbox.svg'
      },
      {
        icon: '📱',
        title: '应用管理',
        description: '统一的应用生命周期管理，包括开发、测试、发布、监控',
        image: '/img/platform/app-management.svg'
      },
      {
        icon: '🔄',
        title: '跨平台',
        description: '支持 Windows、Linux、macOS 等多平台部署和运行',
        image: '/img/platform/cross-platform.svg'
      },
      {
        icon: '💻',
        title: '全栈跨端',
        description: '前后端一体化开发，支持 Web、移动端、桌面端多端部署',
        image: '/img/platform/full-stack.svg'
      },
      {
        icon: '⚖️',
        title: '分布式/负载均衡',
        description: '分布式架构设计，支持水平扩展和智能负载均衡',
        image: '/img/platform/distributed.svg'
      }
    ]
  }
};

const PlatformSection: React.FC = () => {
  return (
    <AnimatedSection animationType="fadeInUp" duration={500}>
      <section id="section-platform" className={`${styles.platformSection} ${globalStyles.gradientBackground}`}>
        <div className={globalStyles.sectionContent}>
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <h2 className={globalStyles.sectionTitle}>{CONTENT.platform.title}</h2>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay={200}>
            <p className={styles.sectionSubtitle}>
              {CONTENT.platform.subtitle}
            </p>
          </AnimatedSection>
          <div className={styles.featuresGrid}>
            {CONTENT.platform.features.map((feature, index) => (
              <AnimatedSection
                key={index}
                animationType="scaleIn"
                delay={300 + index * 60}
                duration={400}
              >
                <div className={`${globalStyles.baseCard} ${styles.featureCard} animatedChild`}>
                  <div className={styles.featureImage}>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      onError={(e) => {
                        // 如果图片加载失败，显示默认图标
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                    <div className={styles.fallbackIcon} style={{ display: 'none' }}>
                      {feature.icon}
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

export default PlatformSection;
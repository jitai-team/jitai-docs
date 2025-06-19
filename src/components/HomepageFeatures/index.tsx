import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '解释型系统',
    Svg: require('@site/static/img/jitai_interpretive_system.svg').default,
    description: (
      <>
        JAAP(Jit AI Application Protocol)，让应用系统成为可被AI动态感知、
        动态调用、动态编排的解释型系统，将传统应用生态带入AI驱动和AI编排时代。
      </>
    ),
  },
  {
    title: '矩阵型元架构',
    Svg: require('@site/static/img/jitai_matrix_architecture.svg').default,
    description: (
      <>
        元素族类、元素分层、应用继承机制共同构成矩阵型元架构，提供无与伦比的复用和扩展能力，
        是通用统一的架构"语言"，让复杂度和工程量降低90%。
      </>
    ),
  },
  {
    title: '图形化编排开发',
    Svg: require('@site/static/img/jitai_visual_development.svg').default,
    description: (
      <>
        支持图形化编排和编程的开发工具和开发方式，使开发速度提升10倍，
        让开发者从容应对AI应用的复杂多变。
      </>
    ),
  },
  {
    title: '自动化运维',
    Svg: require('@site/static/img/jitai_automated_ops.svg').default,
    description: (
      <>
        自动化的DevOps工具，让AI应用的构建、发布、部署和运维简单化、轻量化，
        大幅降低运维成本和复杂度。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

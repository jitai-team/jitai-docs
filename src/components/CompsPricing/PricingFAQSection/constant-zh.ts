// 常见问题配置
export interface FAQ {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQ[] = [
  {
    question: '一个许可证可以同时在多台服务器上使用吗？',
    answer: '每个许可证同一时刻只能绑定一个终端上的一个运行环境。如需在多台服务器部署，需要购买相应数量的许可证。'
  },
  {
    question: '一个许可证可以从一个终端上迁移到另一个终端吗？',
    answer: '可以。需要连同 JitNode 节点数据目录一起迁移。'
  },
  {
    question: '限制用户数、表容量、附件容量？',
    answer: '所有许可证均不限制用户数、表容量、附件容量，都是部署在自己的服务器上，数据存储在自己的数据库中。'
  },
  {
    question: '开发者团队计入组织数吗？',
    answer: '开发者团队不计入组织数。规格中的组织数，是指应用中的组织数，跟开发者团队没有必然关系。'
  },
  {
    question: '外部联系人怎么收费？',
    answer: '可以创建一个组织，管理外部联系人。从而计入组织数，受许可证类型限制。'
  },
  {
    question: '可以随时升级许可证规格吗？',
    answer: '支持，升级后，立即解绑旧许可证，旧许可证仍然可用于其他节点。'
  },
  {
    question: '可以随时降级许可证规格吗？',
    answer: '暂时不支持。'
  }
];

const CONTENT = {
  faqData: FAQ_DATA,
  title: '常见问题',
};

export default CONTENT;
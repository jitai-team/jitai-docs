// FAQ configuration
export interface FAQ {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQ[] = [
  {
    question: 'Can one license be used on multiple servers simultaneously?',
    answer: 'Each license can only be bound to one runtime environment on one terminal at the same time. If you need to deploy on multiple servers, you need to purchase the corresponding number of licenses.'
  },
  {
    question: 'Can a license be migrated from one terminal to another?',
    answer: 'Yes.'
  },
  {
    question: 'Are there limitations on user count, table capacity, or attachment capacity?',
    answer: 'All licenses do not limit user count, table capacity, or attachment capacity. They are all deployed on your own servers with data stored in your own databases.'
  },
  {
    question: 'Do developer team count towards the organization limit?',
    answer: 'Developer team do not count towards the organization limit. The organization count in specifications refers to organizations within applications and has no necessary relationship with developer team.'
  },
  {
    question: 'How are external contacts charged?',
    answer: 'You can create an organization to manage external contacts, which will count towards the organization limit and be subject to license type restrictions.'
  },
  {
    question: 'Can license specifications be upgraded at any time?',
    answer: 'Not currently supported.'
  }
];

const CONTENT = {
  faqData: FAQ_DATA,
  title: 'Frequently Asked Questions',
};

export default CONTENT;
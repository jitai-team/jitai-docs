const RULES: string[] = [
  'For each successful referral, the inviter\'s desktop node app limit increases by 1 (based on the node used when making the referral)',
  'The additional app slots are bound to the inviter\'s desktop node. Each desktop node can receive up to 10 additional app slots',
  'A successful referral must meet all of the following conditions: new user registration, creation of a new developer team, and successful app creation',
  'Each new developer team can only be referred once',
  'After a successful referral, the inviter will receive a notification in the node console, and the reward will take effect immediately (maximum delay of 5 minutes)',
  'Only Desktop Basic and Desktop Standard nodes are eligible to participate in this program',
  'JitAI reserves the right to final interpretation of this program'
];

const CONTENT = {
  title: 'Referral Rules',
  subtitle: '',
  rules: RULES,
};

export default CONTENT;


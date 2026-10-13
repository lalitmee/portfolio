export interface CaseStudy {
  slug: string;
  title: string;
  employer: string;
  period: string;
  summary: string;
  context: string;
  contribution: string[];
  decisions: string[];
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nykaa-cart-reliability',
    title: 'Making cart behavior more reliable',
    employer: 'Nykaa',
    period: 'Feb 2024–Present',
    summary: 'Product variants and cart flows for Nykaa’s web experience.',
    context:
      'The storefront needed dependable cart behavior across product variants and shopping sessions.',
    contribution: [
      'Developed a product variants drawer and refactored its surrounding code for maintainability.',
      'Built cart merging to consolidate multiple sessions.',
      'Updated cart operations to handle archived products.',
    ],
    decisions: [
      'Handled archived products explicitly in cart operations rather than assuming every cart item remained active.',
    ],
    outcome:
      'Added a product variants drawer, cart merging, and archived-product handling to the storefront.',
  },
  {
    slug: 'nykaa-measurement-attribution',
    title: 'Connecting marketing events to order attribution',
    employer: 'Nykaa',
    period: 'Feb 2024–Present',
    summary:
      'Marketing platform integrations and an order-source attribution workflow.',
    context:
      'Marketing activity needed consistent event flow and a way to examine order sources across channels.',
    contribution: [
      'Integrated GTM, GA4, Meta, Snapchat, TikTok, and MoEngage.',
      'Resolved data-flow issues across the marketing technology stack.',
      'Designed an attribution system using BigQuery and Looker Studio.',
    ],
    decisions: [
      'Used BigQuery and Looker Studio for the attribution workflow.',
    ],
    outcome:
      'Connected marketing platform integrations with an order-source attribution workflow.',
  },
  {
    slug: 'quartic-data-interfaces',
    title: 'Building interfaces for complex data',
    employer: 'Quartic.ai',
    period: 'Apr 2023–Dec 2023',
    summary:
      'Administration and analytics interfaces for the Quartic platform.',
    context:
      'The platform needed administration tools for LDAP users and an analytics interface for querying product data.',
    contribution: [
      'Integrated LDAP administration into the platform.',
      'Built an infinite virtualized user table with sorting and shift-select behavior.',
      'Revamped the Analytics module using React Hooks, Context API, and GraphQL.',
    ],
    decisions: [
      'Virtualized the user table to support browsing larger user lists without rendering every row at once.',
      'Used the platform’s existing React and GraphQL stack for the Analytics module.',
    ],
    outcome:
      'Shipped administration and analytics features with supporting documentation and test cases.',
  },
];

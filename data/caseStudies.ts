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
    summary:
      'Improving cart operations across session merging and archived-product edge cases.',
    context:
      'Cart behavior needed to handle products that had been archived and carts accumulated across multiple sessions.',
    contribution: [
      'Revamped cart operations logic, including handling archived products.',
      'Built a cart-merging feature to consolidate multiple sessions.',
    ],
    decisions: [
      'Address archived products in the cart flow rather than leaving them as an unresolved edge case.',
      'Treat merging as part of the shopping experience across sessions.',
    ],
    outcome:
      'The updated cart flow improved stability and brought multiple sessions into one shopping experience.',
  },
  {
    slug: 'nykaa-measurement-attribution',
    title: 'Connecting measurement to attribution',
    employer: 'Nykaa',
    period: 'Feb 2024–Present',
    summary:
      'Integrating marketing measurement and building order-source attribution with BigQuery and Looker Studio.',
    context:
      'Marketing integrations needed dependable data flow across platforms, while teams needed a way to understand order sources.',
    contribution: [
      'Integrated GTM, GA4, Meta, Snapchat, TikTok, and MoEngage.',
      'Resolved issues in the marketing technology stack that affected analytics data flow.',
      'Designed an attribution system using BigQuery and Looker Studio to track order sources.',
    ],
    decisions: [
      'Treat integration reliability and attribution as connected parts of the measurement work.',
      'Use BigQuery and Looker Studio for order-source analysis.',
    ],
    outcome:
      'The attribution system gave marketing teams order-source information for their decisions. No order-lift figure is claimed.',
  },
  {
    slug: 'quartic-data-interfaces',
    title: 'Building interfaces for complex data',
    employer: 'Quartic.ai',
    period: 'Apr 2023–Dec 2023',
    summary:
      'Improving user administration and analytics workflows in the Quartic Platform.',
    context:
      'The platform needed administration features for LDAP users and interfaces for querying analytics data.',
    contribution: [
      'Integrated the LDAP server with the Administration module.',
      'Built an infinite virtualized table with sorting and shift-select for LDAP user management.',
      'Revamped the Analytics module using React Hooks, Context API, and GraphQL.',
    ],
    decisions: [
      'Virtualize the user table to support efficient management of larger result sets.',
      'Use React Hooks, Context API, and GraphQL in the Analytics module.',
    ],
    outcome:
      'The work added LDAP administration and analytics workflows to the Quartic Platform, including an efficient user-management table.',
  },
];

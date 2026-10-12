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
    title: 'Making product and cart flows more dependable',
    employer: 'Nykaa',
    period: 'Feb 2024 — Present',
    summary:
      'Worked across product-variant selection, cart merging, and archived product/cart behavior in a large commerce experience.',
    context:
      'Shopping flows need to preserve a customer’s choices as they move between product details, variants, and cart. Inconsistent state can make a familiar journey feel unreliable.',
    contribution: [
      'Built a product-variant drawer and refactored the related product experience.',
      'Implemented cart merging across sessions.',
      'Worked on stability for archived products and their cart behavior.',
    ],
    decisions: [
      'Kept variant selection and cart state aligned across the product-to-cart journey.',
      'Handled archived products as a real state in the shopping flow instead of assuming every item remained available.',
    ],
    outcome:
      'Delivered product and cart improvements focused on preserving customer intent and keeping shopping flows predictable.',
  },
  {
    slug: 'nykaa-measurement-attribution',
    title: 'Connecting campaign signals to commerce outcomes',
    employer: 'Nykaa',
    period: 'Feb 2024 — Present',
    summary:
      'Integrated marketing measurement tools and built attribution reporting with BigQuery and Looker Studio.',
    context:
      'Marketing and product teams need consistent event and attribution data to understand how campaigns relate to commerce activity.',
    contribution: [
      'Worked on integrations spanning Google Tag Manager, Google Analytics 4, Meta, Snapchat, TikTok, and MoEngage.',
      'Designed an attribution system using BigQuery and Looker Studio.',
      'Improved data flow and reliability across the measurement work.',
    ],
    decisions: [
      'Connected campaign instrumentation with reporting rather than treating tags and dashboards as separate tasks.',
      'Kept attribution data available for analysis in BigQuery and Looker Studio.',
    ],
    outcome:
      'Gave the team a joined-up measurement and reporting workflow. No order-lift figure is claimed because the available source does not establish attribution scope.',
  },
  {
    slug: 'quartic-data-interfaces',
    title: 'Making dense administration data easier to work with',
    employer: 'Quartic.ai',
    period: 'Apr 2023 — Dec 2023',
    summary:
      'Built React and GraphQL platform features, including an LDAP administration integration and a virtualized user table.',
    context:
      'Administrative interfaces bring large datasets and operational controls together. They need to stay useful as the amount of data and the number of interactions grow.',
    contribution: [
      'Integrated an LDAP server with the administration module and added supporting tests and documentation.',
      'Built an infinite virtualized table with sorting and shift-selection interactions.',
      'Updated analytics flows using React hooks, context, and GraphQL.',
    ],
    decisions: [
      'Used virtualization to keep a large table practical to navigate.',
      'Made selection and sorting behaviors explicit so dense data remained operable.',
    ],
    outcome:
      'Delivered end-to-end administration and analytics features across the React, Redux, and GraphQL platform.',
  },
];

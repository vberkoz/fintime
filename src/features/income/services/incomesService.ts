import { faker } from '@faker-js/faker';

// Define the category types explicitly
type CategoryType = 
  | 'Retail Sales'
  | 'E-commerce'
  | 'Services'
  | 'Investments'
  | 'Partnerships'
  | 'Freelance'
  | 'Consulting';

export type IncomeSource = {
  id: string;
  name: string;
  amount: number;
  category: CategoryType;
  date: string;
  notes: string;
};

export function makeEventData(numEntries: number = 5): any {
  const categories: CategoryType[] = [
    'Retail Sales',
    'E-commerce',
    'Services',
    'Investments',
    'Partnerships',
    'Freelance',
    'Consulting'
  ];

  // Predefined names mapped to categories
  const categoryNames: { [key in CategoryType]: string[] } = {
    'Retail Sales': [
      'In-store Sales',
      'POS Revenue',
      'Walk-in Customers',
      'Retail Inventory Sales',
      'Physical Store Revenue'
    ],
    'E-commerce': [
      'Online Store Sales',
      'Website Orders',
      'Digital Marketplace',
      'Subscription Revenue',
      'App-Based Sales'
    ],
    'Services': [
      'Consulting Fees',
      'Service Contracts',
      'Maintenance Revenue',
      'Contract Labor',
      'Support Services'
    ],
    'Investments': [
      'Stock Dividends',
      'Real Estate Income',
      'Portfolio Returns',
      'Cryptocurrency Gains',
      'Venture Capital'
    ],
    'Partnerships': [
      'Revenue Share',
      'Joint Venture Profits',
      'Affiliate Commissions',
      'Co-Branded Sales',
      'Strategic Alliances'
    ],
    'Freelance': [
      'Freelance Project Payments',
      'Contract Work',
      'Client Retainer',
      'Gig Economy Income',
      'Remote Consulting'
    ],
    'Consulting': [
      'Business Strategy Fees',
      'IT Consulting Revenue',
      'Legal Consultancy',
      'Marketing Services',
      'HR Consulting'
    ]
  };

  const generateEventEntry = (index: number): IncomeSource => {
    const category = faker.helpers.arrayElement(categories);
    const names = categoryNames[category];
    const name = faker.helpers.arrayElement(names);

    return {
      id: `income_${(index + 1).toString().padStart(3, '0')}`,
      name: name,
      amount: parseFloat(faker.finance.amount({ 
        min: 100, 
        max: 5000
      })),
      category: category,
      date: faker.date.between({ 
        from: '2023-01-01', 
        to: '2023-12-31' 
      }).toISOString().split('T')[0],
      notes: faker.lorem.sentence()
    };
  };

  const incomeSources = Array.from({ length: numEntries }, (_, i) => generateEventEntry(i));

  return incomeSources;
}
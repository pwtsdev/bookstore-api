export const EXISTING_ORDER_FIXTURE = {
  id: 1,
  status: 'ABANDONED',
  items: [
    {
      id: 1,
      book: {
        id: 1,
        title: 'Effective Java',
        year: 2008,
        price: 107.28,
        coverId: 1,
        available: 100,
        authors: [{ id: 1, firstName: 'Joshua', lastName: 'Bloch' }],
      },
      quantity: 5,
    },
    {
      id: 2,
      book: {
        id: 2,
        title: 'Java Puzzlers',
        year: 2005,
        price: 80.1,
        coverId: 2,
        available: 100,
        authors: [
          { id: 2, firstName: 'Neal', lastName: 'Gafter' },
          { id: 1, firstName: 'Joshua', lastName: 'Bloch' },
        ],
      },
      quantity: 5,
    },
  ],
  recipient: {
    id: 1,
    name: 'Jan Kowalski',
    phone: '745222111',
    street: 'Sezamkowa 10',
    city: 'Krakow',
    zipCode: '30-004',
    email: 'janekkowalski@testmail.pl',
  },
};

jest.mock('@vitalets/google-translate-api', () => ({
  translate: jest.fn((text, {from, to}) => ({ text: `${text} translated from ${from} to ${to}` })),
}));
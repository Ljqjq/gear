// Basic Jest setup without Expo dependencies
global.console = {
  ...console,
  // Uncomment to ignore specific log levels during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Mock React Native modules
jest.mock('react-native', () => ({
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  TouchableOpacity: 'TouchableOpacity',
  View: 'View',
  Text: 'Text',
  ScrollView: 'ScrollView',
  TextInput: 'TextInput',
  Alert: {
    alert: jest.fn(),
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
})); 
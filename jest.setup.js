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
    flatten: jest.fn((styles) => styles),
  },
  TouchableOpacity: 'TouchableOpacity',
  View: 'View',
  Text: 'Text',
  ScrollView: 'ScrollView',
  TextInput: 'TextInput',
  Modal: 'Modal',
  Alert: {
    alert: jest.fn(),
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
}));

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  return (props) => React.createElement('DateTimePicker', props);
});

// Custom hooks
jest.mock('@/shared/hooks/useColorScheme', () => ({
  useColorScheme: () => 'light',
}));
jest.mock('@/shared/hooks/useThemeColor', () => ({
  useThemeColor: () => '#000',
}));
// Add more custom hook mocks here as you add them to your codebase

// Optionally, mock asset imports (images, etc.)
// jest.mock('react-native/Libraries/Image/Image', () => 'Image');

// Optionally, mock navigation if you use react-navigation
// jest.mock('@react-navigation/native', () => ({
//   useNavigation: () => ({ navigate: jest.fn() }),
//   ... // add more as needed
// })); 
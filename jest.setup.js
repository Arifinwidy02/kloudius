import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-easy-toast', () => 'Toast');

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({ children }: any) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/stack', () => {
  const React = require('react');
  return {
    createStackNavigator: () => {
      const Screen = ({ children }: any) => children ?? null;
      const Navigator = ({ children }: any) => children ?? null;
      return { Screen, Navigator };
    },
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('react-native-paper/src/components/MaterialCommunityIcon', () => () => null);
jest.mock('react-native-paper/src/components/MaterialCommunityIcon.tsx', () => () => null);
jest.mock('react-native-paper/lib/commonjs/components/MaterialCommunityIcon', () => () => null);
jest.mock('react-native-paper/lib/module/components/MaterialCommunityIcon', () => () => null);

jest.mock('react-native-encrypted-storage', () => {
  let store: Record<string, string> = {};
  return {
    setItem: jest.fn(async (key: string, value: string) => {
      store[key] = value;
    }),
    getItem: jest.fn(async (key: string) => {
      return store[key] ?? null;
    }),
    removeItem: jest.fn(async (key: string) => {
      delete store[key];
    }),
    clear: jest.fn(async () => {
      store = {};
    }),
  };
});


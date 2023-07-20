import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
import '@react-navigation/stack';
import 'react-native-svg';
import {StatusBar} from 'react-native';

// Mocking react-navigation
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-navigation/stack', () => {
  const createStackNavigator = jest.fn(() => ({
    Screen: jest.fn(),
    Navigator: jest.fn(),
  }));
  return {
    createStackNavigator,
  };
});

// Mocking setBarStyle method of RNStatusBar
jest.spyOn(StatusBar, 'setBarStyle').mockImplementation(() => jest.fn());

// Mocking react-native-modal
jest.mock('react-native-modal', () => {
  const Modal = 'Modal';
  return {Modal};
});

// Mocking react-native-calendars
jest.mock('react-native-calendars', () => {
  const Calendar = 'Calendar';
  return {Calendar};
});

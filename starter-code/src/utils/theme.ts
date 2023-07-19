import {ColorValue} from 'react-native';

export const convertToRgba = (color: ColorValue, opacity = 0.9): string => {
  if (typeof color === 'string' && color.startsWith('#')) {
    const hexColor = color.slice(1);
    const [red, green, blue] = [0, 2, 4].map(startIndex =>
      parseInt(hexColor.substr(startIndex, 2), 16),
    );
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }
  return String(color);
};

import React from 'react';
import renderer, {ReactTestRendererJSON} from 'react-test-renderer';
import {describe, expect, test} from '@jest/globals';
import {TestProvider} from '../components/TestProvider';
import {Text, textVariantStyles, View} from '../components/theme';
import {TextVariants} from '../types/theme';
import {convertToRgba} from '../utils/theme';

describe('Text Component', () => {
  const text = 'Hello, World!';
  const component = renderer.create(
    <TestProvider>
      <Text variant={TextVariants.H1} color={'green'} center>
        {text}
      </Text>
    </TestProvider>,
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  const expectedVariantStyle = tree.props.style[0];
  const expectedPropStyle = tree.props.style[1];

  test('renders with correct text', () => {
    expect(tree).toMatchSnapshot();
    expect(tree.children).toEqual([text]);
  });

  test('renders with correct styles', () => {
    expect(expectedVariantStyle).toEqual(textVariantStyles.h1);
    expect(expectedPropStyle.color).toEqual('green');
    expect(expectedPropStyle.textAlign).toEqual('center');
  });
});

describe('View Component', () => {
  const text = 'Hello, World!';
  const component = renderer.create(
    <TestProvider>
      <View
        onPress={() => console.info('hi')}
        center
        flex
        style={{position: 'absolute'}}>
        <Text>{text}</Text>
        <View />
      </View>
    </TestProvider>,
  );
  const tree = component.toJSON() as ReactTestRendererJSON;

  test('renders with correct styles', () => {
    expect(tree.type).toEqual('View');
    expect(tree.props.style.justifyContent).toEqual('center');
    expect(tree.props.style?.alignItems).toEqual('center');
    expect(tree.props.style?.position).toEqual('absolute');
  });
});

describe('convertToRgba', () => {
  test('should convert a hex color to rgba format with 90% transparency', () => {
    expect(convertToRgba('#FF0000')).toBe('rgba(255, 0, 0, 0.9)');
    expect(convertToRgba('#00FF00')).toBe('rgba(0, 255, 0, 0.9)');
    expect(convertToRgba('#0000FF')).toBe('rgba(0, 0, 255, 0.9)');
  });

  test('should return the original color if it is not a valid hex color', () => {
    expect(convertToRgba('red')).toBe('red');

    // @ts-ignore
    expect(convertToRgba(123)).toBe('123');
    // @ts-ignore
    expect(convertToRgba(null)).toBe('null');
    // @ts-ignore
    expect(convertToRgba(undefined)).toBe('undefined');
  });
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import {playlist, PlaylistType} from './src/constants/playlist';
import {ChevronLeft} from './src/icons/ChevronLeft';
import {EllipsisHorizontal} from './src/icons/EllipsisHorizontal';
import {EllipsisVertical} from './src/icons/EllipsisVertical';

const formatter = Intl.NumberFormat('en-IN');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const posterSize = Dimensions.get('screen').height / 2;

type AnimationProps = {
  sv: SharedValue<number>;
};

const ScreenHeader: React.FC<AnimationProps> = ({sv}) => {
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sv.value, [posterSize / 6, posterSize], [0, 1]),
    };
  });
  return (
    <Animated.View
      style={[
        tailwind.style('px-4 flex flex-row items-start justify-between'),
        opacityAnim,
      ]}>
      <ChevronLeft />
      <Animated.Text style={tailwind.style('text-xl text-white font-medium')}>
        John Krasinski
      </Animated.Text>
      <EllipsisVertical />
    </Animated.View>
  );
};

const PosterImage: React.FC<AnimationProps> = ({sv}) => {
  const inset = useSafeAreaInsets();
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sv.value, [0, posterSize], [1, 0]),
    };
  });
  const textAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [-posterSize / 8, 0, posterSize / 8],
        [0, 1, 0],
      ),
      transform: [
        {
          scale: interpolate(
            sv.value,
            [-posterSize / 8, 0, posterSize / 8],
            [1.1, 1, 0.95],
            'clamp',
          ),
        },
        {translateY: inset.top},
      ],
    };
  });
  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(sv.value, [-50, 0], [1.3, 1], {
            extrapolateLeft: 'extend',
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.imageContainer, opacityAnim]}>
      <Animated.Image
        style={[styles.imageStyle, scaleAnim]}
        source={require('./src/assets/poster-unsplash.jpg')}
      />
      <Animated.View
        style={[
          tailwind.style(
            'absolute bottom-0 top-0 left-0 right-0 justify-end items-center z-10',
          ),
          textAnim,
        ]}>
        <Animated.Text
          style={tailwind.style('text-6xl font-bold text-white text-center')}>
          John Krasinski
        </Animated.Text>
      </Animated.View>
      <AnimatedLinearGradient
        style={[tailwind.style('absolute inset-0'), scaleAnim]}
        colors={[
          `rgba(0,0,0,${0})`,
          `rgba(0,0,0,${0.1})`,
          `rgba(0,0,0,${0.3})`,
          `rgba(0,0,0,${0.5})`,
          `rgba(0,0,0,${0.8})`,
          `rgba(0,0,0,${1})`,
        ]}
      />
    </Animated.View>
  );
};

const SpotifyScreen = () => {
  const inset = useSafeAreaInsets();
  const sv = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      sv.value = event.contentOffset.y;
    },
  });

  const initialTranslateValue = posterSize;

  const animatedScrollStyle = useAnimatedStyle(() => {
    return {
      paddingTop: initialTranslateValue - 22,
    };
  });

  const layoutY = useSharedValue(0);

  const stickyElement = useAnimatedStyle(() => {
    const stickyElementBg = interpolateColor(
      sv.value,
      [layoutY.value, layoutY.value + 1],
      ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
    ) as unknown as string;
    return {
      backgroundColor: stickyElementBg,
      transform: [
        {
          translateY: interpolate(
            sv.value,
            [layoutY.value - 1, layoutY.value, layoutY.value + 1],
            [0, 0, 1],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[tailwind.style('flex-1 bg-black'), {paddingTop: inset.top}]}>
      <ScreenHeader sv={sv} />
      <PosterImage sv={sv} />
      <Animated.View style={tailwind.style('flex-1')}>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={tailwind.style('flex-1')}
          showsVerticalScrollIndicator={false}>
          <Animated.View style={[animatedScrollStyle, tailwind.style('pb-10')]}>
            {/* Button Section */}
            <Animated.View
              onLayout={(event: LayoutChangeEvent) => {
                'worklet';
                layoutY.value = event.nativeEvent.layout.y;
              }}
              style={[
                tailwind.style(
                  'flex items-center justify-center z-10 pb-4 pt-4 shadow-md',
                ),
                stickyElement,
              ]}>
              <Pressable
                style={tailwind.style(
                  'bg-green-500 px-10 py-2 items-center rounded-full',
                )}>
                <Text
                  style={tailwind.style(
                    'text-base font-bold text-white uppercase',
                  )}>
                  Shuffle Play
                </Text>
              </Pressable>
            </Animated.View>
            <Animated.View
              style={tailwind.style('flex items-center justify-center')}>
              <Pressable
                style={tailwind.style('px-10 py-2 items-center rounded-full')}>
                <Text style={tailwind.style('text-base font-bold text-white')}>
                  Popular
                </Text>
              </Pressable>
            </Animated.View>
            {/* Songs List */}
            <View style={tailwind.style('mt-3')}>
              {playlist.map((song: PlaylistType, index: number) => {
                return (
                  <View
                    style={tailwind.style(
                      'flex flex-row items-center justify-between py-2 px-4',
                    )}
                    key={JSON.stringify(song.name + index)}>
                    <View style={tailwind.style('flex flex-row items-center')}>
                      <Text
                        style={tailwind.style(
                          'text-sm font-bold text-white opacity-50 pr-5',
                        )}>
                        {index + 1}
                      </Text>
                      <View>
                        <Text
                          style={tailwind.style(
                            'text-base font-medium text-white',
                          )}>
                          {song.name}
                        </Text>
                        <Text
                          style={tailwind.style(
                            'text-sm text-white opacity-60',
                          )}>
                          {formatter.format(song.plays)}
                        </Text>
                      </View>
                    </View>
                    <EllipsisHorizontal />
                  </View>
                );
              })}
            </View>
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SpotifyScreen />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width,
    position: 'absolute',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});

export default App;

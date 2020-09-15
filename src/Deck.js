import React, { Component, useRef, useState, useEffect   } from 'react';
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

const Deck = ({data, renderCard, renderNoMoreCards, onSwipeLeft = () => {}, onSwipeRight = () => {}}) => {
    const [index, setIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left');
                } else {
                    resetPosition();
                }
            }
        })
    ).current;

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start();
    };

    const forceSwipe = (direction) => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false
        }).start(() => onSwipeComplete(direction));
    };

    const onSwipeComplete = (direction) => {
        const item = data[index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        position.setValue({ x: 0, y: 0 });
        setIndex(prev => prev + 1);
        LayoutAnimation.configureNext({
            duration: 2000,
            update: {
              type: LayoutAnimation.Types.spring,
              springDamping: 0.7,
            },
          });
    };

    const getRotateStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });
        return {
            ...position.getLayout(),
            transform: [{ rotate }],
        }; 
    };

    const getCardStyle = () => {
        return {
            position: 'absolute',
            width: SCREEN_WIDTH
        }; 
    };

    const renderCards = () => {
        if (index >= data.length) {
            return renderNoMoreCards();
        }

        return data.map((item, i) => {
            if (i < index) { 
                return null; 
            }

            if (i === index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[getRotateStyle(), getCardStyle()]}
                        {...panResponder.panHandlers}   
                    >
                        {renderCard(item)}
                    </Animated.View>
                );
            }
            
            return (
                <Animated.View 
                    key={item.id} 
                    style={[getCardStyle(), { top: 10 * (i - index) }]}
                >
                  {renderCard(item)}
                </Animated.View>
            );
        }).reverse();
    };

    return (
        <View>
            {renderCards()}
        </View>
    );
};

export default Deck;
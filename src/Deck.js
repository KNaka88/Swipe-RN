import React, { Component, useRef } from 'react';
import { View, Animated, PanResponder } from 'react-native';

const Deck = props => {
    const position = useRef(new Animated.ValueXY()).current;
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: () => {}
        })
    ).current;

    const renderCards = () => props.data.map(item => {
            return props.renderCard(item);
        });

    return (
        <Animated.View 
            style={position.getLayout()}
            {...panResponder.panHandlers}>
            {renderCards()}
        </Animated.View>
    );
};

export default Deck;
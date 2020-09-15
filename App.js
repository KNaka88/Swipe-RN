import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tesla-model-s-1563301327.jpg?crop=0.631xw:1.00xh;0.324xw,0&resize=640:*' },
  { id: 2, text: 'Card #2', uri: 'https://cdn.cnn.com/cnnnext/dam/assets/191121212606-tesla-cybertruck-super-169.jpg' },
  { id: 3, text: 'Card #3', uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-tesla-model-y-long-range-204-1592938856.jpg?crop=0.510xw:0.575xh;0.184xw,0.250xh&resize=640:*' },
  { id: 4, text: 'Card #4', uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-tesla-model-x-mmp-1-1579127420.jpg?crop=0.827xw:0.985xh;0.0769xw,0&resize=640:*' },
  { id: 5, text: 'Card #5', uri: 'https://i0.wp.com/www.insidehr.com.au/wp-content/uploads/2018/09/Tesla-model-S-P100D-min.jpg?fit=1000%2C500&ssl=1' },
  { id: 6, text: 'Card #6', uri: 'https://s3-prod.autonews.com/s3fs-public/styles/1152x647/public/PHOTOS01_111709999_PH_3_HXJCLDZQSRLG.jpg' },
  { id: 7, text: 'Card #7', uri: 'https://i.insider.com/5c6ec77c26289823337f2d86?width=1200&format=jpeg' },
  { id: 8, text: 'Card #8', uri: 'https://i.ytimg.com/vi/RQ3Vmn6__CI/hqdefault.jpg' },
];

export default function App() {
  const renderCard = ({id, text, uri}) => {
    return (
      <Card
        key={id}
      >
        <Card.Title>
          {text}
        </Card.Title>
        <Card.Image source={{uri}}/>
        <Text style={{ marginBottom: 10}}>I can customize the Card further.</Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>
          All done!
        </Card.Title>
        <Text style={{ marginBottom: 10 }}>
          There's no more content here.
        </Text>
        <Button
          backgroundColor="#03A9F4"
          title="Get more"
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Deck 
        data={DATA}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

import { View, Text, ImageBackground } from "react-native";
import React from "react";

const Movie = ({ movieList }) => {
  // console.log('movieList-=-=>>>', movieList)
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/originals/0b/50/84/0b5084792deea3b967c768f3cbf3c794.jpg",
        }}
        className="flex-1"
        style={{ width: 180, height: 350, }}
      >
        <View className="flex-1 justify-end">
          <Text className="text-2xl text-white font-bold">{movieList?.title}</Text>
          <Text className="text-md text-white font-md">{movieList?.vote_average.toFixed(2)} stars</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Movie;

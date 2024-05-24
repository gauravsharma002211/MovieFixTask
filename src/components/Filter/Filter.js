import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { genreFilter } from "../../constant/filter_const";

const Filter = ({ filterList }) => {
  const { genres } = filterList?.value?.data
  // console.log('genres-=-=-=->>>', genres)

  const renderFilters = ({ item, index }) => {
    return (
      <TouchableOpacity className="p-3 py-2 bg-inActive_genre mx-2 items-center justify-center rounded-lg">
        <Text className="text-white font-SairaSemiBold">{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mt-3">
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id}
        renderItem={renderFilters}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Filter;

import { Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Filter from "../../components/Filter/Filter";
import Movie from "../../components/Movie/Movie";
import Apis from "../../services/apiList";
import { GetServices } from "../../services/commonApiMethod";
import { StatusBar } from "expo-status-bar";
import { SvgXml } from "react-native-svg";
import { Svgs } from "../../assets/svgs";
import { FlashList } from "@shopify/flash-list";

const api = new Apis();
var isFirstTime = true;

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterList, setFilterList] = useState();
  const [movieList, setMovieList] = useState([]);
  const [sortedMovieList, setSortedMovieList] = useState();  
  const [topScroll, setTopScroll] = useState(0);
  const flatListRef = useRef(null);
  const [yearsList, setYearsList] = useState([2012]);
  const [genresId, setGenresId] = useState("");

  useEffect(() => {
    getMoviesAndFiltersData();
  }, []);

  const getMoviesAndFiltersData = () => {
    setIsLoading(true);
    Promise.allSettled([getMoviesList(yearsList[0]), getFiltersList()])
      .then((response) => {
        const temp = {
          id: 0,
          name: "All",
        };
        let updatedList = [...movieList];
        updatedList.push({
          year: yearsList[0],
          movies: response[0]?.value?.data?.results,
        });
        setMovieList(updatedList);
        response[1]?.value?.data?.genres.unshift(temp);

        setFilterList(response[1]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err =======>", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (movieList) {
      setSortedMovieList(movieList);
    }
  }, [movieList]);

  // API CALL FOR FETCHING MOVIES LIST
  async function getMoviesList(year, filterId = "") {
    return new Promise(async (resolve) => {
      const url = `${
        api.movies
      }&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${
        filterId ? (filterId == "0" ? "" : filterId) : genresId
      }`;

      console.log("url", url);
      const response = await GetServices(url);
      resolve(response);
    });
  }

  // API CALL FOR FETCHING FILTERS LIST
  async function getFiltersList() {
    return new Promise(async (resolve) => {
      const url = api.filters;
      const response = await GetServices(url);
      resolve(response);
    });
  }

  async function handleonScroll(event) {
    const yOffset = event.nativeEvent.contentOffset.y;
    isFirstTime = false;
    if (yOffset == 0 && !isFirstTime) {
      getMoviesList(yearsList[0] - 1)
        .then((response) => {
          const sortedMovies = response?.data?.results.sort(
            (a, b) => b.popularity - a.popularity
          );
          let updatedList = [...movieList];
          updatedList.unshift({
            year: yearsList[0] - 1,
            movies: sortedMovies,
          });
          setMovieList(updatedList);
          yearsList.unshift(yearsList[0] - 1);        
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("err =======>", err);
          setIsLoading(false);
        });
    }
  }

  const handleEndReached = () => {
    getMoviesList(yearsList[yearsList?.length - 1] + 1)
      .then((response) => {
        const sortedMovies = response?.data?.results.sort(
          (a, b) => b.popularity - a.popularity
        );
       
        let updatedList = [...movieList];
        updatedList.push({
          year: yearsList[yearsList?.length - 1] + 1,
          movies: sortedMovies,
        });
        setMovieList(updatedList);
        yearsList.push(yearsList[yearsList?.length - 1] + 1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err =======>", err);
        setIsLoading(false);
      });
  };

  const onPressFilter = (item) => {
    console.log("CALLED");
    getMoviesList(2012, item?.id.toString())
      .then((response) => {
        const sortedMovies = response?.data?.results.sort(
          (a, b) => b.popularity - a.popularity
        );
        let updatedList = [];
        updatedList.push({
          year: 2012,
          movies: sortedMovies,
        });
        setMovieList(updatedList);

        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }

        if (item?.name !== "All") {
          setGenresId(item?.id);
        } else {
          setGenresId("");
        }
        setYearsList([2012]);
      })
      .catch((err) => {
        console.log("err =======>", err);
        setIsLoading(false);
      });
  };

  return (
    <View className="flex-1 mt-7 bg-app_light_bg">
      <StatusBar barStyle={"light-content"} backgroundColor="#242424" />
      <View className="bg-app_light_bg py-4 px-3">
        {/* APP LOGO */}
        <SvgXml xml={Svgs.AppLogo} />

        {/* FILTER SECTION */}
        {filterList ? (
          <Filter filterList={filterList} onPressFilter={onPressFilter} />
        ) : null}
      </View>

      <FlashList
        onScroll={(e) => handleonScroll(e)}
        ref={flatListRef}
        data={sortedMovieList}
        onScrollBeginDrag={(event) => {
          if (
            event?.nativeEvent?.contentOffset.x === 0 &&
            event?.nativeEvent?.contentOffset.y === 0
          ) {
            isFirstTime = false;
            handleonScroll(event);
          }
        }}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text className="text-2xl text-white font-bold">
                {item?.year}
              </Text>
              <FlashList
                estimatedItemSize={200}
                data={item?.movies}
                numColumns={2}
                onEndReached={handleEndReached}
                ItemSeparatorComponent={() => {
                  return <View className="flex-1 h-10" />;
                }}
                renderItem={({ item, index }) => {
                  return <Movie movieList={item} key={index} />;
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Movies;

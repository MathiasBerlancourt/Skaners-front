import * as React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { LogBox } from "react-native";
import SkansCategory from "../components/SkansCategory";
import LikesCategory from "../components/LikesCategory";
import FavoritesCategory from "../components/FavoritesCategory";
LogBox.ignoreLogs(["Sending..."]);

const FavoritesCategoryRoute = () => (
  <View style={{ flex: 1 }}>{/* <FavoritesCategory /> */}</View>
);

const LikesCategoryRoute = () => (
  <View style={{ flex: 1 }}>{/* <LikesCategory /> */}</View>
);
const SkansCategoryRoute = () => (
  <View style={{ flex: 1 }}>
    <SkansCategory />
  </View>
);

const renderScene = SceneMap({
  favorites: FavoritesCategoryRoute,
  likes: LikesCategoryRoute,
  skans: SkansCategoryRoute,
});

const CollectionScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "skans", title: "Skans" },
    { key: "favorites", title: "Favorites" },
    { key: "likes", title: "Likes" },
  ]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      activeColor={"white"}
      inactiveColor={"black"}
      swipeEnabled={true}
      selectedTabTextColor={"green"}
      sceneContainerStyle={{ color: "red", backgroundColor: "red" }}
    />
  );

  // <View>
  //   <Text>Je suis la collectionScreen</Text>
  //   <TopTab.Navigator>
  //     <TopTab.Screen name="Favorites" component={FavoritesCategory} />
  //     <TopTab.Screen name="Likes" component={LikesCategory} />
  //     <TopTab.Screen name="Skans" component={SkansCategory} />
  //   </TopTab.Navigator>
  // </View>
};

export default CollectionScreen;

import * as React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Sending..."]);

const FavoritesCategoryRoute = () => (
  <View style={{ flex: 1, backgroundColor: "yellow" }}>
    <Text>Je suis la Category Favorites</Text>
  </View>
);

const LikesCategoryRoute = () => (
  <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
    <Text>Je suis la Category Likes</Text>
  </View>
);
const SkansCategoryRoute = () => (
  <View style={{ flex: 1, backgroundColor: "green" }}>
    <Text>Je suis la Category Skans</Text>
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
    { key: "favorites", title: "Favorites" },
    { key: "likes", title: "Likes" },
    { key: "skans", title: "Skans" },
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

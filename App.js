import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
// import SignUpScreen from "./containers/SignUpScreen";
import CreateUserAccountScreen from "./containers/CreateUserAccountScreen";
import FinalizeUserAccountScreen from "./containers/FinalizeUserAccountScreen";
import ChooseUserAvatarScreen from "./containers/ChooseUserAvatarScreen";
import SplashScreen from "./containers/SplashScreen";
import WelcomeScreen from "./containers/WelcomeScreen";
import SearchScreen from "./containers/SearchScreen";
import CameraScreen from "./containers/CameraScreen";
import CollectionScreen from "./containers/CollectionScreen";
import CopDropScreen from "./containers/CopDropScreen";
import SkansCheckScreen from "./containers/SkansCheckScreen";
import SingleSkanScreen from "./containers/SingleSkanScreen";
import ProfileButton from "./components/ProfileButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PictureHomeView from "./components/PIctureHomeView";
import ChooseYourAvatarScreens from "./containers/ChooseUserAvatarScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const setId = async (id) => {
    if (id) {
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setUserId(userId);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="Welcome">
              {() => <WelcomeScreen />}
            </Stack.Screen>

            <Stack.Screen
              name="Create User Account"
              component={CreateUserAccountScreen}
            />

            <Stack.Screen
              name="Finalize User Account"
              component={FinalizeUserAccountScreen}
            />

            <Stack.Screen
              name="Choose Avatar"
              component={ChooseUserAvatarScreen}
            />

            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <>
            <Stack.Screen name="Splash">{() => <SplashScreen />}</Stack.Screen>
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                  }}
                >
                  <Tab.Screen
                    name="TabHome"
                    options={{
                      headerShown: false,
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            title: "Home",
                            headerStyle: { backgroundColor: "red" },
                            headerTitleStyle: { color: "white" },
                            headerRight: () => {
                              return <ProfileButton />;
                            },
                          }}
                        >
                          {(...props) => <HomeScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="HomeView"
                          options={{ title: "Picture Home View" }}
                        >
                          {(props) => <PictureHomeView {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="Profile"
                          options={{
                            title: "User Profile",
                          }}
                        >
                          {() => (
                            <ProfileScreen
                              setToken={setToken}
                              setId={setId}
                              userId={userId}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen name="SkansCheck">
                          {() => <SkansCheckScreen />}
                        </Stack.Screen>
                        <Stack.Screen name="SingleSkan">
                          {() => <SingleSkanScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabSearch"
                    options={{
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name={"search-sharp"}
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen name="Search">
                          {() => <SearchScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  <Tab.Screen
                    name="TabCamera"
                    options={{
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="camera" size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Camera"
                          options={{ headerShown: false }}
                        >
                          {() => <CameraScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabCollection"
                    options={{
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                          name="collections"
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen name="Collection">
                          {() => <CollectionScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabCopDrop"
                    options={{
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                          name="shoe-sneaker"
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen name="CopDrop">
                          {() => <CopDropScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

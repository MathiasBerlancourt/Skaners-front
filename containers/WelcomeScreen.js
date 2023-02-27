import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>je suis sur le WelcomeScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text>Aller sur SignUp</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text>Aller sur SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

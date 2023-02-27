import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>En cours de chargement</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Tab");
        }}
      >
        <Text>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
}

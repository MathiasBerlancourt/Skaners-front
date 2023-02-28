import { useRoute } from "@react-navigation/core";
import { Text, View, TouchableOpacity } from "react-native";

export default function ProfileScreen({ setToken }) {
  const { params } = useRoute();
  return (
    <View>
      <Text>Je suis le profile screen</Text>
      <TouchableOpacity
        onPress={() => {
          setToken(null);
        }}
      >
        <Text>Deconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

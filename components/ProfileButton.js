import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const ProfileButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Profile");
      }}
    >
      <FontAwesome name="user" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ProfileButton;

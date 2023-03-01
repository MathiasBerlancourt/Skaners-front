import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/Images/logo.jpg";
import skanersLogo from "../assets/Images/skaners.jpg";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <View style={styles.picutreContainer}>
        <Image source={logo} style={styles.logo} />
        <Image
          source={skanersLogo}
          style={styles.skanersLogo}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.txt}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signInBtn}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.txt}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginTop: 45,
  },
  skanersLogo: {
    width: 250,
    height: 75,
    marginTop: 20,
  },
  picutreContainer: {
    alignItems: "center",
  },

  signInBtn: {
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 20,
  },
  signUpBtn: {
    height: 50,
    backgroundColor: "#FF7E00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 30,
  },

  txt: {
    color: "white",
    fontSize: 20,
  },

  background: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default WelcomeScreen;

import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import logo from "../assets/Images/skanerslogoS.png";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function SplashScreen() {
  const navigation = useNavigation();
  const animation = useRef(null);

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.txt}>Hello Crack,</Text>
      <Text style={styles.txt}>Bienvenue sur Skaners !</Text>
      <View style={styles.skipContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tab");
          }}
        >
          <Text style={styles.txtSkip}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 40,
  },
  logoContainer: {
    alignItems: "center",
    position: "relative",
  },
  loader: {
    position: "absolute",
    width: 400,
    height: 400,
  },

  txt: {
    fontFamily: "LouisGeorge",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },

  txtSkip: {
    fontFamily: "LouisGeorge",
    color: "white",
    fontSize: 15,
    marginRight: 25,
    marginBottom: 15,
  },
  skipContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
  },

  background: {
    flex: 1,
    backgroundColor: "black",
  },
});

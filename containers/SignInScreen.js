import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "react-native-dotenv";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const login = async () => {
      try {
        if (submit) {
          setErrorMessage("");
          const response = await axios.post(`${API_URL}/signin`, {
            email: email,
            password: password,
          });

          if (response.data.token) {
            setToken(response.data.token);
            await AsyncStorage.setItem("userId", response.data.user._id);
            await AsyncStorage.setItem(
              "userPfp",
              response.data.user.pictureUrl
            );
          }
        }
      } catch (error) {
        setErrorMessage("Email ou mot de passe incorrect");
        setSubmit(false);
      }
    };
    login();
  }, [submit]);

  return (

    <KeyboardAwareScrollView style={styles.background}>
      <View>
        <Text style={styles.title}>CONNEXION</Text>

        <Text style={styles.errorTxt}>{errorMessage}</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#515151"}
          onChangeText={(input) => {
            setEmail(input);
          }}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor={"#515151"}
          secureTextEntry={true}
          onChangeText={(input) => {
            setPassword(input);
          }}
          value={password}
        />

        <TouchableOpacity
          onPress={() => {
            alert("Wesh Crack pourquoi t'as oublié ton mot de passe");
          }}
        >
          <Text style={styles.passwordForgetTxt}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          disabled={submit}
          onPress={() => {
            if (!email || !password) {
              return setErrorMessage("Vous devez remplir tous les champs");
            }
            setSubmit(true);
          }}
        >
          <Text style={styles.loginTxt}>Valider</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontFamily: "LemonMilkBold",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 30,
    borderBottomColor: "#FF7E00",
    borderBottomWidth: 2,
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    fontFamily: "LouisGeorge",
    backgroundColor: "lightgray",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
  },

  title: {
    fontFamily: "LemonMilkBold",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 30,
    borderBottomColor: "#FF7E00",
    borderBottomWidth: 2,
    textAlign: "center",
    marginVertical: 50,
  },

  loginBtn: {
    height: 50,
    backgroundColor: "#FF7E00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    height: hp("5%"),
    width: wp("60%"),
  },

  loginTxt: {
    fontFamily: "LouisGeorgeBold",
    color: "white",
    fontSize: 23,
  },

  passwordForgetTxt: {
    fontFamily: "LouisGeorge",
    marginHorizontal: 35,
    color: "grey",
  },

  errorTxt: {
    fontFamily: "LouisGeorge",
    color: "#F86F00",
    marginHorizontal: 20,
    fontWeight: "bold",
  },

  // background: {
  //   backgroundColor: "white",

  //   flex: 1,
  // },
});

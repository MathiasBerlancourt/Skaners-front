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

export default function SignInScreen({ setToken, setId }) {
  const [email, setEmail] = useState("admin6780@mail.com");
  const [password, setPassword] = useState("azerty");
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
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.sinUpContainer}>
        <View>
          <View>
            <Text style={styles.title}>CONNEXION</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(input) => {
                setEmail(input);
              }}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
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
              <Text style={styles.passwordForgetTxt}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
          </View>
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
            <Text style={styles.loginTxt}>CONNEXION</Text>
          </TouchableOpacity>

          <Text style={styles.errorTxt}>{errorMessage}</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  sinUpContainer: {
    backgroundColor: "white",

    height: hp("89%"),
  },
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
    height: 30,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    paddingLeft: 10,
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
    fontFamily: "LouisGeorge",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ImageBackground,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import image from "./assets/42.jpeg";

const SearchView = ({ navigation }) => {
  const [login, setText] = useState("");

  const getToken = async () => {
    try {
      const token = await axios.post("https://api.intra.42.fr/oauth/token/", {
        client_id:
          "1bd4640209ddb26190198cf1619076229ab7083c8c6d10ec25c4e0c438fba5b9",
        client_secret:
          "83647c879d645ceb70e5dca1a744cf1c83b641a436317ee258a80b2812a0b0a2",
        grant_type: "client_credentials",
      });
      
      if (token.data) {
        return token.data;
      }
    } catch (error) {
      return null;
    }
  };

  const sendRequest = async (login, token) => {
    try {
      var data = await axios.get(
        "https://api.intra.42.fr/v2/users/" + login.toLowerCase(),
        {
          headers: {
            Authorization: "Bearer " + token.access_token,
          },
        }
      );
      navigation.navigate("Details", { data: data.data });
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchUser = async (login) => {
    if (login != "") {
      try {
        var token = await AsyncStorage.getItem("access_token");
        if (token == null) {
          token = JSON.parse(token);

          if (
            token.expires_in + token.created_at <=
            Math.floor(Date.now() / 1000)
          ) {
            token = await getToken();
            await AsyncStorage.setItem("access_token", JSON.stringify(token));
          }
        } else {
          token = await getToken();
          await AsyncStorage.setItem("access_token", JSON.stringify(token));
        }
       
        await sendRequest(login, token);
      } catch (error) {
        console.log(JSON.stringify(error));
        return null;
      }
      return;
    }
    alert("you should set a login first");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <TextInput
          style={styles.searchbar}
          placeholder="Enter a login"
          onChangeText={(login) => {
            setText(login);
          }}
          defaultValue={login}
        />
        <Button
          style={styles.button}
          title="Search"
          onPress={() => fetchUser(login)}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchbar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "85%",
    backgroundColor: "#fff",
  },

  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchView;

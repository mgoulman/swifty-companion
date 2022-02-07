import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import imagebg from "./assets/42.jpeg";
import imagedf from "./assets/default_img.png";
import * as Progress from "react-native-progress";
import { RadioButton } from "react-native-paper";

const DetailsScreen = ({ route, navigation }) => {
  const [checked, setChecked] = useState("first");

  const { data } = route.params;

  const full_name = data.first_name + " " + data.last_name;
  const image = data.cursus_users[2]
    ? data.cursus_users[2].user.image_url
    : data.cursus_users[0].user.image_url;
  const login = data.cursus_users[2]
    ? data.cursus_users[2].user.login
    : data.cursus_users[0].user.login;
  const level = data.cursus_users[2]
    ? data.cursus_users[2].level
    : data.cursus_users[0].level;
  const location = data.location;
  const email = data.email;
  const wallet = data.wallet + " ₳";
  const correction_point = data.correction_point;
  const cursus = data.cursus_users[2]
    ? data.cursus_users[2].cursus.name
    : data.cursus_users[0].cursus.name;
  const grade = data.cursus_users[2]
    ? data.cursus_users[2].grade
    : data.cursus_users[0].grade;
  const cursus_skills = data.cursus_users[0].skills;
  const cursus_project = data.projects_users;

  const level_per = (level % 100) - parseInt(level);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={imagebg}
        resizeMode="cover"
        style={styles.imagebg}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            {image ? (
              <Image style={styles.profileImg} source={{ uri: image }} />
            ) : (
              <Image style={styles.profileImg} source={{ uri: imagedf }} />
            )}
          </View>
          <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  color: "#fff",
                  marginTop: 10,
                }}
              >
                {full_name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  marginTop: 20,
                  fontStyle: "italic",
                }}
              >
                {login}
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>{email}</Text>
              <Text style={{ marginTop: 25, color: "#fff" }}>
                Wallet {wallet}
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Evaluation Points {correction_point}
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>Grade {grade}</Text>
            </View>
            {location ? (
              <View style={styles.location_border}>
                <Text style={{ color: "#fff" }}>Available</Text>
                <Text style={{ marginTop: 5, color: "#fff" }}>{location}</Text>
              </View>
            ) : (
              <View style={styles.location_border}>
                <Text style={{ color: "#fff" }}>Unavailable</Text>
              </View>
            )}
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Progress.Bar
                progress={level_per}
                width={300}
                color={"#202026"}
                height={15}
              >
                <Text
                  style={{
                    position: "absolute",
                    color: "#fff",
                    fontSize: 10,
                    marginLeft: 120,
                  }}
                >
                  Level {level}
                </Text>
              </Progress.Bar>
              <Text style={{ marginTop: 15, color: "#fff" }}>
                Cursus : {cursus}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text>Projects</Text>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
              />

              <Text>Skills</Text>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              {checked === "second"
                ? cursus_skills.map((item, i) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        key={i}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#fff",
                            textAlign: "right",
                          }}
                        >
                          {item.name}:{" "}
                        </Text>
                        <Text style={styles.text}>{item.level}%</Text>
                      </View>
                    );
                  })
                : cursus_project.map((item, i) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        key={i}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            color: "#fff",
                            textAlign: "right",
                          }}
                        >
                          {item.project.slug} :
                        </Text>
                        <Text
                          style={[
                            styles.text,
                            item.status !== "finished"
                              ? styles.text
                              : item.final_mark > 0
                              ? styles.green_mark
                              : styles.red_mark,
                          ]}
                        >
                          {item.status === "finished"
                            ? item.final_mark
                              ? item.final_mark
                              : 0
                            : item.status}
                        </Text>
                      </View>
                    );
                  })}
            </View>
          </SafeAreaView>
        </ScrollView>
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
  profileImg: {
    width: 500,
    height: 450,
  },

  imagebg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  scroll: {
    width: "100%",
    height: "100%",
  },

  location_border: {
    color: "#fff",
    borderBottomColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    width: 300,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#202026",
  },

  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00babc",
    alignItems: "flex-end",
  },

  red_mark: {
    color: "red",
  },

  green_mark: {
    color: "green",
  },
});

export default DetailsScreen;

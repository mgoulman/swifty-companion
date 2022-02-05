import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import imagebg from "./assets/42.jpeg";
import imagedf from "./assets/default_img.png";
import * as Progress from 'react-native-progress';


const DetailsScreen = ({ route, navigation }) => {
  const { data } = route.params;



  const full_name = data.first_name + " " + data.last_name;
  const image = data.cursus_users[2].user.image_url;
  const login = data.cursus_users[2].user.login;
  const level = "Level   " + data.cursus_users[2].level;
  const location = data.location;
  const email = data.email;
  const wallet = "Wallet                               " + data.wallet + " ₳";
  const correction_point = "Evaluation points               " + data.correction_point;
  const cursus = "Cursus " + data.cursus_users[2].cursus.name;
  const grade = "Grade                  " + data.cursus_users[2].grade;
  const skills = data.cursus_users[0].skills;

  const level_per = (data.cursus_users[2].level % 100) - parseInt(data.cursus_users[2].level);
    

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
          <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Text style={{ fontWeight: "700", fontSize: 20, color: "#fff", marginTop: 10 }}>{full_name}</Text>
            <Text style={{ fontSize: 15, color: "#fff", marginTop: 20, fontStyle: "italic" }}>{login}</Text>
            <Text style={{marginTop: 5, color: "#fff"}}>{email}</Text>
            <Text style={{marginTop: 25, color: "#fff", }}>{wallet}</Text>
            <Text style={{marginTop: 5, color: "#fff"}}>{correction_point}</Text>     
            <Text style={{marginTop: 5, color: "#fff"}}>{grade}</Text>
            { location? (
              <View style={styles.location_border}>
                <Text style={{color: "#fff"}}>Available</Text>
                <Text style={{marginTop: 5, color: "#fff"}}>{location}</Text>
              </View>
              ) : ( <View style={styles.location_border}>
                      <Text style={{color: "#fff"}}>Unavailable</Text>
                    </View>
              )}
              <View style={{marginTop: 20}}>
                <Progress.Bar progress={level_per} width={300} color={'#202026'} height={15}>
                  <Text style={{position: "absolute", color: "#fff", fontSize: 10, marginLeft: 120}}>{level}</Text>
                </Progress.Bar>
              </View>
              
                {skills.map((item, i) => {
                  return (
                    <View key={i}>
                      <Text>{item.name}</Text>
                      <Text>{item.level}</Text>
                    </View>
                  )
                })

                }


            
            
            {/* <Text style={{marginTop: 5, color: "#fff"}}>{cursus}</Text> */}

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
  }
});

export default DetailsScreen;

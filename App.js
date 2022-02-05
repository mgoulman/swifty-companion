import React from "react";
import SearchView from "./SearchView";
import DetailsScreen from "./DetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchView}  options={{ headerShown: false }}/>
            <Stack.Screen name="Details" component={DetailsScreen}  />
          </Stack.Navigator>
        </NavigationContainer>
  </>
  );
};

export default App;

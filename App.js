import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GalleryScreen from "./src/screens/GalleryScreen";
import TakePhotoScreen from "./src/screens/TakePhotoScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function App() {

  const [capturedPhotos, setCapturedPhotos] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Gallery"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="picture-o" size={size} color={color} /> // Add your desired icon here
            ),
          }}
          children={
            (props) => <GalleryScreen {...props} capturedPhotos={capturedPhotos} />
          }
        />
        <Tab.Screen
          name="Take Photo"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="camera" size={size} color={color} /> // Add your desired icon here
            ),
          }}
          children={
            (props) => <TakePhotoScreen {...props} setCapturedPhotos={setCapturedPhotos} />
          }
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

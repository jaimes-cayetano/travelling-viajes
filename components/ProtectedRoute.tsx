import React from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TeamScreen from "../screens/TeamScreen";
import TravellingIAScreen from "../screens/TravellingIAScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: any = "home";

        if (route.name === "Inicio") iconName = "home-outline";
        else if (route.name === "TravellingIA") iconName = "airplane-outline";
        else if (route.name === "Equipo") iconName = "people-outline";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#0056FF",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Inicio" component={HomeScreen} />
    <Tab.Screen name="TravellingIA" component={TravellingIAScreen} />
    <Tab.Screen name="Equipo" component={TeamScreen} />
  </Tab.Navigator>
);

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />

      <NavigationContainer>
        {user ? (
          <TabNavigator />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default ProtectedRoute;

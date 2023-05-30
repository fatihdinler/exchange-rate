import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from '../../navigation/tab/tab-navigator'

const Layout = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Layout;

const styles = StyleSheet.create({});

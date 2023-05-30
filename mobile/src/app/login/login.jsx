import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});

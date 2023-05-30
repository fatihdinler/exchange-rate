import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Toolbar from "../../components/toolbar/toolbar";

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.toolbarContainer}>
        <Toolbar screenName="Profile" />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
  toolbarContainer: {
    flex: 1 / 7,
  },
});

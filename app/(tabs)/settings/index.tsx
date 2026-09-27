import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import TabMenu from "../components/TabMenu";
import { colors } from "../../../constants/theme";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TabMenu />
      </View>

      <Text style={styles.header}>Settings</Text>

      <Text style={styles.subHeader}>Configure Your Experience</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    color: colors.text.main,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subHeader: {
    color: colors.primary.main,
    marginBottom: 16,
    fontSize: 13,
  },
  card: {
    backgroundColor: colors.secondary.main,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 16,
  },
  cardTitle: {
    color: colors.text.main,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(251, 44, 54, 0.1)",
    borderWidth: 1,
    borderColor: colors.red.main,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: colors.red.main,
    fontSize: 12,
    fontWeight: "bold",
  },
});

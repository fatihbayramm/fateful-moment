import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { colors } from "../../../../../constants/theme";

interface ScenarioCardProps {
  title: string;
  description: string;
  time: string;
  image: any;
  onPress: () => void;
}

export default function ScenarioCard({ title, description, time, image, onPress }: ScenarioCardProps) {
  return (
    <View style={styles.card}>
      <ImageBackground source={image} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 350,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: colors.secondary.main,
    borderWidth: 1,
    borderColor: colors.border.main,
  },
  image: {
    flex: 1,
  },
  imageStyle: {
    opacity: 0.6,
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
    backgroundColor: "rgba(2, 6, 23, 0.4)",
  },
  time: {
    color: colors.primary.main,
    marginBottom: 8,
    fontSize: 12,
  },
  title: {
    color: colors.text.main,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: colors.bodyText.main,
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "rgba(2, 6, 23, 0.8)",
    borderWidth: 1,
    borderColor: colors.primary.main,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: colors.text.main,
    fontWeight: "bold",
  },
});

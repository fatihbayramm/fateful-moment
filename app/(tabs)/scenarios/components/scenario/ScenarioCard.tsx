import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { colors } from "../../../../../constants/theme";
import AlarmClockIcon from "../../../../../assets/icons/alarm-clock.svg";

interface ScenarioCardProps {
  title: string;
  description: string;
  time: string;
  image: any;
  onPress: () => void;
}

export default function ScenarioCard({ title, description, time, image, onPress }: ScenarioCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <ImageBackground source={image} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <View style={styles.timeRow}>
            <AlarmClockIcon width={16} height={16} color={colors.primary.main} />
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
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
    padding: 14,
    justifyContent: "flex-end",
    backgroundColor: "rgba(2, 6, 23, 0.4)",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  time: {
    color: colors.primary.main,
    fontSize: 11,
  },
  title: {
    color: colors.text.main,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    color: colors.bodyText.main,
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 19,
    flexShrink: 1,
  },
  button: {
    backgroundColor: "rgba(2, 6, 23, 0.8)",
    borderWidth: 1,
    borderColor: colors.primary.main,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: colors.text.main,
    fontWeight: "bold",
  },
});

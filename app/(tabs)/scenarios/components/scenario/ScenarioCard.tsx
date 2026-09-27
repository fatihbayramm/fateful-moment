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

          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.footer}>
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
    width: 260,
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
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 48,
    backgroundColor: "rgba(2, 6, 23, 0.4)",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  time: {
    color: colors.primary.main,
    fontSize: 11,
  },
  title: {
    color: colors.text.main,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    flex: 1,
    color: colors.bodyText.main,
    fontSize: 12,
    lineHeight: 17,
  },
  footer: {
    position: "absolute",
    right: 14,
    bottom: 10,
  },
  button: {
    backgroundColor: "rgba(2, 6, 23, 0.8)",
    borderWidth: 1,
    borderColor: colors.primary.main,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  buttonText: {
    color: colors.text.main,
    fontWeight: "bold",
  },
});

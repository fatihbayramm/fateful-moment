import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../../../../constants/theme";
import type { ScenarioOption } from "../../../../../data/scenarios";

interface ScenarioOptionsProps {
  options: ScenarioOption[];
  time: string;
  onSelect: (option: ScenarioOption) => void;
}

const parseTimeToSeconds = (time: string) => {
  const [minutes, seconds] = time.replace("min", "").trim().split(":");

  return Number(minutes) * 60 + Number(seconds);
};

const hexToRgb = (hex: string) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});

const getProgressColor = (progress: number) => {
  const from = hexToRgb(colors.primary.main);
  const to = hexToRgb(colors.red.main);

  const channel = (start: number, end: number) =>
    Math.round(start + (end - start) * (1 - progress));

  return `rgb(${channel(from.r, to.r)}, ${channel(from.g, to.g)}, ${channel(from.b, to.b)})`;
};

export default function ScenarioOptions({ options, time, onSelect }: ScenarioOptionsProps) {
  const totalSeconds = useRef(parseTimeToSeconds(time)).current;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress = totalSeconds === 0 ? 0 : remainingSeconds / totalSeconds;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {options.map((option) => (
          <TouchableOpacity key={option.id} style={styles.card} onPress={() => onSelect(option)}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.description}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%`, backgroundColor: getProgressColor(progress) },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  grid: {
    flexGrow: 1,
    width: "100%",
    gap: 12,
    paddingBottom: 16,
  },
  card: {
    width: "100%",
    backgroundColor: colors.secondary.main,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border.main,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  title: {
    color: colors.text.main,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    color: colors.bodyText.main,
    fontSize: 13,
    lineHeight: 19,
  },
  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border.main,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
});

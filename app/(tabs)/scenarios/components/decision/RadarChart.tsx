import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Polygon, Text as SvgText } from "react-native-svg";

import { colors } from "../../../../../constants/theme";
import type { Metrics } from "../../../../../data/scenarios";

const SIZE = 168;
const CENTER = SIZE / 2;
const RADIUS = 58;
const LEVELS = [0.25, 0.5, 0.75, 1];

const axes: { key: keyof Metrics; label: string }[] = [
  { key: "vision", label: "Vision" },
  { key: "courage", label: "Courage" },
  { key: "risk", label: "Risk" },
  { key: "control", label: "Control" },
  { key: "empathy", label: "Empathy" },
  { key: "ethics", label: "Ethics" },
];

const toPoint = (index: number, ratio: number) => {
  const angle = (-90 + index * (360 / axes.length)) * (Math.PI / 180);

  return {
    x: CENTER + RADIUS * ratio * Math.cos(angle),
    y: CENTER + RADIUS * ratio * Math.sin(angle),
  };
};

const toPoints = (ratio: number) => axes.map((_, index) => toPoint(index, ratio)).map((p) => `${p.x},${p.y}`).join(" ");

const toDataPoints = (metrics: Metrics) =>
  axes
    .map((axis, index) => toPoint(index, Math.max(metrics[axis.key], 0) / 100))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

export default function RadarChart({ metrics }: { metrics: Metrics }) {
  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        {LEVELS.map((level) => (
          <Polygon
            key={level}
            points={toPoints(level)}
            fill="none"
            stroke={colors.border.main}
            strokeWidth={1}
          />
        ))}

        {axes.map((axis, index) => {
          const point = toPoint(index, 1);

          return (
            <Line
              key={axis.key}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
              stroke={colors.border.main}
              strokeWidth={1}
            />
          );
        })}

        <Polygon points={toDataPoints(metrics)} fill="rgba(0, 211, 243, 0.25)" stroke={colors.primary.main} strokeWidth={2} />

        {axes.map((axis, index) => {
          const point = toPoint(index, Math.max(metrics[axis.key], 0) / 100);

          return <Circle key={axis.key} cx={point.x} cy={point.y} r={2.5} fill={colors.primary.main} />;
        })}

        {axes.map((axis, index) => {
          const point = toPoint(index, 1.3);

          return (
            <SvgText
              key={axis.key}
              x={point.x}
              y={point.y}
              fill={colors.bodyText.main}
              fontSize={9}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {axis.label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});

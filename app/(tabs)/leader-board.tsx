import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  SafeAreaView,
} from "react-native";

type Leader = {
  id: string;
  name: string;
  score: number;
  level: "Gold" | "Silver" | "Bronze" | "Starter";
  rank: number;
};

const leaders: Leader[] = [
  { id: "1", name: "John Mwangi", score: 1500, level: "Gold", rank: 1 },
  { id: "2", name: "Sarah Kamau", score: 1380, level: "Silver", rank: 2 },
  { id: "3", name: "Kevin Otieno", score: 1250, level: "Bronze", rank: 3 },
  { id: "4", name: "Lilian Njeri", score: 1100, level: "Bronze", rank: 4 },
  { id: "5", name: "Brian Kiptoo", score: 980, level: "Starter", rank: 5 },
];

const LeaderboardScreen: React.FC = () => {
  const renderLeader: ListRenderItem<Leader> = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{item.rank}</Text>
      <View style={styles.nameLevelContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={[
            styles.level,
            item.level === "Gold"
              ? styles.levelGold
              : item.level === "Silver"
              ? styles.levelSilver
              : item.level === "Bronze"
              ? styles.levelBronze
              : styles.levelStarter,
          ]}
        >
          {item.level}
        </Text>
      </View>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌍 Community Leaderboard</Text>
      <Text style={styles.subtitle}>
        See how you rank among Eco Warriors contributing to change.
      </Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 1 }]}>Rank</Text>
        <Text style={[styles.headerText, { flex: 3 }]}>Member</Text>
        <Text style={[styles.headerText, { flex: 2, textAlign: "center" }]}>
          Level
        </Text>
        <Text style={[styles.headerText, { flex: 1, textAlign: "right" }]}>
          Score
        </Text>
      </View>

      <FlatList
        data={leaders}
        renderItem={renderLeader}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fdf9",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b5e20",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    paddingBottom: 8,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1b5e20",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
  },
  rank: {
    flex: 1,
    fontWeight: "600",
    color: "#2e7d32",
  },
  nameLevelContainer: {
    flex: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  level: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 3,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  score: {
    flex: 1,
    fontWeight: "600",
    color: "#1b5e20",
    textAlign: "right",
  },

  // Level badge colors
  levelGold: {
    backgroundColor: "#fff6d5",
    color: "#b8860b",
  },
  levelSilver: {
    backgroundColor: "#f0f0f0",
    color: "#7f7f7f",
  },
  levelBronze: {
    backgroundColor: "#fff1e0",
    color: "#cd7f32",
  },
  levelStarter: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },
});

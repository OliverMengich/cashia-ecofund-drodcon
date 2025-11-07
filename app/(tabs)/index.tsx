import { Image } from 'expo-image';
import { Platform,ScrollView, Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useNavigation,useRouter } from 'expo-router';

export default function HomeScreen() {
  const navigation = useRouter()

  return (
    <ScrollView style={{paddingTop: 20, flex: 1, backgroundColor: "#F6F6F6" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#1B5E20" }}>EcoFund 🌍</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Text style={{ marginRight: 16 }}>🔔</Text></TouchableOpacity>
          <TouchableOpacity><Text>👤</Text></TouchableOpacity>
        </View>
      </View>

      {/* Wallet & Impact Summary */}
      <View style={{
        backgroundColor: "#1B5E20",
        margin: 16,
        borderRadius: 20,
        padding: 20,
      }}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Wallet Balance</Text>
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "700" }}>KSh 3,200</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <Text style={{ color: "#fff" }}>🌳 128 Trees</Text>
          <Text style={{ color: "#fff" }}>⚡ 3 Projects</Text>
        </View>
      </View>

      {/* Featured Projects */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 16, marginBottom: 8 }}>
        Featured Projects
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        {[1, 2, 3].map((_, i) => (
          <View key={i} style={{
            width: 250,
            marginRight: 16,
            backgroundColor: "#fff",
            borderRadius: 16,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          }}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1581090700227-1e37b190418e" }}
              style={{ height: 120, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            />
            <View style={{ padding: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>Solar Power for Schools</Text>
              <Text style={{ color: "gray" }}>Raised: 72%</Text>
              <Link style={{
                    backgroundColor: "#4CAF50",
                    borderRadius: 10,
                    marginTop: 8,
                    paddingVertical: 8,
                    alignItems: "center"
                  }} href={{pathname:'/projectId',params:{projectId:''}}} >
                
                  <Text style={{textAlign:'center',width:'100%', color: "#fff" }}>Donate</Text>
              </Link>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

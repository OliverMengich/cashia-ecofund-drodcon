import React, { useState } from "react";
import { View, Text, Image,Alert, ScrollView, TouchableOpacity, TextInput, Pressable, Linking } from "react-native";

export default function ProjectDetailsScreen() {
  const [amount, setAmount] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  async function onPayRequest(){
    try {
      setIsLoading(true)
      const req = await fetch('/api/pay',{
        method:'POST',
        body: JSON.stringify({
          amount,
          payer: '254741954425'
        })
      })
      setIsLoading(false)
      const resp = await req.json()
      console.log('response on app: ',resp)
      const supported = await Linking.canOpenURL(resp.url)
      if (supported) {
        await Linking.openURL(resp.url); // Opens the URL in the device's default browser
      } else {
        Alert.alert("Can't open this URL:", resp.url);
      }
    } catch (error) {
      setIsLoading(false)
      
    }
    // Alert.alert("Donate",`Do you with to donate ${amount} to Ecofund`,[
    //   {
    //     text:"CANCEL",
    //   },
    //   {
    //     text:"PAY",
    //     onPress: async ()=>{
    //       const req = await fetch('/api/pay',{
    //         method:'POST',
    //         body: JSON.stringify({
    //           amount,
    //           payer: '254741954425'
    //         })
    //       })
    //       const resp = await req.json()
    //       console.log(resp)
    //     }
    //   },
    // ])
  }

  return (
    <>
      {
        isLoading?(
          <View style={{ alignItems:'center',justifyContent:'center',  width: '100%',height:'100%',backgroundColor:'rgba(0,0,0,.5)'}}>
            <Text>Loading...</Text>
          </View>
        ):null
      }
      <ScrollView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
          <TouchableOpacity><Text style={{ fontSize: 20 }}>⬅️</Text></TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Solar Power for Schools</Text>
          <TouchableOpacity><Text>❤️</Text></TouchableOpacity>
        </View>

        {/* Hero Image */}
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1581090700227-1e37b190418e" }}
          style={{ height: 220, width: "100%" }}
        />

        {/* Summary */}
        <View style={{ padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#eee" }}>
          <Text style={{ color: "#1B5E20", fontWeight: "700", fontSize: 16 }}>Turkana, Kenya</Text>
          <Text style={{ color: "gray", marginTop: 4 }}>Category: Clean Energy</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Text>Goal: KSh 1,000,000</Text>
            <Text>Raised: 72%</Text>
          </View>
          <View style={{ height: 6, backgroundColor: "#E0E0E0", borderRadius: 4, marginTop: 6 }}>
            <View style={{ width: "72%", height: 6, backgroundColor: "#4CAF50", borderRadius: 4 }} />
          </View>
          <Text style={{ marginTop: 6, color: "gray" }}>328 Supporters</Text>
        </View>

        {/* Description */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>About this project</Text>
          <Text style={{ color: "gray", lineHeight: 22 }}>
            This project aims to install solar panels in 10 rural schools to provide
            reliable electricity for lighting and e-learning. Your contribution helps
            power education sustainably.
          </Text>
        </View>

        {/* Impact Stats */}
        <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>⚡</Text>
            <Text style={{ fontWeight: "600" }}>10 Schools</Text>
            <Text style={{ color: "gray" }}>Powered</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>👧</Text>
            <Text style={{ fontWeight: "600" }}>2,000</Text>
            <Text style={{ color: "gray" }}>Students</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>🌍</Text>
            <Text style={{ fontWeight: "600" }}>5 Tons</Text>
            <Text style={{ color: "gray" }}>CO₂ Saved</Text>
          </View>
        </View>

        {/* Donation Section */}
        <View style={{
          backgroundColor: "#fff",
          margin: 16,
          padding: 20,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>Support this project</Text>
          <TextInput
            placeholder="Enter amount (KSh)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={{
              backgroundColor: "#F0F0F0",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginBottom: 10,
            }}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            {[50, 200, 500, 1000].map((amt) => (
              <TouchableOpacity
                key={amt}
                onPress={() => setAmount(amt.toString())}
                style={{
                  backgroundColor: amount === amt.toString() ? "#4CAF50" : "#E0E0E0",
                  padding: 10,
                  borderRadius: 10,
                  width: 70,
                  alignItems: "center",
                }}>
                <Text style={{ color: amount === amt.toString() ? "#fff" : "#333" }}>KSh {amt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Pressable
            style={{
              backgroundColor: "#1B5E20",
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={onPayRequest}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>💚 Donate Now with Cashia</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={{ paddingHorizontal: 16, marginBottom: 40 }}>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text style={{ color: "#4CAF50", textAlign: "center" }}>📜 View Project Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "#4CAF50", textAlign: "center" }}>📊 View Transparency Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

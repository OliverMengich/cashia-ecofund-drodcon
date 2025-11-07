import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

export default function CashiaPaymentModal({ visible, amount, onClose, projectName }:{visible: boolean,amount: number,onClose:()=>void, projectName: string}) {
    const [method, setMethod] = useState("wallet");
    const [status, setStatus] = useState("idle");

    const handlePayment = async () => {
        setStatus("loading");
        // Simulate Cashia payment API call
        setTimeout(() => {
            setStatus("success");
        }, 2000);
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={{flex: 1,backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center",  alignItems: "center" }}>
                <View style={{
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 20,  padding: 24, }}>
                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#1B5E20" }}>Complete Your Donation</Text>
                    <TouchableOpacity onPress={onClose}><Text style={{ fontSize: 18 }}>✖️</Text></TouchableOpacity>
                </View>

                {/* Summary */}
                {status === "idle" && (
                    <>
                    <View style={{
                        backgroundColor: "#E8F5E9",
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 20
                    }}>
                        <Text style={{ color: "#1B5E20", fontWeight: "600" }}>{projectName}</Text>
                        <Text style={{ fontSize: 22, fontWeight: "700", color: "#1B5E20" }}>KSh {amount}</Text>
                        <Text style={{ color: "gray" }}>You’re funding clean energy access 🌞</Text>
                    </View>

                    {/* Payment Methods */}
                    <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>Select Payment Method</Text>

                    {[
                        { key: "wallet", label: "💳 Cashia Wallet (Balance: KSh 3,200)" },
                        { key: "mpesa", label: "📱 MPESA" },
                        { key: "card", label: "🏦 Debit / Credit Card" },
                    ].map((item) => (
                        <TouchableOpacity
                        key={item.key}
                        onPress={() => setMethod(item.key)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 12,
                            borderWidth: 2,
                            borderColor: method === item.key ? "#4CAF50" : "#E0E0E0",
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                        >
                        <Text style={{ fontSize: 16 }}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Confirm Button */}
                    <TouchableOpacity
                        onPress={handlePayment}
                        style={{
                        backgroundColor: "#1B5E20",
                        borderRadius: 12,
                        paddingVertical: 14,
                        alignItems: "center",
                        marginTop: 10,
                        }}>
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                        💚 Confirm & Pay KSh {amount}
                        </Text>
                    </TouchableOpacity>
                    </>
                )}

                {/* Loading State */}
                {status === "loading" && (
                    <View style={{ alignItems: "center", paddingVertical: 40 }}>
                    <Text style={{ fontSize: 18, color: "#1B5E20" }}>Processing payment...</Text>
                    <Text style={{ fontSize: 40, marginTop: 10 }}>⏳</Text>
                    </View>
                )}

                {/* Success */}
                {status === "success" && (
                    <View style={{ alignItems: "center", paddingVertical: 30 }}>
                    <Text style={{ fontSize: 48 }}>🎉</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#1B5E20", marginTop: 10 }}>
                        Thank you for your donation!
                    </Text>
                    <Text style={{ textAlign: "center", color: "gray", marginVertical: 10 }}>
                        You just helped fund a greener Kenya.  
                        Every contribution counts 🌍
                    </Text>

                    <TouchableOpacity
                        style={{
                        backgroundColor: "#4CAF50",
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        marginTop: 10,
                        }}
                        onPress={onClose}
                    >
                        <Text style={{ color: "#fff", fontWeight: "600" }}>Done</Text>
                    </TouchableOpacity>
                    </View>
                )}
                </View>
            </View>
        </Modal>
    );
}

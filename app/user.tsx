import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { DisplayAuthenticatedUserView } from "@/components/DisplayAuthenticatedUserView/DisplayAuthenticatedUserView";

const UserPage: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.pageContainer}>
            <DisplayAuthenticatedUserView />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
});

export default UserPage;

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface AthleteBioProps {
    name: string;
    school: string;
    sport: string;
    tags: string[];
    bio: string;
}

const AthleteBio: React.FC<AthleteBioProps> = ({ name, school, sport, tags, bio }) => {
    return (
        <View style={styles.bioContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.schoolSportText}>{`${school} | ${sport}`}</Text>
            <Text style={styles.tagsText}>{tags.join(', ')}</Text>
            <Text style={styles.bioText}>{bio}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bioContainer: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#6a2c3e",
        marginVertical: 8,
        alignSelf: "stretch",
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#000",
        marginBottom: 4,
        fontFamily: 'LondrinaSolid', // Apply LondrinaSolid font
        textAlign: "center", // Center text
    },
    schoolSportText: {
        fontSize: 18,
        color: "#000",
        marginBottom: 4,
        fontFamily: 'LondrinaSolid-Light', // Apply LondrinaSolid font
        textAlign: "center", // Center text
    },
    tagsText: {
        fontSize: 16,
        color: "#6a2c3e",
        marginBottom: 8,
        fontFamily: 'LondrinaSolid-Light', // Apply LondrinaSolid font
        textAlign: "center", // Center text
    },
    bioText: {
        fontSize: 16,
        color: "#6a2c3e",
        fontFamily: 'LondrinaSolid-Light', // Apply LondrinaSolid font
        fontWeight: "300",
        textAlign: "center", // Center text
    },
});

export default AthleteBio;

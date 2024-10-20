import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import AthleteCard from './athleteCard';

interface Athlete {
    id: string
    name: string;
    sport: string;
    university: string;
    imageUrl: string;
    tags: string[];
    bio: string;
}

interface SupportedAthletesProps {
    athletes?: Athlete[];
}

const sampleAthletes: Athlete[] = [
    {
        id: "1",
        name: "John Doe",
        sport: "Basketball",
        university: "University of Example",
        imageUrl: require("../../assets/images/player1.png"),
        tags: ["MVP", "All-Star"],
        bio: "John is a top player in the league with numerous awards."
    },
    {
        id: "2",

        name: "Jane Smith",
        sport: "Soccer",
        university: "Example State University",
        imageUrl: require("../../assets/images/player2.png"),
        tags: ["Captain", "Goal Scorer"],
        bio: "Jane leads her team with exceptional skills and leadership."
    },
    {
        id: "3",
        name: "Alice Johnson",
        sport: "Tennis",
        university: "Example University",
        imageUrl: require("../../assets/images/player3.png"),
        tags: ["Champion", "Top Seed"],
        bio: "Alice has won multiple championships and is a top-ranked player."
    },
    {
        id: "4",
        name: "Bob Brown",
        sport: "Football",
        university: "Example University",
        imageUrl: require("../../assets/images/player4.png"),
        tags: ["All-American", "Prospect"],
        bio: "Bob is a promising athlete with great potential."
    },
    {
        id: "5",
        name: "Charlie Davis",
        sport: "Basketball",
        university: "Example University",
        imageUrl: require("../../assets/images/player5.png"),
        tags: ["Rookie", "Star"],
        bio: "Charlie is a rookie with a bright future."
    }
];

const SupportedAthletes: React.FC<SupportedAthletesProps> = ({ athletes = sampleAthletes }) => {
    return (
        <ScrollView horizontal style={styles.scrollContainer}>
            {athletes.map((athlete, index) => (
                <View key={index} style={styles.cardContainer}>
                    <AthleteCard
                        name={athlete.name}
                        sport={athlete.sport}
                        university={athlete.university}
                        imageUrl={athlete.imageUrl}
                        tags={athlete.tags}
                        bio={athlete.bio}
                        id={athlete.id}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 10,
        marginBottom: 20,
        marginLeft: 20,
        backgroundColor: 'white' // Ensure this is set to 'white'
    },
    cardContainer: {
        marginRight: 15,
    },
});

export default SupportedAthletes;

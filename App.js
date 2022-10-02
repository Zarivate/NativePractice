import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const [userGoalText, setUserGoalText] = useState("");
  const [userGoals, setUserGoals] = useState([]);

  function typeGoalHandler(userText) {
    setUserGoalText(userText);
  }

  function addGoalHandler() {
    setUserGoals((currentGoals) => [...currentGoals, userGoalText]);
  }

  return (
    // More than on stylesheet can be used in the JSC code because of how the whole file is
    // parsed firsthand before executing anything
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputAdjustment}
          placeholder="Your course goal!"
          // No parentheses are added here "()", in other words it's not executed since if the parentheses were added the function
          // would execute immediately upon parsing this section of code, which could mess up the UI. As it is now, instead it will
          // now have React execute it whenever it detects a text change
          onChangeText={typeGoalHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      {/* In order to ensure that the correct amount of space is taken up by the user's typed goals, another view
      is made above the scroll view to have both a scrollable section and also have it take up the correct amount of space */}
      <View style={styles.goalsContainer}>
        <ScrollView>
          {userGoals.map((goal) => (
            // The underlying element that View is compiled into is a widget that can have it's corners rounded, helps get around IOS
            // restraint of underlying translated images not having same properties as Android. Styles also don't cascade here in Native
            // It's why some text color changes may not apply to "goal" property below, as instead it's applied to the View element
            <View style={styles.goalItem} key={goal}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// New properties can be added to stylesheets, keep in mind
const styles = StyleSheet.create({
  appContainer: {
    // Because the outer appContainer is the only container where it is, it'll take up all the height
    // which can then be used by the other container children to be dived for a better layout
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
  inputAdjustment: {
    borderWidth: 1,
    borderColor: "#cccccc",
    // The element that receives this styling will take up 80% of the overarching containers width
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 2,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});

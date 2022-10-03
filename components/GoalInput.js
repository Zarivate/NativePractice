import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

function GoalInput(props) {
  const [userGoalText, setUserGoalText] = useState("");

  function typeGoalHandler(userText) {
    setUserGoalText(userText);
  }

  function addGoalHandler() {
    // Manually call function so usser text parameter can be passed
    props.onAddGoal(userGoalText);
    // Clear user input upon goal addition
    setUserGoalText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputAdjustment}
        placeholder="Your course goal!"
        // No parentheses are added here "()", in other words it's not executed since if the parentheses were added the function
        // would execute immediately upon parsing this section of code, which could mess up the UI. As it is now, instead it will
        // now have React execute it whenever it detects a text change
        onChangeText={typeGoalHandler}
        value={userGoalText}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
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
});

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
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
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        {/* The two dots at the start are to go up one level to reach the relative path to the image */}
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.inputAdjustment}
          placeholder="Your course goal!"
          // No parentheses are added here "()", in other words it's not executed since if the parentheses were added the function
          // would execute immediately upon parsing this section of code, which could mess up the UI. As it is now, instead it will
          // now have React execute it whenever it detects a text change
          onChangeText={typeGoalHandler}
          value={userGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Close" onPress={props.onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  inputAdjustment: {
    borderWidth: 1,
    borderColor: "#cccccc",
    // The element that receives this styling will take up 80% of the overarching containers width
    width: "100%",
    marginRight: 8,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});

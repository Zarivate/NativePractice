import { useState } from "react";
import {
  StyleSheet,
  View,
  // ScrollView best for small non dynamic lists since it loads all of a lists content at once, even if not on user screen
  // has potential too slow down app
  // Best for larger dynamic lists where you want the rest of a list too load as the user navigates to it
  FlatList,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [userGoals, setUserGoals] = useState([]);

  function addGoalHandler(userGoalText) {
    setUserGoals((currentGoals) => [
      ...currentGoals,
      { text: userGoalText, id: Math.random().toString() },
    ]);
  }

  function deleteGoal(id) {
    setUserGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    // More than on stylesheet can be used in the JSC code because of how the whole file is
    // parsed firsthand before executing anything
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      {/* In order to ensure that the correct amount of space is taken up by the user's typed goals, another view
      is made above the scroll view to have both a scrollable section and also have it take up the correct amount of space */}
      <View style={styles.goalsContainer}>
        <FlatList
          data={userGoals}
          renderItem={(itemDataObject) => {
            return (
              <GoalItem
                text={itemDataObject.item.text}
                id={itemDataObject.item.id}
                onDelete={deleteGoal}
              />
            );
            /* The underlying element that View is compiled into is a widget that can have it's corners rounded, helps get around IOS
            restraint of underlying translated images not having same properties as Android. Styles also don't cascade here in Native
            It's why some text color changes may not apply to "goal" property below, as instead it's applied to the View element */
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
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
  goalsContainer: {
    flex: 2,
  },
});

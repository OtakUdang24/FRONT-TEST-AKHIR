import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from "react-navigation";

import FormScreen from "../screens/Form/index";
import HomeScreen from "../screens/Home/index";
import QScreen from "../screens/Question/QScreen";


const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    QScreen: QScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const FormStack = createStackNavigator(
    {
      Form: FormScreen,
    },
    {
      headerMode: "none",
      navigationOptions: {
        headerVisible: false
      },
    }
);

const AppRoute = createSwitchNavigator(
    {
        Form: FormStack,
        App: AppStack
    },
    {
      initialRouteName: "App"
    }
)
export default createAppContainer(AppRoute);
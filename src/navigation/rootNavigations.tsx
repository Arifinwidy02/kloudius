import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextValue } from '../types/auth';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();
export const RootNavigations = () => {
  const navigation = useNavigation<any>();
  const { logout } = useContext<AuthContextValue>(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => {
            return (
              <IconButton
                icon="logout"
                onPress={async () => {
                  await logout?.();
                  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
                accessibilityLabel="Logout"
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

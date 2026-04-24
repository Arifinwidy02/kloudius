import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextValue } from '../types/auth';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View } from 'react-native';
const Stack = createStackNavigator();
export const RootNavigations = () => {
  const { logout, userToken, loading } =
    useContext<AuthContextValue>(AuthContext);
  const isLoggedIn = !!userToken;
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
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
                  }}
                  accessibilityLabel="Logout"
                />
              );
            },
          }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Device from '../screens/Device';
import Profile from '../screens/Profile';
import User from '../screens/User';
import Changepassword from '../screens/Changepassword';
import Genqrcode from '../screens/Genqrcode';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				title: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					bottom: 25,
					left: 20,
					right: 20,
					elevation: 0,
					backgroundColor: '#ffffff',
					borderRadius: 15,
					height: 90,
					...styles.shadow,
				},
			}}
		>
			<Tab.Screen
				name="Main"
				component={Welcome}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../assets/img/25694.png')}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#e32f45' : '#748c94',
								}}
							/>
							<Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Home</Text>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Device"
				component={Device}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../assets/img/71576.png')}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#e32f45' : '#748c94',
								}}
							/>
							<Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Device</Text>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../assets/img/71576.png')}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#e32f45' : '#748c94',
								}}
							/>
							<Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Profile</Text>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="home" component={HomeTabs} />
				<Stack.Screen name="login" component={Login} />
				<Stack.Screen name="qrcode" component={Genqrcode} />
				<Stack.Screen
					name="user"
					options={{
						headerShown: true,
					}}
					component={User}
				/>

				<Stack.Screen
					name="Changepassword"
					options={{
						headerShown: true,
					}}
					component={Changepassword}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});

export default Navigation;

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import {
	AppBar,
	IconButton,
	FAB,
	Avatar,
	VStack,
	Box,
	Divider,
	ListItem,
	Switch,
	HStack,
	Banner,
	Button,
} from '@react-native-material/core';
import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
	const navigate = useNavigation();
	const [checked, setChecked] = useState(true);
	return (
		<>
			<Box h={150} style={{ backgroundColor: '#faf089' }} />
			<Avatar
				icon={(props) => <Icon name="account" {...props} />}
				size={120}
				color="orange"
				style={{
					top: 10,
					position: 'absolute',
					alignSelf: 'center',
				}}
			/>

			<ListItem
				title="Edit Profile"
				onPress={() => navigate.navigate('user')}
				style={{
					backgroundColor: 'red',
				}}
				titleStyle={{
					color: 'red',
				}}
				leading={
					<Ionicons
						name="person"
						style={{
							color: 'red',
							fontSize: 25,
						}}
					/>
				}
			/>
			<ListItem
				title="Change Password"
				onPress={() => navigate.navigate('Changepassword')}
				style={{
					backgroundColor: 'red',
                    height:200
				}}
				titleStyle={{
					color: 'red',
				}}
				leading={
					<Ionicons
						name="person"
						style={{
							color: 'red',
							fontSize: 25,
						}}
					/>
				}
			/>
		</>
	);
};

export default Profile;

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { ListItem, Avatar, Button, HStack, Banner, ActivityIndicator } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { baseUrl } from '../config';
import { useNavigation } from '@react-navigation/native';
import {
	StyledContainer,
	InnerContainer,
	PageLogo,
	PageTitle,
	SubTitle,
	StyledFormArea,
	LeftIcon,
	RightIcon,
	StyledButton,
	ButtonText,
	StyledTextInput,
	StyledInputLabel,
	Colors,
	MsgBox,
	Line,
} from '../components/styles';
const { brand, darkLight } = Colors;

import { StatusBar } from 'expo-status-bar';
const Device = () => {
	const navagate = useNavigation()
	const [checked, setChecked] = useState(true);
	const [enabled, setEnabled] = useState(true);
	const [device, setDevice] = useState([]);
	const [count, setCount] = useState([]);
	const [role, setRole] = useState([]);
	const [err, setErr] = useState(false);
	const getdata = async () => {
		const d = await AsyncStorage.getItem('qrcode');
		const item = await AsyncStorage.getItem('company_id');
		setRole(d);
		axios
			.get(`${baseUrl}/getdeviceuuid/${item}`)
			.then((res) => {
				setDevice(res.data.data.list);
				setCount(res.data.data.totalCount);
				setErr(false);
			})
			.catch((error) => {
				console.log(error.message);
				alert(error.message);
			});
	};
	React.useEffect(() => {
		setErr(true);
		getdata();
	}, []);

	const show = device.map((row) => {
		if (count > 0 && role == 0) {
			
			return (
				<ListItem
					key={row.id}
					leading={
						<Avatar
							image={{
								uri: 'https://play-lh.googleusercontent.com/JZogTRPWJ2y3bOLItnLVpzsf_GjcNPdQpzoNSL_EMo6JO20i0WwjaLj1wr5Ky5tYhg',
							}}
						/>
					}
					leadingMode="avatar"
					title={'เครื่อง : ' + row.name}
					secondaryText={
						<HStack spacing={6} style={{ flexDirection: 'row', flex: 1 }}>
							<Button title="เปิดประตู" variant="outlined" style={{ margin: 0, textAlign: 'center' }} />
							<Button title="ออก QRCODE" variant="outlined"  onPress={()=>navagate.navigate('qrcode',{id:row.devSn})} style={{ textAlign: 'center' }} />
						</HStack>
					}
				/>
			);
		}
		if (count > 0 && role != 0) {
			return (
				<ListItem
					key={row.id}
					leading={
						<Avatar
							image={{
								uri: 'https://play-lh.googleusercontent.com/JZogTRPWJ2y3bOLItnLVpzsf_GjcNPdQpzoNSL_EMo6JO20i0WwjaLj1wr5Ky5tYhg',
							}}
						/>
					}
					leadingMode="avatar"
					title={'เครื่อง : ' + row.name}
					secondaryText={
						<HStack spacing={6} style={{ flexDirection: 'row', flex: 1 }}>
							<Button title="เปิดประตู" variant="outlined" style={{ margin: 0, textAlign: 'center' }} />
						</HStack>
					}
				/>
			);
		}
		if (count === 0) {
			return <View>ไม่มีข้อมูล</View>;
		}
	});

	return (
		<>
			{err && (
				<View
					style={{
						minHeight: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignSelf: 'center',
						bottom: 150,
					}}
				>
					<ActivityIndicator size="large" style={{ width: 150, color: brand }} />
				</View>
			)}
			<Banner
				illustration={(props) => (
					<Avatar
						color="primary"
						icon={() => <MaterialIcons name="devices-other" size={24} color="white" />}
						{...props}
					/>
				)}
				text="Device ตามจุดต่างๆ"
				textStyle={{
					marginTop: 5,
					fontSize: 25,
				}}
			/>

			{show}
		</>
	);
};

export default Device;

import { View, Text, Button, Platform } from 'react-native';
import React, { useState } from 'react';
import {
	StyledContainer,
	InnerContainer,
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

import { Ionicons, Octicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { baseUrl } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
const { brand, darkLight } = Colors;
const Genqrcode = ({ route }) => {
	const { id } = route.params;

	const [devsns, setdevsns] = React.useState();
	const [usableCount, setusableCount] = React.useState();
	const [startDate, setstartDate] = React.useState(new Date());
	const [endDate, setendDate] = useState(new Date());
	const [visitor_name, setvisitor_name] = React.useState();
	const [created_by, setcreated_by] = React.useState();
	const [date, setDate] = useState(new Date());
	const start = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
	const end = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
	console.log(start, 'start');
	console.log(end, 'end');
	const onChange = (event, selectedDate) => {
		console.log(event);
		const currentDate = selectedDate;
		setstartDate(currentDate);
	};
	const onChange2 = (event, selectedDate) => {
		const currentDate = selectedDate;
		setendDate(currentDate);
	};
	const showMode = async (currentMode, type) => {
		if (type === 'end') {
			DateTimePickerAndroid.open({
				onChange,
				value: endDate,
				mode: currentMode,
				is24Hour: true,
			});
		}
		if (type === 'start') {
			DateTimePickerAndroid.open({
				value: startDate,
				mode: currentMode,
				is24Hour: true,
				onChange,
			});
		}
	};

	const showDatepicker = () => {
		showMode('date', 'start');
	};

	const showTimepicker = () => {
		showMode('time', 'start');
	};
	const Showios = () => {
		showMode('datetime', 'start');
	};
	const showEndDatepicker = () => {
		showMode('date', 'end');
	};

	const showEndTimepicker = () => {
		showMode('time', 'end');
	};

	const ShowEndios = () => {
		showMode('datetime', 'end');
	};
	const navigation = useNavigation();
	const userInfo = {
		devsns: devsns,
		usableCount: usableCount,
		startDate: startDate,
		visitor_name: visitor_name,
		created_by: created_by,
	};

	const Datetimepic = () => {
		if (Platform.OS === 'android') {
			return (
				<>
					<Button onPress={showDatepicker} title="เลือกวันที่เริ่มต้น" />
					<Line />
					<Button onPress={showTimepicker} title="เลือกเวลาเริ่ม" />
					<Line />
					<Button onPress={showEndDatepicker} title="end" />
					<Line />
					<Button onPress={showEndTimepicker} title="เลือกเวลาสิ้นสุด" />
				</>
			);
		}
		if (Platform.OS === 'ios') {
			return (
				<>
					<Button onPress={Showios} title="เลือกวันที่และเวลาเริ่มต้น" />
					<Line />
					<Button onPress={ShowEndios} title="เลือกวันที่และเวลาสิ้นสุด" />
				</>
			);
		}
	};

	React.useEffect(() => {}, []);

	return (
		<StyledContainer>
			<InnerContainer>
				<Formik initialValues={userInfo}>
					{({ handleChange, handleBlur, handleSubmit }) => (
						<StyledFormArea>
							<MyTextInput
								label="visitor_name"
								icon="person"
								placeholder="visitor_name"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								values={visitor_name}
								keyboardType="email-address"
							/>
							<Datetimepic />

							<MyTextInput
								label="usableCount"
								icon="mail"
								placeholder="usableCount"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								values={usableCount}
								keyboardType="email-address"
							/>
							<MsgBox>...</MsgBox>
							<StyledButton onPress={handleSubmit}>
								<ButtonText>Add</ButtonText>
							</StyledButton>
						</StyledFormArea>
					)}
				</Formik>
			</InnerContainer>
		</StyledContainer>
	);
};
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
	return (
		<View style={{ marginTop: 15 }}>
			<LeftIcon>
				<Octicons name={icon} size={30} color={brand} />
			</LeftIcon>
			<StyledInputLabel>{label}</StyledInputLabel>
			<StyledTextInput {...props} />
			{isPassword && (
				<RightIcon onPress={() => setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
				</RightIcon>
			)}
		</View>
	);
};
export default Genqrcode;

import React, { useState } from 'react';
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
import { Formik } from 'formik';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import axios from 'axios';

import { Octicons, Ionicons } from '@expo/vector-icons';

//colors
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../config';
const { brand, darkLight } = Colors;

const Login = () => {
	const navigation = useNavigation();
	const userInfo = {
		email: '',
		password: '',
	};

	const { email, password } = userInfo;
	const login = async (values) => {
		axios
			.post(`${baseUrl}/login`, {
				email: values.email,
				password: values.password,
			})
			.then(async (data) => {
				if (data.data.status === 200) {
					await AsyncStorage.setItem('token', data.data.token);
					await AsyncStorage.setItem('logged_in_status', JSON.stringify(true));
					await AsyncStorage.setItem('user_id', JSON.stringify(data.data.user[0].user_id));
					await AsyncStorage.setItem('email', data.data.user[0].email);
					await AsyncStorage.setItem('company_id', JSON.stringify(data.data.user[0].company_id));
					await AsyncStorage.setItem('position', JSON.stringify(data.data.user[0].position));
					await AsyncStorage.setItem('qrcode', JSON.stringify(data.data.user[0].qrcode));

					alert('Login สำเร็จ');
					navigation.navigate('home');
				}
				if (data.data.status === 400) {
					alert('ชื่อหรือรหัสผ่านไม่ถูกต้อง');
				}
			})
			.catch((error) => {
				console.log(error.message);
				alert(error.message);
			});
	};

	const [hidePassword, setHidePassword] = useState(true);
	return (
		<StyledContainer>
			<StatusBar style="dark" />
			<InnerContainer>
				<PageLogo resizeMode="cover" source={require('../assets/icon.png')} />
				<PageTitle>Flower Crib</PageTitle>
				<SubTitle>Account Login</SubTitle>
				<StatusBar style="auto" />
				<Formik initialValues={userInfo} onSubmit={login}>
					{({ handleChange, handleBlur, handleSubmit }) => (
						<StyledFormArea>
							<MyTextInput
								label="Email Address"
								icon="mail"
								placeholder="example@gmail.com"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								values={email}
								keyboardType="email-address"
							/>
							<MyTextInput
								label="Password"
								icon="person"
								placeholder="password"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								values={password}
								keyboardType="password"
								secureTextEntry={hidePassword}
								isPassword={true}
								hidePassword={hidePassword}
								type="password"
								setHidePassword={setHidePassword}
							/>
							<MsgBox>...</MsgBox>
							<StyledButton onPress={handleSubmit}>
								<ButtonText>Login</ButtonText>
							</StyledButton>
							<Line />
							<StyledButton onPress={handleSubmit}>
								<ButtonText>SignIn</ButtonText>
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
		<View>
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
export default Login;

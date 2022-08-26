import { View, Text } from 'react-native';
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
import { Ionicons, Octicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { baseUrl } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const { brand, darkLight } = Colors;
const Changepassword = () => {
	const [name, setName] = React.useState();
	const [lastname, setLastName] = React.useState();
	const [email, setEmail] = React.useState();
	const [back, setBack] = React.useState(false);
	const [oldPassword, setOldpassword] = React.useState('');
	const [newPassword, setnewPassword] = React.useState('');
	const navigation = useNavigation();
	const userInfo = {
		email: email,
		lastname: lastname,
		name: name,
	};
	const getdata = async () => {
		const item = await AsyncStorage.getItem('user_id');
		axios
			.get(`${baseUrl}/getOnedata/${item}`)
			.then((res) => {
				setName(res.data.data[0].first_name);
				setLastName(res.data.data[0].last_name);
				setEmail(res.data.data[0].email);
			})
			.catch((error) => {
				console.log(error.message);
				alert(error.message);
			});
	};
	React.useEffect(() => {
		getdata();
	}, [name]);

	const [hidePassword, setHidePassword] = useState(true);
	return (
		<StyledContainer>
			<InnerContainer>
				<Formik initialValues={userInfo}>
					{({ handleChange, handleBlur, handleSubmit }) => (
						<StyledFormArea>
							<MyTextInput
								label="Password"
								icon="person"
								placeholder="password"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								values={oldPassword}
								keyboardType="password"
								secureTextEntry={hidePassword}
								isPassword={true}
								hidePassword={hidePassword}
								type="password"
								setHidePassword={setHidePassword}
							/>
							<MyTextInput
								label="Newpass"
								icon="person"
								placeholder="Newpass"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								values={newPassword}
								keyboardType="password"
								secureTextEntry={hidePassword}
								isPassword={true}
								hidePassword={hidePassword}
								type="password"
								setHidePassword={setHidePassword}
							/>

							<StyledButton onPress={handleSubmit}>
								<ButtonText>Update</ButtonText>
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
export default Changepassword;

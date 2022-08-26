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
const User = () => {
	const [name, setName] = React.useState();
	const [lastname, setLastName] = React.useState();
	const [email, setEmail] = React.useState();
	const [back, setBack] = React.useState(false);
	const navigation = useNavigation();
	const userInfo = {
		email: email,
		lastname: lastname,
        name:name
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
					{({ handleChange, handleBlur, handleSubmit}) => (
						<StyledFormArea>
							<MyTextInput
								label="FirstName"
								icon="person"
								placeholder="FirstName"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('email')}
                                defaultValue={name}
								onBlur={handleBlur('email')}
								values={name}
								keyboardType="email-address"
							/>
							<MyTextInput
								label="LastName"
								icon="person"
								placeholder="LastName"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
                                defaultValue={lastname}
								values={lastname}
								keyboardType="username"
							/>

							<MyTextInput
								label="Email"
								icon="mail"
								placeholder="Email"
								placeholderTextColor={darkLight}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
                                defaultValue={email}
								values={email}
								keyboardType="email-address"
								secureTextEntry={hidePassword}
								setHidePassword={setHidePassword}
							/>
							<MsgBox>...</MsgBox>
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
export default User;

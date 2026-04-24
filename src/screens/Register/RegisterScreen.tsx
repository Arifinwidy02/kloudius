import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { Screen } from '../../components/layout/Screen';
import { AuthContext } from '../../context/AuthContext';
import { signUpSchema } from '../../utils/validation/signUpSchema';
import { useToast } from '../../context/ToastContext';
import { DataSignUpType } from '../../types/auth';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const { signUp, loading } = useContext<any>(AuthContext);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { showError, showSuccess } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<DataSignUpType>({
    defaultValues: { name: '', email: '', password: '' },
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: DataSignUpType) => {
    if (!signUp) {
      showError('Sign up is not available');
      return;
    }

    const res = await signUp(data);

    if (res?.success) {
      showSuccess('Account Created Successfully!');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      return;
    }

    showError(res?.message ?? 'Sign up failed');
  };

  return (
    <Screen>
      <View
        style={{
          padding: 16,
        }}
      >
        <Text
          variant="headlineSmall"
          style={{
            marginBottom: 10,
            fontWeight: '700',
          }}
        >
          Sign up
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Name"
              mode="outlined"
              autoCapitalize="words"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={!!errors.name}
              style={{ backgroundColor: 'transparent' }}
            />
          )}
        />
        <HelperText
          type="error"
          visible={!!errors.name}
          style={{ marginLeft: -10 }}
        >
          {errors.name?.message}
        </HelperText>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={!!errors.email}
              style={{ backgroundColor: 'transparent' }}
            />
          )}
        />
        <HelperText
          type="error"
          visible={!!errors.email}
          style={{ marginLeft: -10 }}
        >
          {errors.email?.message}
        </HelperText>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={isPasswordHidden}
              textContentType="newPassword"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={!!errors.password}
              style={{ backgroundColor: 'transparent' }}
              right={
                <TextInput.Icon
                  icon={isPasswordHidden ? 'eye' : 'eye-off'}
                  onPress={() => setIsPasswordHidden(v => !v)}
                  accessibilityLabel={
                    isPasswordHidden ? 'Show password' : 'Hide password'
                  }
                />
              }
            />
          )}
        />
        <HelperText
          type="error"
          visible={!!errors.password}
          style={{ marginLeft: -10 }}
        >
          {errors.password?.message}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting || !!loading}
          loading={isSubmitting || !!loading}
          style={{ marginTop: 10 }}
        >
          Create account
        </Button>

        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Text>Already have an account?</Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            compact
          >
            Sign in
          </Button>
        </View>
      </View>
    </Screen>
  );
};

export default RegisterScreen;

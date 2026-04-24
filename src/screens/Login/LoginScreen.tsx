import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { Screen } from '../../components/layout/Screen';
import { AuthContext } from '../../context/AuthContext';
import { loginSchema } from '../../utils/validation/loginSchema';
import { useToast } from '../../context/ToastContext';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { signIn, loading } = useContext<any>(AuthContext);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { showError, showSuccess } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    const res = await signIn?.(data);

    if (res?.success) {
      showSuccess('Login success');
      return;
    }

    showError(res?.message ?? 'Invalid credentials');
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
          Sign in
        </Text>

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
              textContentType="password"
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
          Sign in
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
          <Text>Don't have an account yet ?</Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            compact
          >
            Sign up
          </Button>
        </View>
      </View>
    </Screen>
  );
};

export default LoginScreen;

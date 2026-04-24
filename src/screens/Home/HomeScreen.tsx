import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Surface, Text } from 'react-native-paper';
import { Screen } from '../../components/layout/Screen';
import users from '../../constant/users';
import { AuthContext } from '../../context/AuthContext';
import { getUsers } from '../../services/userDB';
import { AuthContextValue } from '../../types/auth';

export const HomeScreen = () => {
  const { email } = useContext<AuthContextValue>(AuthContext);
  const [name, setName] = useState<string>('User');

  const initials = useMemo(() => {
    const source = (name || 'U').trim();
    return (
      source
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase() || source.slice(0, 2).toUpperCase()
    );
  }, [name]);

  useEffect(() => {
    let mounted = true;
    const loadName = async () => {
      const foundInSeed = users.find(u => u.email === email)?.name;
      if (foundInSeed) {
        if (mounted) setName(foundInSeed);
        return;
      }

      try {
        const stored = await getUsers();
        const found = stored.find(u => u.email === email)?.name;
        if (mounted && found) setName(found);
      } catch {
        // ignore
      }
    };

    if (email) loadName();
    return () => {
      mounted = false;
    };
  }, [email]);

  return (
    <Screen>
      <View
        style={{
          padding: 16,
        }}
      >
        <Surface
          elevation={1}
          style={{
            padding: 16,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Avatar.Text size={56} label={initials} />
            <View style={{ flex: 1 }}>
              <Text variant="titleMedium" style={{ fontWeight: '700' }}>
                {name}
              </Text>
              <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
                {email ?? '-'}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 14 }}>
            <Text variant="bodySmall" style={{ opacity: 0.6 }}>
              You are logged in.
            </Text>
          </View>
        </Surface>
      </View>
    </Screen>
  );
};

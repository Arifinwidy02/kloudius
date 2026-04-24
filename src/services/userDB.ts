import EncryptedStorage from 'react-native-encrypted-storage';
import { StoredUser } from '../types/auth';

const USERS_KEY = 'users_db';

export async function getUsers(): Promise<StoredUser[]> {
  const raw = await EncryptedStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}
export async function addUser(user: Omit<StoredUser, 'id'>) {
  const users = await getUsers();
  const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const next = [...users, { id: nextId, ...user }];
  await EncryptedStorage.setItem(USERS_KEY, JSON.stringify(next));
}
export async function isUserExists(email: string) {
  const users = await getUsers();
  return users.some(u => u.email === email);
}

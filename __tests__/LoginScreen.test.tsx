import { loginSchema } from '../src/utils/validation/loginSchema';

describe('loginSchema validation', () => {
  it('should be valid for johnD email and password', async () => {
    const validData = { email: 'johnD@mail.com', password: 'password' };
    const isValid = await loginSchema.isValid(validData);
    expect(isValid).toBe(true);
  });

  it('should be invalid if email format is wrong', async () => {
    const invalidData = { email: 'not-an-email', password: 'password' };
    await expect(loginSchema.validate(invalidData)).rejects.toThrow('Invalid email');
  });

  it('should be invalid if email or password are empty', async () => {
    const emptyData = { email: '', password: '' };
    const isValid = await loginSchema.isValid(emptyData);
    expect(isValid).toBe(false);
  });
});


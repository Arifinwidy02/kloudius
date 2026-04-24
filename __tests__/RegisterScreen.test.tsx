import { signUpSchema } from '../src/utils/validation/signUpSchema';

describe('signUpSchema validation', () => {
  it('should be valid for adding a new user (register)', async () => {
    const validData = {
      name: 'Jane Doe',
      email: 'jane@mail.com',
      password: 'password',
    };
    const isValid = await signUpSchema.isValid(validData);
    expect(isValid).toBe(true);
  });

  it('should be invalid if email format is wrong', async () => {
    const invalidData = {
      name: 'Jane Doe',
      email: 'not-an-email',
      password: 'password',
    };
    await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
      'Invalid email',
    );
  });

  it('should be invalid if required fields are empty', async () => {
    const emptyData = { name: '', email: '', password: '' };
    const isValid = await signUpSchema.isValid(emptyData);
    expect(isValid).toBe(false);
  });
});

# Kloudius Assessment (React Native)

Small auth flow app built with React Native + React Navigation + React Native Paper.

## Tech stack

- **Runtime**: React Native `0.85.x`
- **UI**: `react-native-paper`
- **Forms**: `react-hook-form` + `yup`
- **Storage**: `react-native-encrypted-storage`
- **Toaster**: `react-native-easy-toast` (wrapped in app-level context)
- **Tests**: Jest + `@testing-library/react-native`

## Prerequisites

- Node.js **>= 22.11.0**
- Bun installed (`bun --version`)
- React Native environment setup (Android Studio / Xcode)

## Install dependencies

This repo uses **Bun** as the package manager.

```bash
bun install
```

## Run the app

Start Metro:

```bash
bun start
```

Run Android:

```bash
bun run android
```

Run iOS:

```bash
cd ios && pod install && cd ..
bun run ios
```

## Running tests

```bash
bun run test
```

## Demo credentials

There is a seeded user for quick login:

- **email**: `johnD@mail.com`
- **password**: `password`

You can also create a new account via **Sign up**, then login using that newly created email/password.

## Why Bun (instead of Yarn / npm)

- **Fast installs**: Bun is typically faster at dependency resolution + installation, which helps reviewers bootstrap quickly.
- **Single tool**: Bun provides package manager + script runner in one (`bun install`, `bun run ...`).
- **Lockfile consistency**: This repo includes `bun.lock` to keep installs reproducible.

If you prefer Yarn/npm, the project will still work, but the documented commands assume Bun.

## Auth persistence (6 minutes) — please change on that variabel to change the persistance auth

Login session is persisted using `react-native-encrypted-storage` under the key `user_session`.

- **Store**: `src/services/storage.ts` (`storeUserSession`)
- **Load/validate TTL**: `src/context/AuthContext.tsx`

The expiration is controlled by this constant:

- `SESSION_TTL_MS` in `src/context/AuthContext.tsx` (default **6 minutes**)

To change it, update:

```ts
const SESSION_TTL_MS = 6 * 60 * 1000;
```

Example: make it 30 seconds:

```ts
const SESSION_TTL_MS = 30 * 1000;
```

## Toaster behavior

Toasts are provided via `ToastProvider`:

- `src/context/ToastContext.tsx`
- Error toast: **red background + white text** (shown from top)
- Success toast: **green background + white text** (shown from top)

Used in:

- `LoginScreen`: success toast when login succeeds → navigates to Home; error toast for invalid credentials
- `RegisterScreen`: success toast when sign up succeeds → navigates back to Login

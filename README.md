# FormsPage

A standalone **React Native / Expo** demo showcasing core form components — built as a plain, unstyled reference sheet.

## Components Demonstrated

| Component | Usage |
|---|---|
| `TextInput` | Single-line, email, phone, password, numeric, multiline |
| `Button` | Form submit & reset |
| `Switch` | Newsletter toggle |
| `ActivityIndicator` | Loading state while submitting |
| `Alert` | Shows submitted JSON payload |
| `SafeAreaView` + `ScrollView` | Page shell |

## Screens

- **Sign In** — email + password fields, submit logs JSON to console
- **Sign Up** — full name, email, phone, password, quantity, switch, multiline notes

## Getting Started

```bash
npm install
npx expo start
```

Open in Expo Go or a development build.

## Structure

```
FormsPage/
├── src/
│   └── app/
│       ├── _layout.tsx   # Expo Router root layout
│       └── index.tsx     # Main forms screen
├── app.json
├── package.json
└── tsconfig.json
```

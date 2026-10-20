import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function FormsScreen() {
  // --- Tab: login | signup ---
  const [formMode, setFormMode] = useState<'login' | 'signup'>('signup');

  // --- LOGIN ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // --- SIGNUP ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [subscribe, setSubscribe] = useState(true);
  const [notes, setNotes] = useState('');

  // --- SHARED ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);

  const handleLoginSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const payload = {
        form: 'login',
        email: loginEmail,
        passwordLength: loginPassword.length,
        submittedAt: new Date().toISOString(),
      };
      console.log('=== LOGIN SUBMIT ===');
      console.log(JSON.stringify(payload, null, 2));
      setSubmittedData(payload);
      setIsSubmitting(false);
      Alert.alert('Login Submitted', JSON.stringify(payload, null, 2));
    }, 400);
  };

  const handleSignUpSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const payload = {
        form: 'signup',
        fullName: name,
        email,
        phone,
        passwordLength: password.length,
        quantity: Number(quantity) || 1,
        subscribeToNewsletter: subscribe,
        deliveryNotes: notes,
        submittedAt: new Date().toISOString(),
      };
      console.log('=== SIGN UP SUBMIT ===');
      console.log(JSON.stringify(payload, null, 2));
      setSubmittedData(payload);
      setIsSubmitting(false);
      Alert.alert('Sign Up Submitted', JSON.stringify(payload, null, 2));
    }, 400);
  };

  const handleReset = () => {
    setLoginEmail('');
    setLoginPassword('');
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setQuantity('1');
    setSubscribe(true);
    setNotes('');
    setSubmittedData(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* ── Header ─────────────────────────────────────── */}
        <Text style={styles.heading}>React Native — Core Form Components</Text>
        <Text style={styles.subheading}>
          Components: TextInput · Button · Switch · ActivityIndicator
        </Text>

        <View style={styles.divider} />

        {/* ── Tab Toggle ─────────────────────────────────── */}
        <View style={styles.tabRow}>
          <Button
            title={formMode === 'login' ? '• Sign In (Active)' : 'Sign In'}
            onPress={() => setFormMode('login')}
          />
          <View style={styles.gap} />
          <Button
            title={formMode === 'signup' ? '• Sign Up (Active)' : 'Sign Up'}
            onPress={() => setFormMode('signup')}
          />
        </View>

        <View style={styles.divider} />

        {/* ── LOGIN FORM ─────────────────────────────────── */}
        {formMode === 'login' ? (
          <View style={styles.formBox}>
            <Text style={styles.formTitle}>Sign In</Text>

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={loginEmail}
              onChangeText={setLoginEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {isSubmitting ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#0066cc" />
                <Text style={styles.loadingText}>Processing…</Text>
              </View>
            ) : (
              <View style={styles.btnWrap}>
                <Button title="Sign In & Log JSON to Console" onPress={handleLoginSubmit} />
              </View>
            )}

            <View style={styles.btnWrap}>
              <Button title="Reset" color="#888888" onPress={handleReset} />
            </View>
          </View>

        ) : (
          /* ── SIGN UP FORM ──────────────────────────────── */
          <View style={styles.formBox}>
            <Text style={styles.formTitle}>Sign Up</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />

            {/* Switch row */}
            <View style={styles.switchRow}>
              <Text style={styles.label}>Subscribe to newsletter  (Switch)</Text>
              <Switch value={subscribe} onValueChange={setSubscribe} />
            </View>

            <Text style={styles.label}>Delivery Notes  (Multiline TextInput)</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Any special requests…"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />

            {isSubmitting ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#0066cc" />
                <Text style={styles.loadingText}>Submitting…</Text>
              </View>
            ) : (
              <View style={styles.btnWrap}>
                <Button title="Create Account & Log JSON to Console" onPress={handleSignUpSubmit} />
              </View>
            )}

            <View style={styles.btnWrap}>
              <Button title="Reset" color="#888888" onPress={handleReset} />
            </View>
          </View>
        )}

        {/* ── JSON Output ────────────────────────────────── */}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Console Output (JSON Payload)</Text>

        {submittedData ? (
          <View style={styles.jsonBox}>
            <Text style={styles.jsonText}>{JSON.stringify(submittedData, null, 2)}</Text>
          </View>
        ) : (
          <Text style={styles.emptyNote}>
            No submission yet. Fill the form above and press submit.
          </Text>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 14,
  },
  tabRow: {
    flexDirection: 'row',
  },
  gap: {
    width: 10,
  },
  formBox: {
    gap: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888888',
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
  },
  multiline: {
    height: 70,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  btnWrap: {
    marginTop: 8,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 13,
    color: '#0066cc',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  jsonBox: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 12,
    borderRadius: 4,
  },
  jsonText: {
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
    fontSize: 12,
  },
  emptyNote: {
    fontSize: 13,
    color: '#777777',
    fontStyle: 'italic',
  },
});

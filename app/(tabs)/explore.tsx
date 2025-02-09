import { StyleSheet, View, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { useFCMNotifications } from '@/hooks/useFCMNotifications';

export default function TabTwoScreen() {
  const { notification } = useFCMNotifications();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Notifications Firebase avec FCM</Text>
        {notification && (
          <View style={styles.notificationContainer}>
            <Text style={styles.label}>Dernière notification reçue :</Text>
            <Text style={styles.notificationText}>{JSON.stringify(notification.notification?.body, null, 2)}</Text>
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  token: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  notificationContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
  },
  notificationText: {
    fontSize: 14,
  },
});

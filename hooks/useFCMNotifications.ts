// useFCMNotifications.ts
import { useEffect, useState } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

interface UseFCMNotificationsResult {
  fcmToken: string | null;
  notification: FirebaseMessagingTypes.RemoteMessage | null;
}

/**
 * Ce hook s'occupe de :
 *  - Demander les permissions pour les notifications,
 *  - Récupérer le token FCM natif,
 *  - Installer des listeners pour les notifications en premier plan et celles qui ouvrent l'app.
 */
export function useFCMNotifications(): UseFCMNotificationsResult {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<FirebaseMessagingTypes.RemoteMessage | null>(null);

  useEffect(() => {
    // Demander la permission et récupérer le token FCM
    async function requestPermissionAndRegister() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        Alert.alert("Permission refusée", "Les notifications ne seront pas activées.");
        return;
      }

      try {
        const token = await messaging().getToken();
        setFcmToken(token);
        console.log('FCM Token:', token);
      } catch (error) {
        console.error("Erreur lors de la récupération du token FCM", error);
      }
    }

    requestPermissionAndRegister();

    // Listener pour les messages reçus lorsque l'app est au premier plan
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log('Notification reçue en premier plan:', remoteMessage);
      setNotification(remoteMessage);
    });

    // Listener pour les notifications lorsque l'utilisateur interagit avec la notification
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification ouverte:', remoteMessage);
      setNotification(remoteMessage);
    });

    // Vérifier si l'application a été lancée par une notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('App lancée par une notification:', remoteMessage);
          setNotification(remoteMessage);
        }
      });

    // Cleanup : supprimer le listener
    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  return { fcmToken, notification };
}

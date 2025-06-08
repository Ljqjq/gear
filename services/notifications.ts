import * as Notifications from 'expo-notifications';
import { Event } from '../components/Event';

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

export async function scheduleEventNotification(event: Event) {
  try {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permissions not granted');
      return;
    }

    // For testing: Show notification after 10 seconds
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔔 Event Reminder',
        body: `${event.title}\n${event.description}\n\nStarts in 15 minutes`,
        data: { eventId: event.id },
        sound: true,
        priority: 'high',
      },
      trigger: {
        seconds: 10, // Test with 10 seconds
      },
    });

    console.log('Scheduled test notification for:', event.title);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}

export async function cancelEventNotification(eventId: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(eventId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
}

export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
} 
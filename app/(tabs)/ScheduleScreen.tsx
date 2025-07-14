import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { COLORS } from '../../src/shared/constants/theme';
import { useAppSelector } from '../../src/store/hooks';

const HOURS = Array.from({ length: 25 }, (_, i) => i); // 00:00 to 24:00
const TIMELINE_HEIGHT = 1440; // px, for 24 hours (60px per hour)
const HOUR_HEIGHT = TIMELINE_HEIGHT / (HOURS.length - 1); // 60px per hour
const TIMELINE_START_HOUR = 0;
const EVENT_MIN_HEIGHT = 32;
const EVENT_MARGIN = 6;
const EVENT_BG_OPACITY = 0.3;
const DETAILS_MIN_HEIGHT = 80;

function getMinutesSinceStart(date: Date) {
  return (date.getHours() - TIMELINE_START_HOUR) * 60 + date.getMinutes();
}

function getTypeColor(type: string) {
  switch (type) {
    case 'job':
      return COLORS.primary;
    case 'routine':
      return COLORS.secondary;
    case 'free-time':
      return COLORS.warning;
    default:
      return COLORS.text.secondary;
  }
}

function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const TimelineColumn = () => (
  <View style={styles.timelineColumn}>
    {HOURS.map((hour) => (
      <View key={hour} style={styles.timelineHour}>
        <Text style={styles.timelineHourText}>
          {hour.toString().padStart(2, '0') + ':00'}
        </Text>
      </View>
    ))}
  </View>
);

const EventsColumn = ({ events, expandedEventId, setExpandedEventId }: { events: any[], expandedEventId: string|null, setExpandedEventId: (id: string|null) => void }) => (
  <View style={styles.eventsColumn}>
    {events.map((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      const startMin = getMinutesSinceStart(start);
      const endMin = getMinutesSinceStart(end);
      const top = (startMin / 60) * HOUR_HEIGHT + EVENT_MARGIN / 2;
      let height = Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT, EVENT_MIN_HEIGHT) - EVENT_MARGIN;
      const color = getTypeColor(event.type);
      let bgColor = color;
      if (bgColor.startsWith('#')) {
        bgColor = hexToRgba(bgColor, EVENT_BG_OPACITY);
      } else if (bgColor.startsWith('rgba')) {
        bgColor = bgColor.replace(/rgba?\(([^,]+),([^,]+),([^,]+)(?:,[^)]*)?\)/, (m, r, g, b) => `rgba(${r},${g},${b},${EVENT_BG_OPACITY})`);
      } else if (bgColor.startsWith('rgb')) {
        bgColor = bgColor.replace('rgb(', 'rgba(').replace(')', `,${EVENT_BG_OPACITY})`);
      } else {
        bgColor = `rgba(0,0,0,${EVENT_BG_OPACITY})`;
      }

      const isExpanded = expandedEventId === event.id;
      let showDetails = false;
      let expandedHeight = height;
      if (height >= DETAILS_MIN_HEIGHT) {
        showDetails = true;
      } else if (isExpanded) {
        showDetails = true;
        expandedHeight = DETAILS_MIN_HEIGHT;
      }

      const handlePress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedEventId(isExpanded ? null : event.id);
      };

      return (
        <TouchableOpacity
          key={event.id}
          activeOpacity={0.85}
          onPress={handlePress}
          style={[
            styles.eventBlock,
            {
              top,
              height: isExpanded ? expandedHeight : height,
              backgroundColor: bgColor,
              marginBottom: EVENT_MARGIN,
              zIndex: isExpanded ? 2 : 1,
            },
          ]}
        >
          <View style={[styles.eventColorLine, { backgroundColor: color }]} />
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventTimeRow}>
              <Ionicons name="time-outline" size={14} color={COLORS.background} style={{ marginRight: 4 }} />
              <Text style={styles.eventTime}>
                {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {' - '}
                {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            {showDetails && (
              <View style={styles.eventDetails}>
                {event.description ? (
                  <Text style={styles.eventDetailsText}>{event.description}</Text>
                ) : null}
                <Text style={styles.eventDetailsType}>Type: {event.type}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ScheduleScreen() {
  const events = useAppSelector((state) => state.events.events);
  const [expandedEventId, setExpandedEventId] = React.useState<string|null>(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // Filter events to only those on the selected day
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => setSelectedDate(prev => {
          const d = new Date(prev);
          d.setDate(d.getDate() - 1);
          return d;
        })}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 16, fontSize: 16 }}>
          {selectedDate.toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={() => setSelectedDate(prev => {
          const d = new Date(prev);
          d.setDate(d.getDate() + 1);
          return d;
        })}>
          <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.scheduleContainer}>
        <TimelineColumn />
        <View style={{ flex: 1, position: 'relative', height: TIMELINE_HEIGHT }}>
          <EventsColumn events={filteredEvents} expandedEventId={expandedEventId} setExpandedEventId={setExpandedEventId} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 24,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: TIMELINE_HEIGHT,
    paddingHorizontal: 16,
  },
  timelineColumn: {
    width: 56,
    marginRight: 8,
  },
  timelineHour: {
    height: HOUR_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 2,
  },
  timelineHourText: {
    color: COLORS.text.secondary,
    fontSize: 13,
  },
  eventsColumn: {
    flex: 1,
    position: 'relative',
    height: TIMELINE_HEIGHT,
  },
  eventBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    minHeight: EVENT_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventColorLine: {
    width: 5,
    height: '100%',
    borderRadius: 3,
    marginRight: 8,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 15,
  },
  eventTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  eventTime: {
    color: COLORS.background,
    fontSize: 12,
  },
  eventDetails: {
    marginTop: 8,
  },
  eventDetailsText: {
    color: COLORS.background,
    fontSize: 13,
    opacity: 0.85,
  },
  eventDetailsType: {
    color: COLORS.background,
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
}); 
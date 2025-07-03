import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    PanResponder,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { EventComponent as Event, EventForm, EventType } from '../../src/features/events';
import { COLORS } from '../../src/shared/constants/theme';
import { useAppDispatch, useAppSelector } from '../../src/store/hooks';
import { addEvent, deleteEvent, toggleEvent, updateEvent } from '../../src/store/slices/eventSlice';
import { homeStyles } from '../../src/styles/screens/home.styles';

export default function HomeScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>(['job', 'routine', 'free-time']);
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const pan = useRef(new Animated.ValueXY()).current;
  const currentDate = useRef(selectedDate);
  const [displayDate, setDisplayDate] = useState(selectedDate);
  const hasDateChanged = useRef(false);

  useEffect(() => {
    currentDate.current = selectedDate;
    setDisplayDate(selectedDate);
    hasDateChanged.current = false;
  }, [selectedDate]);

  const getFilterTypeColor = (type: EventType, isSelected: boolean) => {
    if (!isSelected) return COLORS.background;
    switch (type) {
      case 'job':
        return COLORS.primary;
      case 'routine':
        return COLORS.secondary;
      case 'free-time':
        return COLORS.warning;
      default:
        return COLORS.background;
    }
  };

  const getFilterTextColor = (type: EventType, isSelected: boolean) => {
    if(!isSelected) {
        switch (type) {
            case 'job':
                return COLORS.primary;
            case 'routine':
                return COLORS.secondary;
            case 'free-time':
                return COLORS.warning;
            default:
                return COLORS.text.primary;
        }
    }
    return COLORS.background
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        // Limit the swipe to one day's worth of movement
        const maxSwipeDistance = 300; // Maximum swipe distance
        const clampedDx = Math.max(Math.min(gesture.dx, maxSwipeDistance), -maxSwipeDistance);
        pan.x.setValue(clampedDx);
        
        // Calculate the date based on swipe progress
        const swipeThreshold = 250; // pixels per day
        const progress = clampedDx / swipeThreshold;
        
        // Create a new date object for each calculation to avoid mutation
        const newDate = new Date(currentDate.current);
        const daysToAdd = Math.round(progress);
        newDate.setDate(newDate.getDate() - daysToAdd);
        
        // Check if the date has actually changed
        if (newDate.getDate() !== displayDate.getDate()) {
          hasDateChanged.current = true;
          setDisplayDate(newDate);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        const swipeThreshold = 249; // Minimum distance to trigger a swipe
        
        if (Math.abs(gesture.dx) > swipeThreshold || hasDateChanged.current) {
          // Create a new date object for each calculation
          const newDate = new Date(currentDate.current);
          const daysToAdd = gesture.dx > 0 ? -1 : 1;
          newDate.setDate(newDate.getDate() + daysToAdd);
          setSelectedDate(newDate);
        }

        // Reset the pan value with animation
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
          friction: 5,
          tension: 40,
        }).start();
      },
    })
  ).current;

  const handleAddEvent = (eventData: {
    id?: string;
    title: string;
    description: string;
    type: EventType;
    startDate: Date;
    endDate: Date;
    completed: boolean;
  }) => {
    if (eventData.id) {
      dispatch(updateEvent({
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        type: eventData.type,
        startDate: eventData.startDate.toISOString(),
        endDate: eventData.endDate.toISOString(),
        completed: eventData.completed,
      }));
    } else {
      dispatch(addEvent({
        title: eventData.title,
        description: eventData.description,
        type: eventData.type,
        startDate: eventData.startDate.toISOString(),
        endDate: eventData.endDate.toISOString(),
        completed: false,
      }));
    }
  };

  const handleToggleEvent = (id: string) => {
    dispatch(toggleEvent(id));
  };

  const handleDeleteEvent = (id: string) => {
    dispatch(deleteEvent(id));
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedEvent(undefined);
  };

  const navigateDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const toggleEventType = (type: EventType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    const isSameDay = eventDate.toDateString() === displayDate.toDateString();
    const isSelectedType = selectedTypes.includes(event.type);
    return isSameDay && isSelectedType;
  });

  const animatedStyle = {
    transform: [{ translateX: pan.x }],
  };

  return (
    <KeyboardAvoidingView
      style={[homeStyles.container, { flex: 1, position: 'relative' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={homeStyles.header}>
        <View style={homeStyles.dateNavigation}>
          <TouchableOpacity onPress={() => navigateDate(-1)}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={homeStyles.dateText}>
              {displayDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateDate(1)}>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={homeStyles.filterContainer}>
          {(['job', 'routine', 'free-time'] as EventType[]).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                homeStyles.filterButton,
                { 
                  backgroundColor: getFilterTypeColor(type, selectedTypes.includes(type)),
                  borderColor: getFilterTypeColor(type, true)
                },
              ]}
              onPress={() => toggleEventType(type)}
            >
              <Text style={[
                homeStyles.filterButtonText,
                { color: getFilterTextColor(type, selectedTypes.includes(type)) },
              ]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={homeStyles.subtitle}>
          {filteredEvents.filter((event) => !event.completed).length} remaining
        </Text>
      </View>

      <Animated.View 
        style={[{ flex: 1 }, animatedStyle]} 
        {...panResponder.panHandlers}
      >
        <ScrollView style={homeStyles.todoList}>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              onPress={() => handleEventPress(event)}
              onToggle={() => handleToggleEvent(event.id)}
            />
          ))}
        </ScrollView>
      </Animated.View>

      <View style={homeStyles.inputContainer}>
        <TouchableOpacity
          style={[homeStyles.addButton, { flex: 1 }]}
          onPress={() => setIsFormVisible(true)}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
          <Text style={{ color: COLORS.primary, marginLeft: 8 }}>Add New Event</Text>
        </TouchableOpacity>
      </View>

      <EventForm
        visible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleAddEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
      />

      {showDatePicker && (
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{ 
            backgroundColor: 'white', 
            padding: 20, 
            borderRadius: 10,
            minWidth: 300
          }}>
            <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
              Date picker not available in Expo Go
            </Text>
            <TouchableOpacity 
              onPress={() => setShowDatePicker(false)}
              style={{ 
                backgroundColor: '#007AFF', 
                padding: 10, 
                borderRadius: 5,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
} 
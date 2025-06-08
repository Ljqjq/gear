import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Event, EventType } from '../../components/Event';
import { EventForm } from '../../components/EventForm';
import { COLORS } from '../../constants/theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addEvent, deleteEvent, toggleEvent } from '../../store/slices/eventSlice';
import { homeStyles } from '../../styles/screens/home.styles';

export default function HomeScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);

  const handleAddEvent = (eventData: {
    title: string;
    description: string;
    type: EventType;
    dueDate: Date;
  }) => {
    dispatch(addEvent({
      ...eventData,
      dueDate: eventData.dueDate.toISOString(),
      completed: false,
    }));
  };

  const handleToggleEvent = (id: string) => {
    dispatch(toggleEvent(id));
  };

  const handleDeleteEvent = (id: string) => {
    dispatch(deleteEvent(id));
  };

  const handleEventPress = (id: string) => {
    // TODO: Implement event details view
    console.log('Event pressed:', id);
  };

  return (
    <KeyboardAvoidingView
      style={homeStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={homeStyles.header}>
        <Text style={homeStyles.title}>My Events</Text>
        <Text style={homeStyles.subtitle}>
          {events.filter((event) => !event.completed).length} remaining
        </Text>
      </View>

      <ScrollView style={homeStyles.todoList}>
        {events.map((event) => (
          <Event
            key={event.id}
            event={{ ...event, dueDate: new Date(event.dueDate) }}
            onPress={() => handleEventPress(event.id)}
            onToggle={() => handleToggleEvent(event.id)}
          />
        ))}
      </ScrollView>

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
        onClose={() => setIsFormVisible(false)}
        onSubmit={handleAddEvent}
      />
    </KeyboardAvoidingView>
  );
}

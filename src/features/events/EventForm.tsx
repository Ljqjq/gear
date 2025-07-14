import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ThemedText } from '../../shared/components/ThemedText';
import { COLORS, FONT_SIZE, SPACING } from '../../shared/constants/theme';
import { useAppSelector } from '../../store/hooks';
import { Event, EventType } from './Event';

interface EventFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (event: {
    id?: string;
    title: string;
    description: string;
    type: EventType;
    startDate: Date;
    endDate: Date;
    completed: boolean;
  }) => void;
  onDelete?: (id: string) => void;
  event?: Event;
  defaultDate?: Date; // <-- add this
}

const DEFAULT_EVENT_DURATION_MINUTES = 60;

export function EventForm({ visible, onClose, onSubmit, onDelete, event, defaultDate }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EventType>('job');
  const [startDate, setStartDate] = useState(
    event ? new Date(event.startDate) : defaultDate ? new Date(defaultDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    event && event.endDate ? new Date(event.endDate) : defaultDate ? (() => {
      const d = new Date(defaultDate);
      d.setMinutes(d.getMinutes() + DEFAULT_EVENT_DURATION_MINUTES);
      return d;
    })() : undefined
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const events = useAppSelector((state) => state.events.events);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setType(event.type);
      setStartDate(new Date(event.startDate));
      setEndDate(event.endDate ? new Date(event.endDate) : undefined);
    } else {
      setTitle('');
      setDescription('');
      setType('job');
      setStartDate(defaultDate ? new Date(defaultDate) : new Date());
      setEndDate(defaultDate ? (() => {
        const d = new Date(defaultDate);
        d.setMinutes(d.getMinutes() + DEFAULT_EVENT_DURATION_MINUTES);
        return d;
      })() : undefined);
    }
  }, [event, defaultDate]);

  const getTypeColor = (type: EventType) => {
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
  };

  const handleSubmit = () => {
    if (title.trim()) {
      let finalEndDate = endDate;
      if (!finalEndDate || finalEndDate <= startDate) {
        finalEndDate = new Date(startDate.getTime());
        finalEndDate.setMinutes(finalEndDate.getMinutes() + DEFAULT_EVENT_DURATION_MINUTES);
      }
      // Overlap check
      const overlappingEvent = events.find(e => {
        if (event && e.id === event.id) return false; // skip self when editing
        const eStart = new Date(e.startDate).getTime();
        const eEnd = new Date(e.endDate).getTime();
        const newStart = startDate.getTime();
        const newEnd = finalEndDate.getTime();
        return newStart < eEnd && newEnd > eStart;
      });
      if (overlappingEvent) {
        setError(`Time conflict with event: "${overlappingEvent.title}" (${new Date(overlappingEvent.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(overlappingEvent.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
        return;
      }
      setError(null);
      onSubmit({
        id: event?.id,
        title: title.trim(),
        description: description.trim(),
        type,
        startDate,
        endDate: finalEndDate,
        completed: event?.completed || false,
      });
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ThemedText type="title" style={styles.title}>
            {event ? 'Edit Event' : 'New Event'}
          </ThemedText>
          {error && (
            <ThemedText style={{ color: COLORS.error, marginBottom: 8 }}>{error}</ThemedText>
          )}
          
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            placeholderTextColor={COLORS.text.secondary}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor={COLORS.text.secondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <View style={styles.typeContainer}>
            <ThemedText style={styles.label}>Type:</ThemedText>
            <View style={styles.typeButtons}>
              {(['job', 'routine', 'free-time'] as EventType[]).map((eventType) => (
                <TouchableOpacity
                  key={eventType}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        type === eventType
                          ? getTypeColor(eventType)
                          : COLORS.background,
                    },
                  ]}
                  onPress={() => setType(eventType)}
                >
                  <ThemedText
                    style={[
                      styles.typeButtonText,
                      type === eventType && styles.selectedTypeText,
                    ]}
                  >
                    {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <ThemedText>
                {startDate ? startDate.toLocaleDateString() : 'Select Date'}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
            >
              <ThemedText>
                {startDate ? startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowEndTimePicker(true)}
            >
              <ThemedText>
                {endDate ? endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'End'}
              </ThemedText>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const newDate = new Date(startDate);
                    newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                    setStartDate(newDate);
                    const newEndDate = new Date(newDate.getTime());
                    newEndDate.setMinutes(newEndDate.getMinutes() + DEFAULT_EVENT_DURATION_MINUTES);
                    setEndDate(newEndDate);
                  }
                }}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={startDate}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    const newDate = new Date(startDate);
                    newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
                    setStartDate(newDate);
                    const newEndDate = new Date(newDate.getTime());
                    newEndDate.setMinutes(newEndDate.getMinutes() + DEFAULT_EVENT_DURATION_MINUTES);
                    setEndDate(newEndDate);
                  }
                }}
              />
            )}
            {showEndTimePicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setShowEndTimePicker(false)
                        if (selectedTime) {
                            const newEndDate = new Date(startDate.getTime());
                            newEndDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
                            setEndDate(newEndDate)
                  }
                }}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            {event && onDelete && (
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => {
                  onDelete(event.id);
                  onClose();
                }}
              >
                <ThemedText style={[styles.buttonText, styles.deleteButtonText]}>
                  Delete
                </ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <ThemedText style={styles.buttonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <ThemedText style={[styles.buttonText, styles.submitButtonText]}>
                {event ? 'Save' : 'Add Event'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.lg,
    width: '90%',
    maxWidth: 500,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.md,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.xs,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  selectedType: {
    // backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    fontSize: FONT_SIZE.sm,
  },
  selectedTypeText: {
    color: COLORS.background,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    flexWrap: 'wrap'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 8,
    marginHorizontal: SPACING.xs,
  },
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
  },
  submitButtonText: {
    color: COLORS.background,
  },
  deleteButtonText: {
    color: COLORS.background,
  },
}); 
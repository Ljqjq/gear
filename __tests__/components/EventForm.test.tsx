import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { EventForm } from '../../src/features/events/EventForm';

const mockStore = configureStore([]);
const baseEvent = {
  id: '1',
  title: 'Test Event',
  description: 'desc',
  type: 'job',
  startDate: new Date('2024-01-01T08:00:00.000Z').toISOString(),
  endDate: new Date('2024-01-01T09:00:00.000Z').toISOString(),
  completed: false,
};

describe('EventForm', () => {
  const RealDate = Date;
  beforeAll(() => {
    global.Date = class extends RealDate {
      constructor(arg?: any) {
        if (arguments.length === 0) {
          super('2024-01-01T08:30:00.000Z');
          return;
        }
        super(arg);
      }
      static now() {
        return new RealDate('2024-01-01T08:30:00.000Z').getTime();
      }
    } as any;
  });
  afterAll(() => {
    global.Date = RealDate;
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sets end time to 1 hour after start by default', () => {
    const store = mockStore({ events: { events: [] } });
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <EventForm visible onClose={() => {}} onSubmit={onSubmit} />
      </Provider>
    );
    fireEvent.changeText(getByPlaceholderText('Event Title'), 'My Event');
    fireEvent.press(getByText('Add Event'));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        endDate: expect.any(Date),
        startDate: expect.any(Date),
      })
    );
    const { startDate, endDate } = onSubmit.mock.calls[0][0];
    expect(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60)
    ).toBe(60);
  });

  it('prevents overlapping events and shows error', async () => {
    const store = mockStore({
      events: {
        events: [
          {
            ...baseEvent,
            startDate: new Date('2024-01-01T08:00:00.000Z').toISOString(),
            endDate: new Date('2024-01-01T09:00:00.000Z').toISOString(),
          },
        ],
      },
    });
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, findByText } = render(
      <Provider store={store}>
        <EventForm visible onClose={() => {}} onSubmit={onSubmit} />
      </Provider>
    );
    fireEvent.changeText(getByPlaceholderText('Event Title'), 'Overlap Event');
    fireEvent.press(getByText('Add Event'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(await findByText(/Time conflict with event/)).toBeTruthy();
  });

  it('allows non-overlapping events', () => {
    const store = mockStore({
      events: {
        events: [
          {
            ...baseEvent,
            startDate: new Date('2024-01-01T08:00:00.000Z').toISOString(),
            endDate: new Date('2024-01-01T09:00:00.000Z').toISOString(),
          },
        ],
      },
    });
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <EventForm visible onClose={() => {}} onSubmit={onSubmit} />
      </Provider>
    );
    fireEvent.changeText(getByPlaceholderText('Event Title'), 'Non-overlap Event');
    // Simulate a time after 9:00
    const now = new Date('2024-01-01T10:00:00.000Z');
    jest.spyOn(global, 'Date').mockImplementation(() => now as any);
    fireEvent.press(getByText('Add Event'));
    expect(onSubmit).toHaveBeenCalled();
  });
}); 
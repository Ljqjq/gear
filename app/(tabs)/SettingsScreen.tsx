import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../src/store/hooks';
import { setThemeColor } from '../../src/store/slices/settingsSlice';

const COLOR_SWATCHES = [
  '#6C63FF', '#FFB347', '#181A20', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#1A535C', '#F7FFF7', '#FFE66D', '#2B2D42'
];

function ColorSwatch({ color, selected, onPress }: { color: string, selected: boolean, onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.swatch, { backgroundColor: color, borderWidth: selected ? 3 : 1, borderColor: selected ? '#333' : '#ccc' }]}
      onPress={onPress}
    />
  );
}

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.settings.theme);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 40 }}>
      <Text style={styles.header}>Theme Customization</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Primary Color</Text>
        <View style={styles.swatchRow}>
          {COLOR_SWATCHES.map(color => (
            <ColorSwatch
              key={color + 'primary'}
              color={color}
              selected={theme.primary === color}
              onPress={() => dispatch(setThemeColor({ key: 'primary', value: color }))}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Secondary Color</Text>
        <View style={styles.swatchRow}>
          {COLOR_SWATCHES.map(color => (
            <ColorSwatch
              key={color + 'secondary'}
              color={color}
              selected={theme.secondary === color}
              onPress={() => dispatch(setThemeColor({ key: 'secondary', value: color }))}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Background Color</Text>
        <View style={styles.swatchRow}>
          {COLOR_SWATCHES.map(color => (
            <ColorSwatch
              key={color + 'background'}
              color={color}
              selected={theme.background === color}
              onPress={() => dispatch(setThemeColor({ key: 'background', value: color }))}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Job Event Color</Text>
        <View style={styles.swatchRow}>
          {COLOR_SWATCHES.map(color => (
            <ColorSwatch
              key={color + 'job'}
              color={color}
              selected={theme.job === color}
              onPress={() => dispatch(setThemeColor({ key: 'job', value: color }))}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Routine Event Color</Text>
        <View style={styles.swatchRow}>
          {COLOR_SWATCHES.map(color => (
            <ColorSwatch
              key={color + 'routine'}
              color={color}
              selected={theme.routine === color}
              onPress={() => dispatch(setThemeColor({ key: 'routine', value: color }))}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Free Time Event Color</Text>
        <View style={styles.swatchRow}>
          {COLOR_SWATCHES.map(color => (
            <ColorSwatch
              key={color + 'freeTime'}
              color={color}
              selected={theme.freeTime === color}
              onPress={() => dispatch(setThemeColor({ key: 'freeTime', value: color }))}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    margin: 6,
  },
}); 
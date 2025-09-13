import { RootState } from 'shared/stores';
import { AccessibilityState } from './../types';

export const SelectAccessibilityState = (
  state: RootState,
): AccessibilityState & { isModeActive: boolean; isModalOpen: boolean } => state.accessibilityMode;

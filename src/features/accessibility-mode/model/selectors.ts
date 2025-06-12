import { RootState } from 'app/stores';

export const SelectState = (state: RootState) => state.accessibilityMode.isActive;

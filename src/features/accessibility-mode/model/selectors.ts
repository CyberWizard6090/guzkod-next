import { RootState } from 'shared/stores';

export const SelectState = (state: RootState) => state.accessibilityMode.isActive;
export const SelectIsModalOpen = (state: RootState) => state.accessibilityMode.isModalOpen;

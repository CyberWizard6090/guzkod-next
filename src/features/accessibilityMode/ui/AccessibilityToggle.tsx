import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleMode, toggleImagesHidden } from '../model/accessibilityModeSlice';
import { RootState } from 'app/stores';

export const AccessibilityToggle: React.FC = () => {
  const dispatch = useDispatch();
  const { isActive, imagesHidden } = useSelector((state: RootState) => state.accessibilityMode);

  const handleToggleMode = () => dispatch(toggleMode());

  const handleToggleImages = () => dispatch(toggleImagesHidden());

  return (
    <div>
      <button onClick={handleToggleMode}>
        {isActive ? 'Disable Accessibility Mode' : 'Enable Accessibility Mode'}
      </button>

      {isActive && (
        <div>
          <button onClick={handleToggleImages}>
            {imagesHidden ? 'Show Images' : 'Hide Images'}
          </button>
        </div>
      )}
    </div>
  );
};

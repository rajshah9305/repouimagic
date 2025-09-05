import React from 'react';

// Per Gemini API coding guidelines, API key management via the UI is prohibited.
// The API key must be configured exclusively through the `process.env.API_KEY`
// environment variable. This component has been made a no-op to align with these
// requirements and resolve compilation errors from removed service functions.
// This component should be removed from the application if it is being used.
const SettingsModal: React.FC = () => {
  return null;
};

export default SettingsModal;

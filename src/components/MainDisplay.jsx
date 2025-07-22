import React from 'react';
import VisualizationArea from './VisualizationArea';
import Logger from './Logger';

const MainDisplay = () => {
  return (
    <div className="main-display">
      <VisualizationArea />
      <Logger />
    </div>
  );
};

export default MainDisplay;

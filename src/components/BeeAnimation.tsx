import React from 'react';
import '../styles/BeeAnimation.css';

const BeeAnimation: React.FC = () => {
    return (
      <div className="bee-wrapper">
        <div className="container">
          <div className="wings"></div>
          <div className="bee">
            <div className="shine"></div>
          </div>
        </div>
      </div>
    );
  };

export default BeeAnimation;
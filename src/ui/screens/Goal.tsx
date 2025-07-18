import React, { useState } from 'react';
import ArrowIcon from "../assets/images/icon1.svg";
import Icon from "../assets/images/icon2.svg";
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const Goal = ({ goTo }: Props) => {
  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#DDDDDD'
  };

  const activeDotStyle = {
    ...dotStyle,
    backgroundColor: '#0C8CE9'
  };

  const [isNextVisible, setIsNextVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        background: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        margin: '0 auto',
        borderRadius: '0px 0px 15px 15px'
      }}
    >
      <img
        src={ArrowIcon}
        alt="Back Arrow"
        onClick={() => goTo("stage")}
        style={{
          width: '17px',
          height: '17px',
          alignSelf: 'flex-start',
          cursor: 'pointer'
        }}
      />

      <h2
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          textAlign: 'center',
          margin: '16px 0px 37px'
        }}
      >
        What is your primary{' '}
        <span style={{ color: 'rgb(12, 140, 233)' }}>goal</span>?
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: '352px',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center'
        }}
      >
        {[
          'Acquire new users',
          'Improve user retention',
          'Increase revenue',
          'Reduce churn',
          'Drive engagement',
          'Improve operational efficiency'
        ].map((goal) => (
          <div
            key={goal}
            className={`hover-goal ${selectedItem === goal ? 'active' : ''}`}
            onClick={() => { setSelectedItem(goal); setIsNextVisible(true); }}
            style={{ cursor: 'pointer' }}
          >
            <p>{goal}</p>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', marginTop: '40px' }}>
        <div style={{ margin: '10px 0px 20px' }}>
          <SlButton
            variant="primary"
            onClick={() => goTo("money")}
            style={{
              display: isNextVisible ? 'flex' : 'none',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500,
              fontSize: '14px',
              borderRadius: '5px',
              padding: '4.75px 8px',
              color: '#FFFFFF',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Next: Monetization
              <img src={Icon} alt="Next Icon" style={{ width: '16px', height: '16px' }} />
            </span>
          </SlButton>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: 'auto' }}>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
          <span style={activeDotStyle}></span>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
        </div>
      </div>
    </div>
  );
};

// CSS for active class
const styles = `
  .hover-goal {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .hover-goal:hover {
    background-color: #F0F8FE;
    color: #0C8CE9;
  }
  .hover-goal.active {
    background-color: #F0F8FE;
    color: #212325;
    font-weight: 600;
    border-color: #0C8CE9;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Goal;
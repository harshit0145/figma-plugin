import React, { useState } from 'react';
import ArrowIcon from "../assets/images/icon1.svg";
import Icon from "../assets/images/icon2.svg";
import Idea_Icon from "../assets/images/Idea_Icon.svg";
import Growth_Icon from "../assets/images/Growth_Icon.svg";
import MVP_Icon from "../assets/images/MVP_Icon.svg";
import Mature_Icon from "../assets/images/Mature_Icon.svg";
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const Stage = ({ goTo }: Props) => {
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
    <div style={{
      width: '100%',
      height: 'auto',
      background: '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
      margin: '0 auto',
      borderRadius: '0 0 15px 15px'
    }}>
      <img
        src={ArrowIcon}
        alt="Back Arrow"
        onClick={() => goTo("kpi")}
        style={{
          width: '17px',
          height: '17px',
          marginTop: '16px',
          alignSelf: 'flex-start',
          marginLeft: '10px',
          marginRight: '100px',
          cursor: 'pointer'
        }}
      />

      <h2 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '16px',
        textAlign: 'center',
        margin: "16px 0px 45px 0px"
      }}>
        Which <span style={{ color: '#0C8CE9' }}>stage</span> is your product in?
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '13px',
        width: '100%',
        maxWidth: '360px'
      }}>
        {[{ img: Idea_Icon, label: 'Idea' }, { img: MVP_Icon, label: 'MVP' }, { img: Growth_Icon, label: 'Growth' }, { img: Mature_Icon, label: 'Mature' }].map((item) => (
          <div
            key={item.label}
            className={`hover-card ${selectedItem === item.label ? 'active' : ''}`}
            onClick={() => { setSelectedItem(item.label); setIsNextVisible(true); }}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={item.img} alt={`${item.label} Stage`} />
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', marginTop: '65px' }}>
        <div style={{ margin: '10px 0px 20px' }}>
          <SlButton
            variant="primary"
            onClick={() => goTo("goal")}
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
              Next: Primary Goal
              <img src={Icon} alt="Next Icon" style={{ width: '16px', height: '16px' }} />
            </span>
          </SlButton>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: 'auto' }}>
          <span style={dotStyle}></span>
          <span style={activeDotStyle}></span>
          <span style={dotStyle}></span>
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
  .hover-card {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .hover-card:hover {
    background-color: #F0F8FE;
    color: #0C8CE9;
  }
  .hover-card.active {
    background-color: #F0F8FE;
    color: #212325;
    font-weight: 600;
    border-color: #0C8CE9;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Stage;
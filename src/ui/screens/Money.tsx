import React, { useState } from 'react';
import ArrowIcon from "../assets/images/icon1.svg";
import Icon from "../assets/images/icon2.svg";
import YesIcon from "../assets/images/Icon_Yes.svg";
import NoIcon from "../assets/images/Icon_No.svg";
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const Money = ({ goTo }: Props) => {
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
        onClick={() => goTo("goal")}
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
          margin: '16px 0px 45px'
        }}
      >
        Is your product making{' '}
        <span style={{ color: 'rgb(12, 140, 233)' }}>money</span>?
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          style={{
            width: '348px',
            height: '216px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {[{ src: YesIcon, label: 'Yes' }, { src: NoIcon, label: 'No' }].map((item) => (
            <div
              key={item.label}
              className={`hover-item ${selectedItem === item.label ? 'active' : ''}`}
              onClick={() => { setSelectedItem(item.label); setIsNextVisible(true); }}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <img src={item.src} alt={item.label} />
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', marginTop: '105px' }}>
          <div style={{ margin: '10px 0px 20px' }}>
            <SlButton
              variant="primary"
              onClick={() => goTo("business")}
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
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Next: B2B / B2C
                <img
                  src={Icon}
                  alt="Next Icon"
                  style={{ width: '16px', height: '16px' }}
                />
              </span>
            </SlButton>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: 'auto'
            }}
          >
            <span style={dotStyle}></span>
            <span style={dotStyle}></span>
            <span style={dotStyle}></span>
            <span style={activeDotStyle}></span>
            <span style={dotStyle}></span>
            <span style={dotStyle}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS for active class
const styles = `
  .hover-item {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .hover-item:hover {
    background-color: #F0F8FE;
    color: #0C8CE9;
  }
  .hover-item.active {
    background-color: #F0F8FE;
    color: #212325;
    font-weight: 600;
    border-color: #0C8CE9;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Money;
import React, { useState } from 'react';
import ArrowIcon from "../assets/images/icon1.svg";
import Icon from "../assets/images/icon2.svg";
import B2BIcon from "../assets/images/b2b.svg";
import HybridIconOne from "../assets/images/icon1.svg";
import HybridIconTwo from "../assets/images/icon1.svg";
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const BusinessType = ({ goTo }: Props) => {
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

  const boxContent = [
    { type: 'B2B', desc: 'Business to Business' },
    { type: 'B2C', desc: 'Business to Consumer' }
  ];

  const [isNextVisible, setIsNextVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        background: '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: '0 auto',
        borderRadius: '0px 0px 15px 15px'
      }}
    >
      <img
        src={ArrowIcon}
        alt="Back Arrow"
        onClick={() => goTo("money")} 
        style={{
          width: '17px',
          height: '17px',
          alignSelf: 'flex-start',
          cursor: 'pointer'
        }}
      />

      <h2
        style={{
          fontWeight: 700,
          fontSize: '16px',
          margin: '16px 0 0',
          textAlign: 'center'
        }}
      >
        Is your product <span style={{ color: '#0C8CE9' }}>B2B, B2C</span>, or both?
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div
          style={{
            maxWidth: '360px',
            width: '100%',
            rowGap: '13px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '13px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            {boxContent.map((box) => (
              <div
                key={box.type}
                className={`card-box ${selectedItem === box.type ? 'active' : ''}`}
                onClick={() => { setSelectedItem(box.type); setIsNextVisible(true); }}
                style={{ cursor: 'pointer' }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '168px',
                    height: '119px'
                  }}
                >
                  <img src={B2BIcon} alt={box.type} style={{ width: '36px', height: '36px' }} />
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#212325',
                      margin: 0
                    }}
                  >
                    {box.type}
                  </p>
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      color: '#212325',
                      textAlign: 'center',
                      margin: 0,
                      width: '110px'
                    }}
                  >
                    {box.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hybrid Box */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              className={`card-box ${selectedItem === 'Hybrid' ? 'active' : ''}`}
              onClick={() => { setSelectedItem('Hybrid'); setIsNextVisible(true); }}
              style={{ cursor: 'pointer' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                  }}
                >
                  <img src={HybridIconOne} alt="B2B" style={{ width: '36px', height: '36px' }} />
                  <p style={{ margin: '0px 10px', fontSize: '18px', color: '#212325', fontWeight: '500' }}>+</p>
                  <img src={HybridIconTwo} alt="B2C" style={{ width: '36px', height: '36px' }} />
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#212325',
                    margin: 0
                  }}
                >
                  Hybrid
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Button + Page Indicators */}
        <div style={{ width: '100%', marginTop: '72px' }}>
          <div style={{ margin: '10px 0px 20px' }}>
            <SlButton
              variant="primary"
              onClick={() => goTo("ai")}
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
                Next: AI
                <img src={Icon} alt="Next Icon" style={{ width: '16px', height: '16px' }} />
              </span>
            </SlButton>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <span style={dotStyle}></span>
            <span style={dotStyle}></span>
            <span style={dotStyle}></span>
            <span style={dotStyle}></span>
            <span style={activeDotStyle}></span>
            <span style={dotStyle}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS for active class
const styles = `
  .card-box {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .card-box:hover {
    background-color: #F0F8FE;
    color: #0C8CE9;
  }
  .card-box.active {
    background-color: #F0F8FE;
    color: #212325;
    font-weight: 600;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default BusinessType;
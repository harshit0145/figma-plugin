import React, { useState } from 'react';
import ArrowIcon from '../assets/images/icon1.svg';
import Icon from '../assets/images/icon2.svg';
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const KpiCategory = ({ goTo }: Props) => {
  const [isNextVisible, setIsNextVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const categories = [
    'SaaS & Productivity', 'Marketplace & Ecomm', 'Fintech', 'EdTech', 'Social & Media',
    'Health & Wellness', 'Travel & Hospitality', 'Logistics & Delivery', 'Gaming', 'Other'
  ];

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        background: '#FFFFFF',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        margin: '0 auto',
        borderRadius: '0px 0px 15px 15px',
      }}
    >
      <img
        src={ArrowIcon}
        alt="Back Arrow"
        onClick={() => goTo("home")}
        style={{ alignSelf: 'flex-start', cursor: 'pointer' }}
      />

      <h2
        style={{
          color: '#212325',
          fontSize: '16px',
          fontWeight: 700,
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        Which <span style={{ color: '#0C8CE9' }}>category</span> best fits your product?
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
          margin: '32px auto',
          width: '100%',
          maxWidth: '352px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories.slice(0, 5).map((item) => (
            <p
              key={item}
              className={`hoverable-item ${selectedItem === item ? 'active' : ''}`}
              onClick={() => { setSelectedItem(item); setIsNextVisible(true); }}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </p>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories.slice(5).map((item) => (
            <p
              key={item}
              className={`hoverable-item ${selectedItem === item ? 'active' : ''}`}
              onClick={() => { setSelectedItem(item); setIsNextVisible(true); }}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', marginBottom: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <SlButton
            variant="primary"
            onClick={() => goTo("stage")}
            style={{
              width: '100%',
              display: isNextVisible ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: 500,
              fontSize: '14px',
              borderRadius: '5px',
              padding: '4.75px 0px',
              color: '#FFFFFF',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Next: Product Stage
              <img
                src={Icon}
                alt="Next Icon"
                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
              />
            </span>
          </SlButton>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            width: '128px',
            height: '8px',
            margin: '24px auto 0',
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((dotIndex) => (
            <span
              key={dotIndex}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: dotIndex === 0 ? '#0C8CE9' : '#DDDDDD',
                transition: 'background-color 0.3s ease',
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

// CSS for active class (to be added in a separate stylesheet or inline if needed)
const styles = `
  .hoverable-item {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .hoverable-item:hover {
    background-color: #F0F8FE;
    color: #0C8CE9;
  }
  .hoverable-item.active {
    background-color: #F0F8FE;
    color: #212325;
    border-color: #0C8CE9;
    
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default KpiCategory;
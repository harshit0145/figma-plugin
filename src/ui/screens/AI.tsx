import React, { useState } from 'react';
import ArrowIcon from "../assets/images/icon1.svg";
import YesIcon from "../assets/images/Icon_Yes.svg";
import NoIcon from "../assets/images/Icon_No.svg";
import Star from "../assets/images/Star.svg";
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';
import LoadingScreen from './LoadingScreen';

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const AI = ({ goTo }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleGenerateRecommendations = () => {
    setIsLoading(true); // Show LoadingScreen
  };

  const handleLoadingComplete = () => {
    setIsLoading(false); // Hide LoadingScreen
    goTo("recommendedKpis"); // Navigate to RecommendedKpisScreen
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

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
      }}
    >
      <img
        src={ArrowIcon}
        alt="Back Arrow"
        onClick={() => goTo("business")} 
        style={{
          cursor: 'pointer',
          alignSelf: 'flex-start'
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
        Does your product use <span style={{ color: '#0C8CE9' }}>AI</span>?
      </h2>

      <div
        style={{
          width: '348px',
          height: '216px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '24px',
        }}
      >
        {[{ img: YesIcon, label: 'Yes' }, { img: NoIcon, label: 'No' }].map((item) => (
          <div
            key={item.label}
            className={`wide-hover-box ${selectedItem === item.label ? 'active' : ''}`}
            onClick={() => { setSelectedItem(item.label); setIsButtonVisible(true); }}
            style={{ cursor: 'pointer' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '36px',
                height: '55px',
              }}
            >
              <img src={item.img} alt={item.label} style={{ width: '36px', height: '36px' }} />
              <p
                style={{
                  width: '22px',
                  height: '9px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  lineHeight: '260%',
                  letterSpacing: '-0.019em',
                  color: '#212325',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', marginTop: '100px' }}>
        <div style={{ margin: '10px 0px 20px' }}>
          <SlButton
            variant="primary"
            style={{
              display: isButtonVisible ? 'flex' : 'none',
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
            onClick={handleGenerateRecommendations}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Generate Recommendations
              <img src={Star} alt="Next Icon" style={{ width: '16px', height: '16px' }} />
            </span>
          </SlButton>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
          <span style={activeDotStyle}></span>
        </div>
      </div>
    </div>
  );
};

// CSS for active class
const styles = `
  .wide-hover-box {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .wide-hover-box:hover {
    background-color: #F0F8FE;
    color: #0C8CE9;
  }
  .wide-hover-box.active {
    background-color: #F0F8FE;
    color: #212325;
    font-weight: 600;
    border-color: #0C8CE9;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default AI; 
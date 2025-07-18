import React, { useState } from 'react';
import ExportIcon from "../assets/images/export.svg";
import StarIcon from "../assets/images/Star.svg";
import DownloadIcon from "../assets/images/download.svg"; // Placeholder, replace with your SVG path
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

interface KPI {
  name: string;
  definition: string;
  category: string;
  popularity: number;
  goal?: string;
  benchmark?: string;
  measurementTools?: string;
}

// Dummy recommended KPIs based on user selections (e.g., B2B, AI)
const recommendedKpiData: KPI[] = [
  { name: "AI Engagement Rate", definition: "Measures user interaction with AI features", category: "AI", popularity: 85, goal: "Increase by 10%", benchmark: "Industry avg: 75%", measurementTools: "Google Analytics" },
  { name: "B2B Conversion Rate", definition: "Tracks conversions from business clients", category: "B2B", popularity: 90, goal: "Target 5% uplift", benchmark: "Industry avg: 80%", measurementTools: "CRM Tools" },
  { name: "Retention Rate", definition: "Measures customer retention over time", category: "Retention", popularity: 70, goal: "Maintain 90%", benchmark: "Industry avg: 85%", measurementTools: "Customer Surveys" },
];

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const RecommendedKpisScreen = ({ goTo }: Props) => {
  const [expandedKPIs, setExpandedKPIs] = useState<string[]>([]);

  const toggleKPI = (kpiName: string) => {
    setExpandedKPIs((prev) =>
      prev.includes(kpiName)
        ? prev.filter((name) => name !== kpiName)
        : [...prev, kpiName]
    );
  };

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      background: '#FFFFFF',
      width: '100%',
      margin: '0 auto',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Scrollable content area */}
      <div style={{
        paddingBottom: '80px',
      }}>
        <h2 style={{ fontWeight: 700, fontSize: '16px', textAlign: 'center', margin: '16px 0', color: '#212325' }}>
          Your Recommended <span style={{ color: '#0C8CE9' }}>Product KPIs:</span>
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '352',
          maxWidth: '100%',
        }}>
          {recommendedKpiData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6B6B6B', fontSize: '12px' }}>
              No KPIs recommended.
            </p>
          ) : (
            recommendedKpiData.map((kpi: KPI) => {
              const isExpanded = expandedKPIs.includes(kpi.name);
              return (
                <div
                  key={kpi.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '15.02px',
                    paddingTop: '22.25px',
                    paddingRight: '13.02px',
                    paddingBottom: '22.25px',
                    paddingLeft: '13.02px',
                    border: '2px solid transparent',
                    background: '#FBFBFB',
                    boxShadow: '0px 2px 7.01px 0px #21232580',
                    transition: 'border 0.2s, box-shadow 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '2px solid #0C8CE9';
                    e.currentTarget.style.boxShadow = '0px 2px 7.01px 0px #21232580';
                    e.currentTarget.style.background = '#F0F8FE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '2px solid transparent';
                    e.currentTarget.style.boxShadow = '0px 2px 7.01px 0px #21232580';
                    e.currentTarget.style.background = '#FBFBFB';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: '13px',
                          lineHeight: '0',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#0C8CE9',
                          margin: '0 0 8px',
                          textAlign: 'left',
                        }}
                      >{kpi.name}</h3>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '11px',
                          lineHeight: '18.53px',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#212325',
                          textAlign: 'left',
                          margin: '0',
                        }}
                      >
                        {kpi.definition}
                      </p>
                    </div>
                    <div
                      onClick={() => toggleKPI(kpi.name)}
                      role="button"
                      aria-expanded={isExpanded}
                      aria-label={`Toggle details for ${kpi.name}`}
                      style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'transparent',
                        color: '#0C8CE9',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 500,
                        border: '1.5px solid #0C8CE9',
                        lineHeight: '13px',
                        textAlign: 'center',
                      }}
                    >
                      {isExpanded ? '−' : '+'}
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{ marginTop: '8px', textAlign: 'left' }}>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '11px',
                          lineHeight: '16px',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#212325',
                          margin: '4px 0',
                        }}
                      >
                        <strong style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '10px',
                          lineHeight: '18.53px',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#6B6B6B',
                        }}>Goal</strong><br />
                        {kpi.goal || 'Not specified.'}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '11px',
                          lineHeight: '16px',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#212325',
                          margin: '4px 0',
                          textAlign: 'left',
                        }}
                      >
                        <strong style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '10px',
                          lineHeight: '18.53px',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#6B6B6B',
                        }}>Benchmark</strong><br />
                        {kpi.benchmark || 'Not specified.'}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '11px',
                          lineHeight: '16px',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#212325',
                          margin: '4px 0',
                          textAlign: 'left',
                        }}
                      >
                        <strong style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '10px',
                          lineHeight: '18.53px',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle',
                          color: '#6B6B6B',
                        }}>Measurement Tools</strong><br />
                        {kpi.measurementTools || 'Not specified.'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Fixed buttons at the bottom with download icon */}
      <div style={{
  display: 'flex',
  gap: '8px',
  padding: '20px 20px',
  background: '#FFFFFF',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  justifyContent: 'space-between',
}}>
    <SlButton
                        variant="default"
                        className="browse_kpi_btn"
                        onClick={() => goTo("browse")} 
                        style={{
                            width: "143px",
                           
                            borderRadius: "3px",
                            background: "#FFFFFF",
                            border: "1px solid #212325",
                            color: "#212325",
                            fontWeight: 500,
                            fontSize: "14px",
                            transition: "border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#0C8CE9';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#212325';
                        }}
                    >
                        Browse KPIs
                    </SlButton>
  <SlButton
    variant="primary"
    className="custom-import-button"
    aria-label="Import KPIs to Figma"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: "188px",
    }}
  >
    Import to Figma
    <img src={StarIcon} alt="Star Icon" style={{ width: '16px', height: '16px', marginLeft: '5px' }} />
  </SlButton>
 <SlButton
  variant="default"
  aria-label="Download"
  className="download-button" // Unique class for this button
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    padding: '0',
    background: 'transparent',
    border: 'none',
    lineHeight: '40px',
  }}
>
  <img src={DownloadIcon} alt="Download Icon" style={{ width: '18px', height: '18px', verticalAlign: 'middle' }} />
</SlButton>
</div>
    </div>
  );
};

export default RecommendedKpisScreen;
import React, { useState, useRef, useEffect } from 'react';
import ArrowIcon from "../assets/images/icon1.svg";
import SearchIcon from "../assets/images/search.svg";
import ExportIcon from "../assets/images/export.svg";
import StarIcon from "../assets/images/Star.svg";
import IconCSV from "../assets/images/Icon_CSV.svg";
import IconJSON from "../assets/images/Icon_JSON.svg";
import IconPDF from "../assets/images/Icon_PDF.svg";
import IconHTML from "../assets/images/Icon_HTML.svg";
import EI from "../assets/images/ei.svg";

import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

interface KPI {
  "KPI Name": string;
  Definition: string;
  Category: string;
  Goal?: string;
  Benchmark?: string;
  "Metric Type"?: string;
  "Design Stage"?: string;
  "User Journey Stage"?: string;
  "B2B/B2C"?: string;
  "Monetization Suitability"?: string;
  "Applicable Project Types"?: string;
  "More Info"?: string;
}

import kpiData from '../../data/master_kpis.json';
const typedKpiData = kpiData as KPI[];

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const categories: string[] = [...new Set(typedKpiData.map((kpi: KPI) => kpi.Category))].sort();

const categoryColors: { [key: string]: string } = {
  Accessibility: '#F5A623',
  Behavioral: '#F563A6',
  Content: '#FF6347',
  Conversion: '#F563A6',
  Engagement: '#FF6347',
  Retention: '#FF6347',
  Usability: '#34C759',
  AI: '#34C759',
  "Design Ops": '#0C8CE9',
  Experimentation: '#0C8CE9',
  Findability: '#0C8CE9',
  Flow: '#0C8CE9',
  Interaction: '#0C8CE9',
  Onboarding: '#0C8CE9',
  Performance: '#0C8CE9',
  Personalization: '#0C8CE9',
  "Qualitative Feedback": '#0C8CE9',
  Satisfaction: '#0C8CE9',
  Security: '#0C8CE9',
  Support: '#0C8CE9',
  Virality: '#0C8CE9',
  Composite: '#0C8CE9',
};

const categoryIcons: { [key: string]: string } = {
  Accessibility: '♿',
  Behavioral: '📈',
  Content: '📝',
  Conversion: '🛍️',
  Engagement: '💎',
  Retention: '🧲',
  Usability: '✅',
  AI: '🚀',
  "Design Ops": '⚙️',
  Experimentation: '🧪',
  Findability: '🔍',
  Flow: '➡️',
  Interaction: '🖱️',
  Onboarding: '🚀',
  Performance: '⚡',
  Personalization: '🎨',
  "Qualitative Feedback": '🎤',
  Satisfaction: '😊',
  Security: '🔒',
  Support: '📞',
  Virality: '📣',
  Composite: '📊',
};

const iconStyles: { [key: string]: React.CSSProperties } = {
  Retention: { display: 'inline-block', transform: 'rotate(270deg)' },
};

const BrowseKPIs = ({ goTo }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('AI');
  const [sortBy, setSortBy] = useState('relevancy');
  const [expandedKPIs, setExpandedKPIs] = useState<string[]>([]);
  const [selectedKPIs, setSelectedKPIs] = useState<string[]>([]);
  const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredKPIs = typedKpiData
    .filter((kpi: KPI) =>
      kpi.Category === selectedCategory &&
      (kpi["KPI Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.Definition.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a: KPI, b: KPI) => {
      if (sortBy === 'alphabetical') return a["KPI Name"].localeCompare(b["KPI Name"]);
      if (sortBy === 'popularity') return 0; // Popularity not available in JSON
      if (sortBy === 'relevancy' && searchTerm) {
        const aMatch = a["KPI Name"].toLowerCase().indexOf(searchTerm.toLowerCase());
        const bMatch = b["KPI Name"].toLowerCase().indexOf(searchTerm.toLowerCase());
        return aMatch - bMatch || a["KPI Name"].localeCompare(b["KPI Name"]);
      }
      return 0;
    });

  const toggleKPI = (kpiName: string) => {
    setExpandedKPIs((prev) =>
      prev.includes(kpiName)
        ? prev.filter((name) => name !== kpiName)
        : [...prev, kpiName]
    );
  };

  const toggleSelectKPI = (kpiName: string) => {
    setSelectedKPIs((prev) =>
      prev.includes(kpiName) ? prev.filter((name) => name !== kpiName) : [...prev, kpiName]
    );
  };

  const handleExport = (format: string) => {
    const exportData = selectedKPIs.length > 0
      ? typedKpiData.filter(kpi => selectedKPIs.includes(kpi["KPI Name"]))
      : filteredKPIs;

    if (exportData.length === 0) {
      alert('No KPIs selected for export.');
      return;
    }

    let content = '';
    switch (format) {
      case 'csv':
        content = '"KPI Name",Definition,Category,Goal,Benchmark,Metric Type,Design Stage,User Journey Stage,B2B/B2C,Monetization Suitability,Applicable Project Types,More Info\n' +
          exportData.map(kpi => `"${kpi["KPI Name"]}","${kpi.Definition.replace(/"/g, '""')}","${kpi.Category}","${kpi.Goal || ''}","${kpi.Benchmark || ''}","${kpi["Metric Type"] || ''}","${kpi["Design Stage"] || ''}","${kpi["User Journey Stage"] || ''}","${kpi["B2B/B2C"] || ''}","${kpi["Monetization Suitability"] || ''}","${kpi["Applicable Project Types"] || ''}","${kpi["More Info"] || ''}"`).join('\n');
        downloadFile(content, 'kpis.csv', 'text/csv');
        break;
      case 'json':
        content = JSON.stringify(exportData, null, 2);
        downloadFile(content, 'kpis.json', 'application/json');
        break;
      case 'pdf':
        content = generatePDFContent(exportData);
        downloadFile(content, 'kpis.pdf', 'application/pdf');
        break;
      case 'html':
        content = generateHTMLContent(exportData);
        downloadFile(content, 'kpis.html', 'text/html');
        break;
    }
    handlePopupClose();
  };

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generatePDFContent = (data: KPI[]) => {
    return `
      \\documentclass[a4paper]{article}
      \\usepackage[utf8]{inputenc}
      \\usepackage{geometry}
      \\geometry{a4paper, margin=1in}
      \\usepackage{enumitem}
      \\usepackage{amsmath}
      \\usepackage{booktabs}
      \\usepackage{colortbl}
      \\usepackage{xcolor}
      \\usepackage{longtable}

      \\begin{document}

      \\section*{KPI Export Report}
      \\begin{longtable}{p{3cm}p{2cm}p{4cm}p{3cm}p{3cm}p{2cm}}
      \\toprule
      \\rowcolor{gray!20}
      KPI Name & Category & Definition & Goal & Benchmark & Metric Type \\\\
      \\midrule
      \\endhead
      ${data.map(kpi => `
        ${kpi["KPI Name"].replace(/&/g, '\\&')} & ${kpi.Category} & ${kpi.Definition.replace(/&/g, '\\&')} & ${kpi.Goal || 'Not specified.'} & ${kpi.Benchmark || 'Not specified.'} & ${kpi["Metric Type"] || 'Not specified.'} \\\\
      `).join('')}
      \\bottomrule
      \\end{longtable}

      \\end{document}
    `;
  };

  const generateHTMLContent = (data: KPI[]) => `
    <!DOCTYPE html>
    <html>
    <head>
      <title>KPI Export</title>
      <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h1>KPI Export</h1>
      <table>
        <tr>
          <th>KPI Name</th>
          <th>Category</th>
          <th>Definition</th>
          <th>Goal</th>
          <th>Benchmark</th>
          <th>Metric Type</th>
          <th>Design Stage</th>
          <th>User Journey Stage</th>
          <th>B2B/B2C</th>
          <th>Monetization Suitability</th>
          <th>Applicable Project Types</th>
          <th>More Info</th>
        </tr>
        ${data.map(kpi => `
          <tr>
            <td>${kpi["KPI Name"]}</td>
            <td>${kpi.Category}</td>
            <td>${kpi.Definition}</td>
            <td>${kpi.Goal || 'Not specified.'}</td>
            <td>${kpi.Benchmark || 'Not specified.'}</td>
            <td>${kpi["Metric Type"] || 'Not specified.'}</td>
            <td>${kpi["Design Stage"] || 'Not specified.'}</td>
            <td>${kpi["User Journey Stage"] || 'Not specified.'}</td>
            <td>${kpi["B2B/B2C"] || 'Not specified.'}</td>
            <td>${kpi["Monetization Suitability"] || 'Not specified.'}</td>
            <td>${kpi["Applicable Project Types"] || 'Not specified.'}</td>
            <td><a href="${kpi["More Info"] || '#'}" target="_blank">${kpi["More Info"] || 'Not specified.'}</a></td>
          </tr>
        `).join('')}
      </table>
    </body>
    </html>
  `;

  const handlePopupClose = () => {
    setIsExportPopupOpen(false);
    if (searchInputRef.current) {
      setTimeout(() => {
        try {
          searchInputRef.current!.focus({ preventScroll: true });
          searchInputRef.current!.select();
          searchInputRef.current!.disabled = false;
          searchInputRef.current!.readOnly = false;
          const inputEvent = new Event('input', { bubbles: true });
          searchInputRef.current!.dispatchEvent(inputEvent);
          if (document.activeElement !== searchInputRef.current) {
            searchInputRef.current!.focus();
            const focusEvent = new Event('focus', { bubbles: true });
            searchInputRef.current!.dispatchEvent(focusEvent);
          }
        } catch (error) {
          console.error("Focus error:", error);
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (isExportPopupOpen && searchInputRef.current) {
      searchInputRef.current.blur();
    } else if (!isExportPopupOpen && searchInputRef.current) {
      setTimeout(() => {
        try {
          if (document.activeElement !== searchInputRef.current && searchInputRef.current) {
            searchInputRef.current!.focus({ preventScroll: true });
            searchInputRef.current!.select();
            searchInputRef.current!.disabled = false;
            searchInputRef.current!.readOnly = false;
            const inputEvent = new Event('input', { bubbles: true });
            searchInputRef.current!.dispatchEvent(inputEvent);
            const focusEvent = new Event('focus', { bubbles: true });
            searchInputRef.current!.dispatchEvent(focusEvent);
          }
        } catch (error) {
          console.error("Focus error in useEffect:", error);
        }
      }, 500);
    }
  }, [isExportPopupOpen]);

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      background: '#FFFFFF',
      width: '100%',
      margin: '0 auto',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <div style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <img
            src={ArrowIcon}
            alt="Back Arrow"
            onClick={() => goTo("home")}
            style={{ cursor: 'pointer', width: '24px', height: '24px' }}
            aria-label="Go back to home"
          />
          <h2 style={{ fontWeight: 700, fontSize: '16px', textAlign: 'center', margin: '0', flex: 1, color: '#212325' }}>
            Browse KPIs
          </h2>
        </div>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <div
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid #212325',
              paddingRight: '6px',
            }}
          >
            <img
              src={SearchIcon}
              alt="Search Icon"
              style={{ width: '16px', height: '16px' }}
            />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search more KPIs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search KPIs"
            style={{
              width: '350px',
              height: '40px',
              borderRadius: '50px',
              paddingRight: '12px',
              paddingLeft: '40px',
              border: '1px solid #DDDDDD',
              backgroundColor: '#FBFBFB',
              fontSize: '14px',
              color: '#212325',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          maxWidth: '360px',
          marginBottom: '26px'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setSelectedCategory(category); setSelectedKPIs([]); }}
              aria-selected={selectedCategory === category}
              aria-label={`Select ${category} category`}
              style={{
                background: selectedCategory === category ? '#F0F8FE' : '#FFFFFF',
                height: '22px',
                borderRadius: '42.28px',
                paddingRight: '7.56px',
                paddingLeft: '7.56px',
                borderWidth: '0.57px',
                borderStyle: 'solid',
                borderColor: selectedCategory === category ? '#0C8CE9' : '#BBBBBB',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '9.98px',
                lineHeight: '21.68px',
                color: '#212325',
                display: 'flex',
                alignItems: 'center',
                gap: '0.01px',
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F0F8FE';
                e.currentTarget.style.borderColor = '#0C8CE9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = selectedCategory === category ? '#F0F8FE' : '#FFFFFF';
                e.currentTarget.style.borderColor = selectedCategory === category ? '#0C8CE9' : '#BBBBBB';
              }}
            >
              <span style={iconStyles[category] || {}}>
                {categoryIcons[category] || '📊'}
              </span>
              {category}
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            aria-label="Sort KPIs"
            style={{
              padding: '4px 8px',
              paddingRight: '32px',
              borderRadius: '5px',
              border: '0',
              background: 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              verticalAlign: 'middle',
              color: '#212325',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg fill='%23212325' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              backgroundSize: '16px',
            }}
          >
            <option value="relevancy">Order by Relevancy</option>
            <option value="alphabetical">Order by Name (A-Z)</option>
            <option value="popularity">Order by Most Popular</option>
          </select>

          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              verticalAlign: 'bottom',
              color: '#212325',
            }}
          >
            {filteredKPIs.length} Results
          </span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '350px',
        }}>
          {filteredKPIs.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6B6B6B', fontSize: '12px' }}>
              No KPIs found.
            </p>
          ) : (
            filteredKPIs.map((kpi: KPI) => {
              const isExpanded = expandedKPIs.includes(kpi["KPI Name"]);
              const isSelected = selectedKPIs.includes(kpi["KPI Name"]);
              return (
                <div
                  key={kpi["KPI Name"]}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '15.02px',
                    paddingTop: '22.25px',
                    paddingRight: '13.02px',
                    paddingBottom: '22.25px',
                    paddingLeft: '13.02px',
                    border: isSelected ? '2px solid #0C8CE9' : '2px solid transparent',
                    background: isSelected ? '#F0F8FE' : '#FBFBFB',
                    boxShadow: '0px 2px 7.01px 0px #21232580',
                    transition: 'border 0.2s, box-shadow 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '2px solid #0C8CE9';
                    e.currentTarget.style.boxShadow = '0px 2px 7.01px 0px #21232580';
                    e.currentTarget.style.background = '#F0F8FE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = isSelected ? '2px solid #0C8CE9' : '2px solid transparent';
                    e.currentTarget.style.boxShadow = '0px 2px 7.01px 0px #21232580';
                    e.currentTarget.style.background = isSelected ? '#F0F8FE' : '#FBFBFB';
                  }}
                  onClick={() => toggleSelectKPI(kpi["KPI Name"])}
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
                      >{kpi["KPI Name"]}</h3>
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
                        {kpi.Definition}
                      </p>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); toggleKPI(kpi["KPI Name"]); }}
                      role="button"
                      aria-expanded={isExpanded}
                      aria-label={`Toggle details for ${kpi["KPI Name"]}`}
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
                    <div style={{ marginTop: '8px', textAlign: 'left', wordBreak: 'break-word' }}>
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
                        {kpi.Goal || 'Not specified.'}
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
                        {kpi.Benchmark || 'Not specified.'}
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
                        }}>Metric Type</strong><br />
                        {kpi["Metric Type"] || 'Not specified.'}
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
                        }}>Design Stage</strong><br />
                        {kpi["Design Stage"] || 'Not specified.'}
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
                        }}>User Journey Stage</strong><br />
                        {kpi["User Journey Stage"] || 'Not specified.'}
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
                        }}>B2B/B2C</strong><br />
                        {kpi["B2B/B2C"] || 'Not specified.'}
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
                        }}>Monetization Suitability</strong><br />
                        {kpi["Monetization Suitability"] || 'Not specified.'}
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
                        }}>Applicable Project Types</strong><br />
                        {kpi["Applicable Project Types"] || 'Not specified.'}
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
                        }}>More Info</strong><br />
                        {kpi["More Info"] ? <a href={kpi["More Info"]} target="_blank" rel="noopener noreferrer">{kpi["More Info"]}</a> : 'Not specified.'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '20px 20px',
        background: '#FFFFFF',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        justifyContent: 'space-between',
      }}>
        <SlButton
          variant="default"
          className="custom-export-button"
          aria-label="Export KPIs"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setIsExportPopupOpen(true)}
        >
          Export
          <img src={ExportIcon} alt="Export Icon" style={{ width: '15px', height: '15px', marginLeft: '5px' }} />
        </SlButton>
        <SlButton
          variant="primary"
          className="custom-import-button"
          aria-label="Import KPIs to Figma"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Import to Figma
          <img src={StarIcon} alt="Star Icon" style={{ width: '16px', height: '16px', marginLeft: '5px' }} />
        </SlButton>
      </div>

      {isExportPopupOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.8)',
              zIndex: 999,
            }}
            onClick={handlePopupClose}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              zIndex: 1000,
              width: '300px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div
              style={{
                position: 'relative',
                borderBottom: '1px solid #DDDDDD',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0em',
                  textAlign: 'center',
                  color: '#212325',
                  margin: 0,
                }}
              >
                Export File Type
              </h3>
              <button
                onClick={handlePopupClose}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: '#212325',
                  cursor: 'pointer',
                  padding: '0',
                  lineHeight: '1',
                }}
                aria-label="Close popup"
              >
                ×
              </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
              <li
                style={{ paddingBottom: '10px', cursor: 'pointer', position: 'relative' }}
                onMouseEnter={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FFFFFF';
                  if (button) button.style.display = 'flex';
                }}
                onMouseLeave={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FBFBFB';
                  if (button) button.style.display = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '246px',
                    borderRadius: '5px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#EEEEEE',
                    padding: '10px 12px 10px 8px',
                    background: '#FBFBFB',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <img src={IconCSV} alt="CSV Icon" style={{ width: '16px', height: '16px', color: '#0C8CE9' }} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <strong style={{ color: '#212325', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>CSV</strong>
                    <p style={{ color: '#6B6B6B', fontSize: '10px', margin: '4px 0 0' }}>
                      Simple text file storing data fields separated by commas.
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '124px',
                    height: '29px',
                    display: 'none',
                    background: '#0C8CE9',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    zIndex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                  onClick={(e) => { e.stopPropagation(); handleExport('csv'); }}
                  aria-label="Download CSV"
                >
                  Download
                  <img src={EI} alt="Download Icon" style={{ width: '18px', height: '18px', marginLeft: '5px', color: '#FFFFFF' }} />
                </button>
              </li>
              <li
                style={{ paddingBottom: '10px', cursor: 'pointer', position: 'relative' }}
                onMouseEnter={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FFFFFF';
                  if (button) button.style.display = 'flex';
                }}
                onMouseLeave={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FBFBFB';
                  if (button) button.style.display = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '246px',
                    borderRadius: '5px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#EEEEEE',
                    padding: '10px 12px 10px 8px',
                    background: '#FBFBFB',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <img src={IconJSON} alt="JSON Icon" style={{ width: '16px', height: '16px', color: '#0C8CE9' }} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <strong style={{ color: '#212325', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>JSON</strong>
                    <p style={{ color: '#6B6B6B', fontSize: '10px', margin: '4px 0 0' }}>
                      Lightweight text format storing structured data with key-value pairs.
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '124px',
                    height: '29px',
                    display: 'none',
                    background: '#0C8CE9',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    zIndex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                  onClick={(e) => { e.stopPropagation(); handleExport('json'); }}
                  aria-label="Download JSON"
                >
                  Download
                  <img src={EI} alt="Download Icon" style={{ width: '18px', height: '18px', marginLeft: '5px', color: '#FFFFFF' }} />
                </button>
              </li>
              <li
                style={{ paddingBottom: '10px', cursor: 'pointer', position: 'relative' }}
                onMouseEnter={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FFFFFF';
                  if (button) button.style.display = 'flex';
                }}
                onMouseLeave={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FBFBFB';
                  if (button) button.style.display = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '246px',
                    borderRadius: '5px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#EEEEEE',
                    padding: '10px 12px 10px 8px',
                    background: '#FBFBFB',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <img src={IconPDF} alt="PDF Icon" style={{ width: '16px', height: '16px', color: '#0C8CE9' }} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <strong style={{ color: '#212325', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>PDF</strong>
                    <p style={{ color: '#6B6B6B', fontSize: '10px', margin: '4px 0 0' }}>
                      Fixed-layout document format preserving fonts and images universally.
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '124px',
                    height: '29px',
                    display: 'none',
                    background: '#0C8CE9',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    zIndex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                  onClick={(e) => { e.stopPropagation(); handleExport('pdf'); }}
                  aria-label="Download PDF"
                >
                  Download
                  <img src={EI} alt="Download Icon" style={{ width: '18px', height: '18px', marginLeft: '5px', color: '#FFFFFF' }} />
                </button>
              </li>
              <li
                style={{ paddingBottom: '10px', cursor: 'pointer', position: 'relative' }}
                onMouseEnter={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FFFFFF';
                  if (button) button.style.display = 'flex';
                }}
                onMouseLeave={(e) => {
                  const div = e.currentTarget.querySelector('div');
                  const button = e.currentTarget.querySelector('button');
                  if (div) div.style.background = '#FBFBFB';
                  if (button) button.style.display = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '246px',
                    borderRadius: '5px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#EEEEEE',
                    padding: '10px 12px 10px 8px',
                    background: '#FBFBFB',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <img src={IconHTML} alt="HTML Icon" style={{ width: '16px', height: '16px', color: '#0C8CE9' }} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <strong style={{ color: '#212325', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>HTML</strong>
                    <p style={{ color: '#6B6B6B', fontSize: '10px', margin: '4px 0 0' }}>
                      Text-based language defining web page structure and content.
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '124px',
                    height: '29px',
                    display: 'none',
                    background: '#0C8CE9',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    zIndex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                  onClick={(e) => { e.stopPropagation(); handleExport('html'); }}
                  aria-label="Download HTML"
                >
                  Download
                  <img src={EI} alt="Download Icon" style={{ width: '18px', height: '18px', marginLeft: '5px', color: '#FFFFFF' }} />
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseKPIs;
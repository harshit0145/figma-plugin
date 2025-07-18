import React from 'react'
import Bullseye_Graphic from "../assets/images/Bullseye_Graphic.svg";
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import '@shoelace-style/shoelace/dist/themes/light.css';
import ButtonImage from "../assets/images/Frame.svg";
import Coffee from "../assets/images/Coffee_Icon.svg";
import Flavicon from "../assets/images/Flavicon.svg";
import Vector from "../assets/images/Vector.svg";

type Props = {
  goTo: (view: "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis") => void;
};

const HomeScreen = ({ goTo }: Props) => {
    return (
        <div
            style={{
                width: '100%',
                height: "auto",
                background: "#FFFFFF",
                fontFamily: "'Inter', sans-serif",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                margin: "0 auto",
                gap: "20px",
                borderRadius: "0px 0px 15px 15px",
            }}
        >
            <img
                src={Bullseye_Graphic}
                alt="Bullseye Graphic"
                style={{
                    width: "182px",
                    height: "182px",
                    margin: "30px auto 0px",
                    display: "block",
                }}
            />

            <h1
                style={{
                    fontWeight: 700,
                    fontSize: "21px",
                    lineHeight: "100%",
                    color: "black",
                    marginBottom: "5px",
                }}
            >
                Let’s get started!
            </h1>

            <p
                style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "100%",
                    color: "black",
                    marginBottom: "24px",
                    marginTop: "0px",
                }}
            >
                We’ll ask <strong style={{ fontWeight: 700 }}>6 questions</strong> about your product.<br /><br />
                Answer if you can, or just leave them blank.<br /><br />
                ( Don’t worry, this won’t take long. )
            </p>

            <div style={{ width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        marginBottom: "24px",
                        marginTop: "auto",
                    }}
                >
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
  className="recommend_kpi_btn"
  onClick={() => goTo("kpi")}
>
  Recommend KPIs
  <img
    src={ButtonImage}
    alt="Arrow Icon"
    style={{
      width: "16px",
      height: "16px",
      transform: "translateY(4px)",
      marginLeft: "3px",
    }}
  />
</SlButton>

                </div>

                <a
                    href="https://buymeacoffee.com/arsonistai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        width: "197px",
                        height: "24px",
                        margin: "0 auto",
                        borderRadius: "4px",
                        padding: "0 10px",
                        textDecoration: "none",
                    }}
                >
                    <p
                        style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "100%",
                            color: "#0C8CE9",
                            margin: "0",
                        }}
                    >
                        Buy us a coffee
                    </p>
                    <img
                        src={Coffee}
                        alt="Coffee Icon"
                        style={{
                            width: "24px",
                        }}
                    />
                </a>
            </div>
        </div>
    )
}

export default HomeScreen
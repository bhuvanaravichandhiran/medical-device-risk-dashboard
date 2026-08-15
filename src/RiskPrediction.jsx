import React, { useState } from "react";
import "./RiskPrediction.css";

function RiskPrediction() {

  const [manufacturer, setManufacturer] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [category, setCategory] = useState("");

  const handlePrediction = () => {

    if (!manufacturer || !deviceModel || !category) {
      alert("Please enter all device details.");
      return;
    }

    alert("Risk prediction will be generated here.");
  };

  return (
    <div className="risk-prediction">

      <div className="prediction-header">
        <h2>Device Risk Prediction</h2>
        <p>
          Enter medical device information to assess its failure risk.
        </p>
      </div>

      <div className="prediction-form">

        <div className="form-group">
          <label>Manufacturer</label>

          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          >
            <option value="">Select Manufacturer</option>
            <option value="Medtronic">Medtronic</option>
            <option value="GE Healthcare">GE Healthcare</option>
            <option value="Philips">Philips</option>
            <option value="Siemens Healthineers">
              Siemens Healthineers
            </option>
          </select>
        </div>


        <div className="form-group">
          <label>Device Model</label>

          <input
            type="text"
            placeholder="Enter device model"
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
          />
        </div>


        <div className="form-group full-width">
          <label>Device Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Device Category</option>
            <option value="Ventilator">Ventilator</option>
            <option value="Patient Monitor">Patient Monitor</option>
            <option value="Infusion Pump">Infusion Pump</option>
            <option value="X-Ray Machine">X-Ray Machine</option>
            <option value="MRI">MRI</option>
            <option value="Defibrillator">Defibrillator</option>
          </select>
        </div>


        <button
          className="predict-button"
          onClick={handlePrediction}
        >
          🔍 Predict Risk
        </button>

      </div>

    </div>
  );
}

export default RiskPrediction;
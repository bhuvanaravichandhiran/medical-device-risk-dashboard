import React, { useState, useEffect } from "react";

import RiskStats from "./RiskStats";
import RiskChart from "./RiskChart";
import SeverityDistribution from "./SeverityDistribution";
import RiskTrends from "./RiskTrends";
import RecentEvents from "./RecentEvents";

import dashboardService from "../api/dashboardService";

import "./Dashboard.css";


function Dashboard() {

  // =========================
  // STATE
  // =========================

  const [stats, setStats] = useState(null);

  const [severityData, setSeverityData] = useState(null);

  const [trendsData, setTrendsData] = useState(null);

  const [eventsData, setEventsData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [timeRange, setTimeRange] = useState("30days");


  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        setLoading(true);
        setError(null);

        /*
          Check whether backend URL
          is configured in .env
        */

        const backendAvailable =
          Boolean(import.meta.env.VITE_API_URL);


        if (backendAvailable) {

          /*
            Try to get data from backend.
            If one API fails, use mock data.
          */

          const [
            statsRes,
            severityRes,
            trendsRes,
            eventsRes
          ] = await Promise.all([

            dashboardService
              .getStats()
              .catch(() => null),

            dashboardService
              .getSeverityDistribution()
              .catch(() => null),

            dashboardService
              .getRiskTrends(timeRange)
              .catch(() => null),

            dashboardService
              .getRecentEvents(10)
              .catch(() => null),

          ]);


          setStats(statsRes || mockStats);

          setSeverityData(
            severityRes || mockSeverityData
          );

          setTrendsData(
            trendsRes || mockTrendsData
          );

          setEventsData(
            eventsRes || mockEventsData
          );


          /*
            If backend was configured but
            returned no data, inform user.
          */

          if (
            !statsRes &&
            !severityRes &&
            !trendsRes &&
            !eventsRes
          ) {

            setError(
              "Backend unavailable. Showing demo data."
            );

          }

        } else {

          /*
            No backend configured.
            Use demo data.
          */

          setStats(mockStats);

          setSeverityData(mockSeverityData);

          setTrendsData(mockTrendsData);

          setEventsData(mockEventsData);

        }

      } catch (err) {

        console.error(
          "Error fetching dashboard data:",
          err
        );

        setError(
          "Using demo data. Backend not available."
        );


        /*
          Fallback
        */

        setStats(mockStats);

        setSeverityData(mockSeverityData);

        setTrendsData(mockTrendsData);

        setEventsData(mockEventsData);

      } finally {

        setLoading(false);

      }

    };


    fetchDashboardData();

  }, [timeRange]);


  // =========================
  // TIME RANGE
  // =========================

  const handleTimeRangeChange = (range) => {

    setTimeRange(range);

  };


  // =========================
  // REFRESH
  // =========================

  const handleRefresh = () => {

    window.location.reload();

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div className="header-content">

          <h1>
            Risk Dashboard
          </h1>

          <p className="header-subtitle">
            Medical Device Risk Assessment Overview
          </p>

        </div>


        <div className="header-actions">

          <select
            value={timeRange}
            onChange={(e) =>
              handleTimeRangeChange(e.target.value)
            }
            className="time-range-select"
          >

            <option value="7days">
              Last 7 Days
            </option>

            <option value="30days">
              Last 30 Days
            </option>

            <option value="90days">
              Last 90 Days
            </option>

            <option value="1year">
              Last Year
            </option>

          </select>


          <button
            className="refresh-btn"
            onClick={handleRefresh}
          >
            🔄 Refresh
          </button>

        </div>

      </div>


      {/* ================= ERROR ================= */}

      {error && (

        <div className="error-alert">

          <p>
            ℹ️ {error}
          </p>

        </div>

      )}


      {/* ================= DASHBOARD CONTENT ================= */}

      <div className="dashboard-content">


        {/* ================= RISK STATS ================= */}

        <section className="dashboard-section full-width">

          <RiskStats
            stats={stats}
            loading={loading}
          />

        </section>


        {/* ================= RISK DISTRIBUTION ================= */}

        <section className="dashboard-section full-width">

          <RiskChart />

        </section>


        {/* ================= CHARTS ================= */}

        <section className="dashboard-section charts-grid">


          {/* Severity */}

          <div className="chart-column">

            <SeverityDistribution
              data={severityData}
              loading={loading}
            />

          </div>


          {/* Risk Trends */}

          <div className="chart-column">

            <RiskTrends
              data={trendsData}
              loading={loading}
            />

          </div>


        </section>


        {/* ================= RECENT EVENTS ================= */}

        <section className="dashboard-section full-width">

          <RecentEvents
            events={eventsData}
            loading={loading}
          />

        </section>


      </div>

    </div>

  );

}


// =====================================================
// MOCK DATA
// =====================================================


const mockStats = {

  total_devices: 287,

  high_risk_devices: 23,

  total_assessments: 450,

  recall_events: 12,

};


const mockSeverityData = [

  {
    name: "Critical",
    value: 12,
  },

  {
    name: "High",
    value: 45,
  },

  {
    name: "Medium",
    value: 120,
  },

  {
    name: "Low",
    value: 110,
  },

];


const mockTrendsData = [

  {
    date: "Aug 8",
    average_risk: 42,
    high_risk_count: 5,
  },

  {
    date: "Aug 9",
    average_risk: 45,
    high_risk_count: 6,
  },

  {
    date: "Aug 10",
    average_risk: 40,
    high_risk_count: 4,
  },

  {
    date: "Aug 11",
    average_risk: 48,
    high_risk_count: 8,
  },

  {
    date: "Aug 12",
    average_risk: 44,
    high_risk_count: 6,
  },

  {
    date: "Aug 13",
    average_risk: 50,
    high_risk_count: 9,
  },

  {
    date: "Aug 14",
    average_risk: 47,
    high_risk_count: 7,
  },

];


const mockEventsData = [

  {
    device_name: "Cardiac Monitor Pro",
    manufacturer: "MedTech Inc.",
    model: "CM-2024",
    risk_score: 78,
    severity: "High",
    assessment_date: "2026-08-14",
  },

  {
    device_name: "Blood Pressure Monitor",
    manufacturer: "Health Solutions Ltd.",
    model: "BP-500",
    risk_score: 45,
    severity: "Medium",
    assessment_date: "2026-08-13",
  },

  {
    device_name: "Glucose Meter",
    manufacturer: "DiabetesCare Corp.",
    model: "GM-X1",
    risk_score: 32,
    severity: "Low",
    assessment_date: "2026-08-12",
  },

  {
    device_name: "Ventilator System",
    manufacturer: "CriticalCare Med.",
    model: "VS-9000",
    risk_score: 92,
    severity: "Critical",
    assessment_date: "2026-08-11",
  },

  {
    device_name: "ECG Device",
    manufacturer: "CardioTech Industries",
    model: "ECG-3500",
    risk_score: 56,
    severity: "Medium",
    assessment_date: "2026-08-10",
  },

];


export default Dashboard;
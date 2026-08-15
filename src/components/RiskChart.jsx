import "./RiskChart.css";

function RiskChart() {

  const riskData = [
    {
      name: "Critical",
      value: 12,
      percentage: 4
    },
    {
      name: "High",
      value: 70,
      percentage: 26
    },
    {
      name: "Medium",
      value: 145,
      percentage: 53
    },
    {
      name: "Low",
      value: 273,
      percentage: 100
    }
  ];

  return (
    <div className="risk-chart">

      {riskData.map((risk) => (

        <div className="risk-row" key={risk.name}>

          <div className="risk-label">
            <span>{risk.name}</span>
            <strong>{risk.value}</strong>
          </div>

          <div className="risk-bar-background">

            <div
              className={`risk-bar ${risk.name.toLowerCase()}`}
              style={{
                width: `${risk.percentage}%`
              }}
            />

          </div>

        </div>

      ))}

    </div>
  );
}

export default RiskChart;
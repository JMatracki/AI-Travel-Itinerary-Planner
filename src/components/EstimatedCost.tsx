import React from "react";

interface EstimatedCostProps {
  cost: string;
  label: string;
}

const EstimatedCost: React.FC<EstimatedCostProps> = ({ cost, label }) => {
  return (
    <div className="mt-4 text-xl text-green-600">
      {label}: {cost}
    </div>
  );
};

export default EstimatedCost;

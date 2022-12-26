import { FC, useState } from "react";
import {
  AdvancedRealTimeChart,
  AdvancedChartBarStyle,
} from "react-tradingview-widget-components";

type ChartProps = {
  symbol: string;
};

const modes = [
  { title: "DARK MODE", bool: true },
  { title: "LIGHT MODE", bool: false },
];

const Chart: FC<ChartProps> = ({ symbol }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  return (
    <div className="p-4 text-2xl">
      <div className="flex justify-center mb-4">
        {modes.map((mode) => {
          return (
            <p
              key={mode.title}
              onClick={() => setIsDarkMode(mode.bool)}
              className={`inline-block mx-3 cursor-pointer hover:opacity-70 transition ease-in-out duration-300 ${
                mode.bool === isDarkMode ? "font-bold" : ""
              }`}
            >
              {mode.title}
            </p>
          );
        })}
      </div>
      <AdvancedRealTimeChart
        theme={isDarkMode ? "dark" : "light"}
        style={AdvancedChartBarStyle.BARS}
        symbol={symbol}
      />
    </div>
  );
};

export default Chart;

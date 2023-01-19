import { FC } from "react";
import { Range, getTrackBackground } from "react-range";
import { TwoThumbsProps } from "./interfaces";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

const StockPriceFilter: FC<TwoThumbsProps> = ({
  rtl,
  rangeValues,
  setRangeValues,
}) => {
  return (
    <div className="flex flex-col flex-wrap w-full items-end relative transition-all ease-in-out duration-300">
      <Range
        values={rangeValues}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(rangeValues) => {
          setRangeValues(rangeValues);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{ ...props.style }}
            className="h-[48px] flex w-full mr-8 relative"
          >
            <div
              ref={props.ref}
              className="h-[5px] w-full rounded self-center	"
              style={{
                background: getTrackBackground({
                  values: rangeValues,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
              }}
            >
              {children}
            </div>

            <output
              className="absolute top-0 w-full text-center"
              id="output"
              style={{ fontSize: "12px" }}
            >
              {rangeValues[0].toFixed(1)} - {rangeValues[1].toFixed(1)}
            </output>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className="h-[12px] w-[12px] rounded bg-white flex justify-center items-center"
            style={{
              ...props.style,
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              className="h-[6px] w-[3px]"
              style={{ backgroundColor: isDragged ? "#548BF4" : "#CCC" }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default StockPriceFilter;

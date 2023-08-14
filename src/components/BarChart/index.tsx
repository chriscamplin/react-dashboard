import { useMemo } from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Item } from "../Dashboard";
const verticalMargin = 120;

// accessors
const getName = (d: any) => d.name;
const getValue = (d: any) => Number(d.value);

type Props = {
  width: number;
  height: number;
  data: Item;
};

const margins = {
  left: 30,
};

/**
 * Represents a bar chart component using the @visx library.
 *
 * @param {Object} props - The props for the BarChart component.
 * @param {number} props.width - The width of the SVG container.
 * @param {number} props.height - The height of the SVG container.
 * @param {Item} props.data - The data object containing attributes for the bar chart.
 */

export function BarChart({ width, height, data }: Props) {
  // bounds
  const xMax = width - margins.left;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.attributes.map(getName),
        padding: 0.4,
      }),
    [data, xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.attributes.map(getValue))],
      }),
    [data, yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={4} />
      <Group top={verticalMargin / 2} left={margins.left}>
        {data.attributes.map((d) => {
          const name = getName(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getValue(d)) ?? 0);
          const barX = xScale(name);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${name}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
        <AxisBottom
          numTicks={data.attributes.length}
          top={yMax}
          scale={xScale}
          tickLabelProps={() => ({
            fill: "#202020",
            fontSize: 11,
            textAnchor: "middle",
          })}
          label={"Value"}
        />
        <AxisLeft
          scale={yScale.nice()}
          numTicks={10}
          top={0}
          tickLabelProps={(e) => ({
            fill: "#202020",
            fontSize: 10,
            textAnchor: "end",
            x: -12,
            y: (yScale(e) ?? 0) + 3,
          })}
          label={"Name"}
        />
      </Group>
    </svg>
  );
}

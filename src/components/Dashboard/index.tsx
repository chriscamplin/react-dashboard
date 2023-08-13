import React, { ChangeEvent, Component } from "react";
import axios, { AxiosResponse } from "axios";
import { Table, Input } from "reactstrap";
import { ParentSize } from "@visx/responsive";
import { BarChart } from "../BarChart";
export interface Item {
  title: string;
  attributes: Array<{
    name: string;
    value: number;
    unit: string;
  }>;
}

interface DashboardProps {}

interface DashboardState {
  currentItem: Item;
  range: number;
  data: Item[];
}

type RangeInputProps = {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
};

const RangeInput = ({ value, onChange, min, max }: RangeInputProps) => {
  return (
    <Input type="range" min={min} max={max} value={value} onChange={onChange} />
  );
};

export default class Dashboard extends Component<{}, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      currentItem: {
        title: "",
        attributes: [],
      },
      range: 0,
      data: [],
    };
  }
  handleRangeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event;
    if (!target) return;
    const targetValue = Number((target as HTMLInputElement).value);
    const curr = this.state.data[targetValue];
    this.setState({
      range: targetValue,
      currentItem: {
        title: curr.title,
        attributes: curr.attributes,
      },
    });
  };

  componentDidMount() {
    // Fetch the data from the JSON file.
    axios("/data/data.json")
      .then(({ data }: AxiosResponse) => {
        return data;
      })
      .then((data) => {
        if (data) {
          this.setState({ data });
          this.setState({ currentItem: data[0] });
        }
      })
      .catch(function (error: any) {
        console.error(error);
      });
  }

  render() {
    const { currentItem, data, range } = this.state;

    const rows = (
      <tr key={currentItem.title}>
        <td>{currentItem.title}</td>
        {currentItem.attributes.map((attribute) => (
          <td>
            {attribute.value} {attribute.unit}
          </td>
        ))}
      </tr>
    );

    return (
      <div className="container">
        {currentItem && <h1>{currentItem.title}</h1>}

        <div className="grid-layout">
          {data && (
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Length</th>
                  <th>Width</th>
                  <th>Height</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          )}

          {data && (
            <div className="chart-container">
              <ParentSize>
                {(props: { width: number; height: number }) => (
                  <BarChart data={currentItem} {...props} />
                )}
              </ParentSize>
            </div>
          )}
        </div>
        <RangeInput
          value={range}
          onChange={this.handleRangeChange}
          min={0}
          max={this.state.data.length - 1}
        />
      </div>
    );
  }
}

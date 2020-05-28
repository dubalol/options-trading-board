import React from "react"
import styled from "styled-components"
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Legend, styler } from "react-timeseries-charts";
import { TimeSeries } from "pondjs";

import CrossHairs from "./components/CrossHairs"

class Graph extends React.Component {
  constructor() {
    super();

    this.state = {
      x: null,
      y: null
    }
  }

  handleMouseMove(x, y) {
    this.setState({ x, y })
  }

  handleMouseOut() {
    console.log('mouse left')
    this.setState({x: null, y: null})
  }
  render() {
    const { focus } = this.props;

    const history = [
      [1400425947000, 7, 9, 8],
      [1400425948000, 10, 20, 15],
      [1400425949000, 12, 16, 14],
      [1400425950000, 10, 14, 12]
    ]

    const data = {
      name: "balance",
      columns: ["time", "bid", "ask", "mid"],
      points: focus ? focus.history : []
    };
    
    const series = new TimeSeries(data);
    const upDownStyle = styler([
      { key: "bid", color: "red" }, 
      { key: "ask", color: "blue" },
      { key: "mid", color: "green" }
  ]);
    return (
      <Div>
        {!focus ? `Select a contract` :
        <>
          <ChartContainer
            timeRange={series.range()}
            width={300}
            format={"%b-%d"}
            // minDuration={1000 * 60 * 60 * 24}
            onMouseMove={(x, y) => this.handleMouseMove(x, y)} 
            onMouseOut={() => this.handleMouseOut()}
          >
            <ChartRow 
              height="200">
                <YAxis 
                  id="axis1" 
                  label="$"
                  min={0}
                  max={1.1*series.max("ask")}
                  width="40"
                  type="linear"
                  format=",.1f"/>
                <Charts>
                    <LineChart
                      axis="axis1"
                      series={series}
                      columns={["bid", "ask", "mid"]}
                      interpolation={"curveLinear"}
                      style={upDownStyle}
                    />
                    <CrossHairs x={this.state.x} y={this.state.y} />
                </Charts>
            </ChartRow>
          </ChartContainer>
          <Legend
            type="swatch"
            style={upDownStyle}
            categories={[
                { key: "bid", label: "BID" },
                { key: "ask", label: "ASK" },
                { key: "mid", label: "MID" }
            ]}
          />
        </>
        }
      </Div>
    )
  }
}

const Div = styled.div`
height: 100%; 
border: 1px solid black;
align-items: center;
`;

export default Graph;
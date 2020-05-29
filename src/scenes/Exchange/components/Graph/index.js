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

    const data = {
      name: "balance",
      columns: ["time", "bid", "ask", "mid", "brk"],
      points: focus ? focus.history : []
    };
    
    const series = new TimeSeries(data);

    const keyStyle = styler([
      { key: "bid", color: "green", width: 2 }, 
      { key: "ask", color: "red", width: 2 },
      { key: "mid", color: "#1ec2f2", width: 4 },
      { key: "brk", color: "#c28e29", width: 3, dashed: true }
    ]);

    const axisStyle = { 
      label: { 
        stroke: "none", fill: "grey",
        fontWeight: 100, fontSize: 12, font: '"Goudy Bookletter 1911", sans-serif"' 
      }, 
      values: { 
        stroke: "none", fill: "grey",
        fontWeight: 100, fontSize: 11, font: '"Goudy Bookletter 1911", sans-serif"' 
      }, 
      ticks: { fill: "none", stroke: "#252b33" }, 
      axis: { fill: "none", stroke: "#252b33" }
    }

    // ! Need to get to the bottom of this
    // const legendStyle = {
    //   label: { 
    //     normal: {
    //       fontSize: "normal", color: "grey"
    //     }
    //   },
    //   values: {
    //     normal: {
    //       fontSize: "normal", color: "grey"
    //     }
    //   }
    // }

    return (
      <Div>
        {!focus ? `Default Graph` :
        <>
          <ChartContainer
            timeRange={series.range()}
            hideTimeAxis={true}
            width={340}
            format={"%b-%d"}
            // minDuration={1000 * 60 * 60 * 24}
            onMouseMove={(x, y) => this.handleMouseMove(x, y)} 
            onMouseOut={() => this.handleMouseOut()}
          >
            <ChartRow 
              height="170">
                <YAxis 
                  hideAxisLine={true}
                  showGrid={true}
                  id="axis1" 
                  label="$"
                  min={series.min("bid") - (0.2*(series.min("ask") - series.max("bid")))}
                  max={series.max("ask") + (0.2*(series.min("ask") - series.max("bid")))}
                  width="40"
                  type="linear"
                  format=",.0f"
                  style={axisStyle}
                  />
                <Charts>
                    <LineChart
                      axis="axis1"
                      series={series}
                      columns={["bid", "ask", "mid", "brk"]}
                      interpolation={"curveLinear"}
                      style={keyStyle}
                    />
                    <CrossHairs x={this.state.x} y={this.state.y} />
                </Charts>
            </ChartRow>
          </ChartContainer>
          <Legend
            type="swatch"
            style={keyStyle}
            categories={[
                { key: "bid", label: "BID" },
                { key: "ask", label: "ASK" },
                { key: "mid", label: "MID" },
                { key: "brk", label: "BREAKEVEN" }
            ]}
            // labelStyle={legendStyle}
          />
        </>
        }
      </Div>
    )
  }
}

const Div = styled.div`
  background-color: ${props => props.theme.bgCard1};
  border-bottom: 1px solid ${props => props.theme.borderCard};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Graph;
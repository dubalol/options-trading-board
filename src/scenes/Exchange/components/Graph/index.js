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
      columns: ["time", "bid", "ask", "mid", "brk"],
      points: focus ? focus.history : []
    };
    
    const series = new TimeSeries(data);

    const keyStyle = styler([
      { key: "bid", color: "green", width: 2 }, 
      { key: "ask", color: "red", width: 2 },
      { key: "mid", color: "#3c526b", width: 4 },
      { key: "brk", color: "#c28e29", width: 4, dashed: true }
    ]);

    const keys = ["bid", "ask", "mid", "brk"]
    // keys.forEach(key => {
    //   keyStyle[key].label = {
    //     normal: { color: 'white' },
    //     highlighted: { color: 'white' },
    //     selected: { color: 'white' },
    //     muted: { color: 'white' }
    //   }
    // })

    return (
      <Div>
        {!focus ? `Default Graph` :
        <>
          <ChartContainer
            timeRange={series.range()}
            hideTimeAxis={true}
            width={300}
            format={"%b-%d"}
            // minDuration={1000 * 60 * 60 * 24}
            onMouseMove={(x, y) => this.handleMouseMove(x, y)} 
            onMouseOut={() => this.handleMouseOut()}
          >
            <ChartRow 
              height="200">
                <YAxis 
                  hideAxisLine={true}
                  showGrid={true}
                  id="axis1" 
                  label="$"
                  min={0.9*series.min("bid")}
                  max={1.11*series.max("ask")}
                  width="40"
                  type="linear"
                  format=",.0f"/>
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
            // labelStyle={labelStyle}
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

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";
import { useAuth } from "../../context/AuthContext";

// const data = [
//   {
//     name: "user 1",
//     success: 1,

//   },
//   {
//     name: "user 2",
//     success: 4,

//   },
//   {
//     name: "user 3",
//     success: 6,

//   },
// ];

const renderCustomizedLabel = (props) => {
  const { x, y, width, value, fill } = props;
  const radius = 10;
  const percent = Math.floor(parseInt(value) / 7 * 100)

  return (
    <g>
      {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} /> */}
      <text
        x={x + width / 2}
        y={y - radius}
        fill={fill}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {percent}%
      </text>
    </g>
  );
};

export default function Chart(props) {
    const {challengeLog} = props;
    const {groupMemberData} = useAuth();

    const getChartData = () => {
        if (groupMemberData == null || challengeLog == null) {return []}
        
        //console.log("check challengelog in chart:", challengeLog)
        const dataForChart = groupMemberData.map((user, index) => {
          return { "success": challengeLog[index].counterSuccess, "name": user.userName}
        })
        return dataForChart
      }

    const data = getChartData();

    const chartColors = [
        "#0891A8",
        "#E993B1",
        "#F16643",
        "#FBE536",
        "#0891A8",
      ];

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      maxBarSize={7}
      minBarSize={7}
      margin={{
        top: 5,
        right: 40,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis label={{ value: 'Success Rate (days)', angle: -90 }} domain={[0, 7]}/>
      <Tooltip />
      <Bar dataKey="success" barSize={40} minPointSize={5}>
        <LabelList dataKey="success" content={renderCustomizedLabel} />
        {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={chartColors[index]} />
      ))}
      </Bar>
    </BarChart>
  );
}

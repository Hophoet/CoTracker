import React from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";


const buildChartData = (data, casesType='cases') => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};



class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chartData:null,
      isLoading: true
     }
  }
     _getChartData = async  (type) => {
         this.setState({isLoading:true})
         await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // console.log('DATA types', data )
                let chartData = buildChartData(data, type);
                this.setState({isLoading:false})
                this.setState({chartData:chartData})
                // return chartData
          
              })
              .catch((error) => {
                console.log('ERROR', error)
              })
    }
    componentDidMount() {
      this._getChartData(this.props.type )
      // console.log('Component dit mount!!')
    }

  
  
  render() { 
  
    let color = this.props.color
    let type = this.props.type 
    let data = this.props.data

    let formatedData
    if (data){  
      // console.log('PROPS DATA')
      formatedData = buildChartData(data, type)
    }
    else {
      // console.log('STATE DATA')
      formatedData = this.state.chartData
    }
    // this._getChartData(type)
    // console.log('RENDER')
    

    return ( 
      <div className='linechart' >
        { !this.state.isLoading && (
            <Line
            data={{
                datasets: [
                {
                    backgroundColor: color.backgroundColor,
                    borderColor: color.borderColor,
                    data: formatedData,
                },
                ],
            }}
            options={options}
            />
        )}
    </div>
     );
  }
}
 
export default LineChart;


// function LineGraph({ casesType, type, color }) {
//   let [chartData, setchartData] = useState({});

//   useEffect(() => {
//     const fetchData =  () => {
//        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log('DATA', data )
//           let chartData = buildChartData(data, type);
//           console.log('FORMATED DATA', chartData)
//           setchartData(chartData)
     
//         });
//     };
    


//   }, [casesType]);
   
//   let d = require('../data/historical.all.json')
//   let s =  getchartData('cases')
//   console.log('s', s)



//   // console.log('TYPE', t)
//    let formatedData = buildChartData(d, type)
//   let data = formatedData
//   console.log('el')

//   return (

//         <div className='linechart' >
//           {data?.length > 0 && (
//               <Line
//               data={{
//                   datasets: [
//                   {
//                       backgroundColor: color.backgroundColor,
//                       borderColor: color.borderColor,
//                       data: data,
//                   },
//                   ],
//               }}
//               options={options}
//               />
//           )}
//         </div>
       
//   );
// }

// export default LineGraph;





const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



class MyChart extends React.Component
{
    constructor(props) {
        super(props);
        //console.log(props);

    }
    data = {
        labels: this.props.labels,
        datasets: [
          {
            label: '# of Votes',
            data: this.props.data,
                backgroundColor: [
              'rgba(10,255,0, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(10,255,100, 0.2)',
            ],
                borderColor: [
                    'rgba(10,255,0, 0.2)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(10,255,100, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
    };
    
    render() {
  
            return <Pie data={this.data} />;
    }
}

export default MyChart;
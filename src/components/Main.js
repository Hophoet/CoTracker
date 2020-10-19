
import React, { Component } from 'react';
import LineChart from './LineChart'
import {
    MenuItem,
    FormControl,
    Select,
    Button,

    

  } from "@material-ui/core";
import logo from '../assets/ls.svg'
import chartGif from '../assets/l.gif'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            types: require('../data/historical.all.json'),
            selectedType: 'cases',
            data: null,
            isLoading:false
         }
    }
    componentDidMount(){
        this._getData()
    }

    _getData = async (type='cases') => {
        // console.log('loading data....')
        this.setState({isLoading:true})
        this.setState({selectedType:type})
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // console.log('DATA types', data )
                this.setState({data:data})
                this.setState({isLoading:false})
                
         
          
              })
    }
    //callback for the cart type selection
    onTypeChange = async (e) => {
        
        //get the selected type
        const type = e.target.value;
        //set the selected type to the state
        this._getData(type)
    }
    
    _showChart = (colors) => {
        if(this.state.isLoading){
            return (
                <div className="main__loading_container">
                    <p className='main_loading_title'>loading..</p>
                    <img className='main__loading_image' src={chartGif} alt='logo'/>
                    <Button onClick={() => this._getData()} variant="contained">Reload</Button>
                </div>
                
            )
        }
        return (
            <LineChart color={colors[this.state.selectedType]} data={this.state.data} type={this.state.selectedType}/>

        )
    }
    render() { 
        let data = [{title:'deaths', value:1}, {title:'recovered', value:2}]
        let colors = {
            'cases':{backgroundColor: "rgba(204, 16, 52, 0.5)", borderColor: "#CC1034"},
            'deaths':{backgroundColor: "rgba(204, 16, 52, 0.5)", borderColor: "#CC1034"},
            'recovered':{backgroundColor: "rgba(16, 204, 52, 0.5)", borderColor: "#10CC34"},
        }




        return ( 
        <div className="main">
            <div className="main__main_container" >
                <div className="main__header_container" >
                    <div className="main__dropdown_container" >
                        <FormControl className="app__dropdown">
                            <Select
                            className='county_selected'
                            variant="outlined"
                            value={this.state.selectedType}
                            onChange={this.onTypeChange}
                            >
                            <MenuItem value="cases">cases</MenuItem>
                            {data.map((type) => (
                                <MenuItem value={type.title}>{type['title']}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <div className="main__download_button_container">
                           
                        </div>
                    </div>
                    <div className="main__title_container" >
                        <h2 className="main__title" >CoTracker</h2>
                    
                        <p className="main__made_by" >code with 
                            <img className='code_with_love_image' src={logo} alt="loading..." />
                            by<a className="main__made_by_author_link" rel="noopener noreferrer" href='https://www.instagram.com/hophoet/' target='_blank'>@HOPHOET</a>
                        </p>
                    </div>
                    
                </div>
                {this._showChart(colors)}
            </div>
        </div>
         );
    }
}
 
export default Main;



import React, { Component } from 'react';
import LineChart from './LineChart'
import {
    MenuItem,
    FormControl,
    Select,
    Button,
    IconButton,
    

  } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import logo from '../assets/ls.svg'
import app from '../data/Doitv4.apk'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            types: require('../data/historical.all.json'),
            selectedType: 'cases',
         }
    }

    // _formatTypes = (types) => {
    //         let typesFormated = []
    //         let objectKeys = Object.keys(types)
    //         // console.log(objectKeys)
    //         for(let index in objectKeys){ 
    //             let key = objectKeys[index]
    //             // let value = types[key]
    //             // value.title = key
    //             // console.log('key '+key)
    //             // console.log('value '+types[key])
    //             // let objectClone = new Object()
    //             // objectClone[key] = {value:index, title:key}
    //             typesFormated.push({value:index, title:key})
    //         }
           
        
    //     return typesFormated
    // }
    //callback for the cart type selection
    onTypeChange = async (e) => {
        //get the selected type
        const type = e.target.value;
        //set the selected type to the state
        // this.setState({selectedType:type})
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log('DATA types', data )
         
          
              })
    }
    
    
    render() { 
        //console.log(logo)
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
                        <h2 className="main__title" >COVID-19 Tracker</h2>
                    
                        <p className="main__made_by" >code with 
                            <img className='code_with_love_image' src={logo} alt='logo'/>
                        by 
                            
                            <a className="main__made_by_author_link" href='https//www.instagram.com/hophoet' target='_blank'>@hophoet</a>
                        </p>
                    </div>
                    
                </div>
                <LineChart color={colors[this.state.selectedType]} type={this.state.selectedType}/>
            </div>
        </div>
         );
    }
}
 
export default Main;



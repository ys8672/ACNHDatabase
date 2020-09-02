import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter} from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import { PieChart } from 'react-minimal-pie-chart';
import { Tabs, Tab } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const TITLE = 'AC:NH Villagers'

class Villagers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            villagers: []
        }
    }

    componentDidMount() {
        fetch('/api/villagers/').then(r => r.json()).then(villager_data => {
            this.setState({villagers: villager_data.villagers})
        })

    }
	
		
    render() {
		const data = this.state.villagers
		
		let res = data.reduce(function(obj, v) {
		  obj[v.gender] = (obj[v.gender] || 0) + 1;
		  return obj;
		}, {})
		
		let personalityChart = data.reduce(function(obj, v) {
		  obj[v.personality] = (obj[v.personality] || 0) + 1;
		  return obj;

		}, {})
		let personalityList = []
		for (const key in personalityChart) {
			let tmp = {label: key, value: personalityChart[key]}
			personalityList.push(tmp)
		}
		
		let speciesChart = data.reduce(function(obj, v) {
		  obj[v.species] = (obj[v.species] || 0) + 1;
		  return obj;

		}, {})
		let speciesList = []
		for (const key in speciesChart) {
			let tmp = {label: key, value: speciesChart[key]}
			speciesList.push(tmp)
		}
			
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell}
                     alt="not found" style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }
		
		function imageFormatter2(cell, row) {
            return (
                <img className="img" src={cell}
                     alt="not found" style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
		function villagerFormatter(cell, row) {
            return (
				<div>
					<b><Link to={{pathname: `/villagers/${row.id}/`}}>{cell}</Link></b>
				</div>
                
            );
        }
		
		function ordinal_suffix_of(i) {
			var j = i % 10,
				k = i % 100;
			if (j === 1 && k !== 11) {
				return i + "st";
			}
			if (j === 2 && k !== 12) {
				return i + "nd";
			}
			if (j === 3 && k !== 13) {
				return i + "rd";
			}
			return i + "th";
		}
		
		function birthdayFormatter(cell, row) {
			var fields = cell.split('/');
			var month = parseInt(fields[1]);
			var day = parseInt(fields[0]);
			
			switch(month){
				case 1:
					month = "January";
					break;
				case 2:
					month = "February";
					break;
				case 3:
					month = "March";
					break;
				case 4:
					month = "April";
					break;
				case 5:
					month = "May";
					break;
				case 6:
					month = "June";
					break;
				case 7:
					month = "July";
					break;
				case 8:
					month = "August";
					break;
				case 9:
					month = "September";
					break;
				case 10:
					month = "October";
					break;
				case 11:
					month = "November";
					break;
				case 12:
					month = "December";
					break;
				default:
					break;
			}
			day = ordinal_suffix_of(day)
			
			return month + " " + day
		}		
		
		function birthdaySort(a, b, order, dataField, rowA, rowB) {
			var aFields = a.split('/');
			var aMonth = parseInt(aFields[1]);
			var aDay = parseInt(aFields[0]);
			var bFields = b.split('/');
			var bMonth = parseInt(bFields[1]);
			var bDay = parseInt(bFields[0]);
			var time1 = new Date(2020, aMonth, aDay); // year, month, day
			var time2 = new Date(2020, bMonth, bDay);
			if (order === 'asc') {
				return time1 - time2;
			}
			return time2 - time1;
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
		const selectGender={
			Male: 'Male',
			Female: 'Female'
		}
		
		const selectPersonality= {
			Cranky: 'Cranky',
			Jock: 'Jock',
			Lazy: 'Lazy',
			Normal: 'Normal',
			Peppy: 'Peppy',
			Smug: 'Smug',
			Snooty: 'Snooty',
			Uchi: 'Uchi'	
		};
		
		const selectSpecies= {
			Alligator: 'Alligator',
			Anteater: 'Anteater',
			Bear: 'Bear',
			Bird: 'Bird',
			Bull: 'Bull',
			Cat: 'Cat',
			Chicken: 'Chicken',
			Cow: 'Cow',
			Cub: 'Cub',
			Deer: 'Deer',
			Dog: 'Dog',
			Duck: 'Duck',
			Eagle: 'Eagle',
			Elephant: 'Elephant',
			Frog: 'Frog',
			Goat: 'Goat',
			Gorilla: 'Gorilla',
			Hamster: 'Hamster',
			Hippo: 'Hippo',
			Horse: 'Horse',
			Kangaroo: 'Kangaroo',
			Koala: 'Koala',
			Lion: 'Lion',
			Monkey: 'Monkey',
			Mouse: 'Mouse',
			Octopus: 'Octopus',
			Ostrich: 'Ostrich',
			Penguin: 'Penguin',
			Pig: 'Pig',
			Rabbit: 'Rabbit',
			Rhino: 'Rhino',
			Sheep: 'Sheep',
			Squirrel: 'Squirrel',
			Tiger: 'Tiger',
			Wolf: 'Wolf'
		};
		
		const { SearchBar } = Search;
        const {villagers} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Villager Name',
                sort: true,
				formatter: villagerFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'icon',
                text: 'Villager Icon',
                sort: false,
                formatter: imageFormatter2,
				searchable: false,
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Villager Photo',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'species',
                text: 'Species',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSpecies[cell],
				filter: selectFilter({
					options: selectSpecies
				})
            },{
                dataField: 'personality',
                text: 'Personality',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectPersonality[cell],
				filter: selectFilter({
					options: selectPersonality
				})
            },{
                dataField: 'gender',
                text: 'Gender',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectGender[cell],
				filter: selectFilter({
					options: selectGender
				})
            }, {
                dataField: 'birthday',
                text: 'Birthday',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter(),
				filterValue: birthdayFormatter,
				formatter: birthdayFormatter,
				sortFunc: birthdaySort
            }, {
                dataField: 'catchPhrase',
                text: 'Catch Phrase',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }
            ]
        }

		function mobileName(cell, row){
			return (
				<div>
					<h5><b>Villager Name: <Link to={{pathname: `/villagers/${row.id}/`}}>{cell}</Link></b></h5>
				</div>
            );
		}
		
		function mobileSpecies(cell, row){
			return (
				<div>
					<b>Species: </b> {cell}
				</div>
            );
		}
		
		function mobilePersonality(cell, row){
			return (
				<div>
					<b>Personality: </b> {cell}
				</div>
            );
		}
		
		function mobileGender(cell, row){
			return (
				<div>
					<b>Gender: </b>{cell}
				</div>
            );
		}
		
		function mobileBirthday(cell, row){
			return (
				<div>
					<b>Birthday: </b> {birthdayFormatter(cell)}
				</div>
            );
		}
		
		function mobileCatchPhrase(cell, row){
			return (
				<div>
					<b>Catch Phrase: </b> {cell}
				</div>
            );
		}
		
		const { mobilecol } = {
            mobilecol:
			[{
                dataField: 'name',
                text: 'Villager Name',
				formatter: mobileName,
				align: "center",
				headerAlign: 'center',
            },{
                dataField: 'image',
                text: 'Villager Photo',
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'species',
                text: 'Species',
				align: "center",
				headerAlign: 'center',
				formatter: mobileSpecies
            },{
                dataField: 'personality',
                text: 'Personality',
				align: "center",
				headerAlign: 'center',
				formatter: mobilePersonality
            },{
                dataField: 'gender',
                text: 'Gender',
				align: "center",
				headerAlign: 'center',
				formatter: mobileGender
            }, {
                dataField: 'birthday',
                text: 'Birthday',
				align: "center",
				headerAlign: 'center',
				formatter: mobileBirthday,
				filterValue: birthdayFormatter,
            }, {
                dataField: 'catchPhrase',
                text: 'Catch Phrase',
				align: "center",
				headerAlign: 'center',
				formatter: mobileCatchPhrase
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }]
		}; 
		
		const defaultLabelStyle = {
		  fontSize: '5px',
		  fontFamily: 'sans-serif',
		};
				
		//for some reason if I don't have charts as the defaultActiveKey first the bubble chart text starts at the center instead
		//of being centered. Until this is figured out I have no choice but to keep it like this for now.
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Villagers</h1>				
				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">
				  <Tab eventKey="table" title="Table">		
					<BrowserView>
					<BootstrapTable
							bootstrap4
							keyField = "id"
							data={ villagers }
							columns={ columns }
							striped
							pagination={ paginationFactory({sizePerPage: 25}) }
							defaultSorted={ defaultSorted } 
							filter={ filterFactory() }
						/>
					</BrowserView>
					
					<MobileView>
						<ToolkitProvider
						  keyField="id"
						  data={ villagers }
						  columns={ mobilecol }
						  search
						>
						  {
							props => (
							  <div>
								<div style={{display: 'flex', justifyContent: 'center'}}>
									<SearchBar { ...props.searchProps }/>
								</div> 
								<hr />
								<BootstrapTable
								  { ...props.baseProps }
								  striped
								  pagination={ paginationFactory() }
								/>
							  </div>
							)
						  }
						</ToolkitProvider>
					</MobileView>
				  </Tab>

				  <Tab eventKey="charts" title="Fun Charts">

						<div class="border border-success">
							<h3 className='text-center'> Villagers By Gender </h3>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<PieChart data={[
									{ title: 'Male', value: res.Male, color: '#add8e6' },
									{ title: 'Female', value: res.Female, color: '#FFC0CB' },
								  ]}
								label={({ dataEntry }) => (dataEntry.value + " " + dataEntry.title + " Villagers (" + Math.round(dataEntry.percentage) + '%)')}
								style={{maxHeight: '500px', maxWidth: '500px'}}
								labelStyle={{
									...defaultLabelStyle,
								}}
								/>
							</div>
							<br/>
						</div>

					<div class="border border-success">
					  <h3 className='text-center'> Villagers By Personality </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart
							graph={{
								zoom: 1.0,
							}}
							width={750}
							height={750}
							padding={1} // optional value, number that set the padding between bubbles
							showLegend={true} // optional value, pass false to disable the legend.
							legendPercentage={20} // number that represent the % of with that legend going to use.
							valueFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							labelFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							data={personalityList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>

					<div class="border border-success">
					  <h3 className='text-center'> Villagers By Species </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={1000}
							height={1000}
							padding={1} // optional value, number that set the padding between bubbles
							showLegend={true} // optional value, pass false to disable the legend.
							legendPercentage={20} // number that represent the % of with that legend going to use.
							legendFont={{
								family: 'Arial',
								size: 12,
								color: '#000',
								weight: 'bold',
							}}
							valueFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							labelFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							data={speciesList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>

				  </Tab>
				</Tabs>
			</div>
        )
    }
}


export default Villagers;
import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter  } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ShowMoreText from 'react-show-more-text';
import { Tabs, Tab } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import { VictoryAxis, VictoryChart, VictoryBoxPlot } from 'victory';

const TITLE = 'AC:NH Bugs'

class Bugs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: []
        }
    }

    componentDidMount() {
        fetch('/api/bugs/').then(r => r.json()).then(bug_data => {
            this.setState({bugs: bug_data.bugs})
        })

    }

    render() {
		//chart stuff
		const data = this.state.bugs
		
		let locationChart = data.reduce(function(obj, v) {
		  obj[v.location] = (obj[v.location] || 0) + 1;
		  return obj;

		}, {})
		let locationList = []
		for (const key in locationChart) {
			let tmp = {label: key, value: locationChart[key]}
			locationList.push(tmp)
		}
		
		let rarityChart = data.reduce(function(obj, v) {
		  obj[v.rarity] = (obj[v.rarity] || 0) + 1;
		  return obj;

		}, {})
		let rarityList = []
		for (const key in rarityChart) {
			let tmp = {label: key, value: rarityChart[key]}
			rarityList.push(tmp)
		}
		
		let sellPriceList = data.map(a => a.price);
		
		//table stuff
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/bugs/${row.id}/`}}>{cell}</Link></b> 
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
		function switchMonth(month){
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
			return month;
		}
		
		function monthFormatter(cell, row){
			if (cell === "All Year"){
				return "All Year"
			}
			else if (cell.includes("&")){
				var field = cell.split("&");
				var monthOne = (field[0]).split("-");
				var monthTwo = (field[1]).split("-");
				var monthOneBegin = switchMonth(parseInt(monthOne[0]));
				var monthOneEnd = switchMonth(parseInt(monthOne[1]));
				var monthTwoBegin = switchMonth(parseInt(monthTwo[0]));
				var monthTwoEnd = switchMonth(parseInt(monthTwo[1]));
				if (Number.isNaN(monthTwoEnd)){
					return monthOneBegin + " - " + monthOneEnd + ", " + monthTwoBegin;
				}
				return monthOneBegin + " - " + monthOneEnd + ", " + monthTwoBegin + " - " + monthTwoEnd;
			}
			else if (cell.includes("-")){
				var field2 = cell.split("-");
				var monthBegin = switchMonth(parseInt(field2[0]));
				var monthEnd = switchMonth(parseInt(field2[1]));
				return monthBegin + " - " + monthEnd;
			}
			else{
				return switchMonth(parseInt(cell));
			}
		}
		
		function monthSort(a, b, order, dataField, rowA, rowB){
			if (a === "All Year"){
				a = "1-1";
			}
			if (b === "All Year"){
				b = "1-1";
			}
			if (a.length === 1){
				var aInt = parseInt(a);
				a = aInt.toString() + "-" + aInt.toString();
			}
		    if (b.length === 1){
				var bInt = parseInt(b);
				b = bInt.toString() + "-" + bInt.toString();
			}
			
			if(a.includes("&") && b.includes("&")){
				//If sorted a and b both are double dates do this.
				var aField = a.split("&");
				var aMonth1 = (aField[0]).split("-");
				var aMonth2 = (aField[1]).split("-");
				var aMonth1Begin = parseInt(aMonth1[0]);
				var aMonth1End = parseInt(aMonth1[1]);
				if (aMonth1Begin > aMonth1End){
					aMonth1End += 12;
				}
				var aMonth2Begin = parseInt(aMonth2[0]);
				var aMonth2End = parseInt(aMonth2[1]);
				if (aMonth2Begin > aMonth2End){
					aMonth2End += 12;
				}
				var bField = b.split("&");
				var bMonth1 = (bField[0]).split("-");
				var bMonth2 = (bField[1]).split("-");
				var bMonth1Begin = parseInt(bMonth1[0]);
				var bMonth1End = parseInt(bMonth1[1]);
				if (bMonth1Begin > bMonth1End){
					bMonth1End += 12;
				}
				var bMonth2Begin = parseInt(bMonth2[0]);
				var bMonth2End = parseInt(bMonth2[1]);
				if (bMonth2Begin > bMonth2End){
					bMonth2End += 12;
				}
				if (order === 'asc') {
					return aMonth1Begin - bMonth1Begin || aMonth1End - bMonth1End
						|| aMonth2Begin - bMonth2Begin || aMonth2End - bMonth2End;
				}
				return bMonth1Begin - aMonth1Begin || bMonth1End - aMonth1End
					|| bMonth2Begin - aMonth2Begin || bMonth2End - aMonth2End;
			}
			
			var aField2 = a.split("-");
			var bField2 = b.split("-");
			if(a.includes("&")){
				var oneField = a.split("&");
				aField2 = (oneField[0]).split("-");
			}
			if(b.includes("&")){
				var twoField = b.split("&");
				bField2 = (twoField[0]).split("-");
			}
			var aMonthBegin = parseInt(aField2[0]);
			var aMonthEnd = parseInt(aField2[1]);
			var bMonthBegin= parseInt(bField2[0]);
			var bMonthEnd = parseInt(bField2[1]);
			
			if (aMonthBegin > aMonthEnd){
				aMonthEnd += 12;
			}
			if (bMonthBegin > bMonthEnd){
				bMonthEnd += 12;
			}
			if (order === 'asc') {
				return aMonthBegin - bMonthBegin || aMonthEnd - bMonthEnd;
			}
			return bMonthBegin - aMonthBegin || bMonthEnd - aMonthEnd;
		}
		
		function timeSort(a, b, order, dataField, rowA, rowB){
			if (a === "All Day"){
				a = "0am - 0am";
			}
			if (b === "All Day"){
				b = "0am - 0am";
			}
			
			var aField = a.split("-");
			var bField = b.split("-");
			if(a.includes("&")){
				var oneField = a.split("&");
				aField = (oneField[0]).split("-");
			}
			if(b.includes("&")){
				var twoField = b.split("&");
				bField = (twoField[0]).split("-");
			}
			
			var aTimeBegin = parseInt(aField[0].replace(/\D/g,''));
			var aTimeEnd = parseInt(aField[1].replace(/\D/g,''));
			var bTimeBegin= parseInt(bField[0].replace(/\D/g,''));
			var bTimeEnd = parseInt(bField[1].replace(/\D/g,''));
			if(aField[0].includes('pm')){
				aTimeBegin += 12;
			}
			if(aField[1].includes('pm')){
				aTimeEnd += 12;
			}
			if(aTimeEnd < aTimeBegin){
				aTimeBegin += 24;
			}
			if(bField[0].includes('pm')){
				bTimeBegin += 12;
			}
			if(bField[1].includes('pm')){
				bTimeEnd += 12;
			}
			if(bTimeEnd < bTimeBegin){
				bTimeBegin += 24;
			}
			if (order === 'asc') {
				return aTimeBegin - bTimeBegin || aTimeEnd - bTimeEnd;
			}
			return bTimeBegin - aTimeBegin || bTimeEnd - aTimeEnd;
		}
		
		const selectLocation={
			'Flying': 'Flying',
			'Flying by light': 'Flying by light',
			'Flying near hybrid flowers': 'Flying near hybrid flowers',
			'Hitting rocks': 'Hitting rocks',
			'Near trash': 'Near trash',
			'On beach rocks': 'On beach rocks',
			'On flowers': 'On flowers',
			'On palm trees': 'On palm trees',
			'On ponds and rivers': 'On ponds and rivers',
			'On rocks (when raining)': 'On rocks (when raining)',
			'On rotten food': 'On rotten food',
			'On the beach': 'On the beach',
			'On the ground': 'On the ground',
			'On tree stumps': 'On tree stumps',
			'On trees': 'On trees',
			'On villagers': 'On villagers',
			'On white flowers': 'On white flowers',
			'Shaking trees': 'Shaking trees',
			'Under trees': 'Under trees',
			'Underground': 'Underground'
		}
		
		const selectRarity={
			'Common': 'Common',
			'Uncommon': 'Uncommon',
			'Rare': 'Rare',
			'Ultra-rare': 'Ultra-rare'
		}
		
		function raritySort(a, b, order, dataField, rowA, rowB) {
			var sortOrder = ['Common', 'Uncommon', 'Rare', 'Ultra-rare'];
			if(order === 'asc') {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			}
			return sortOrder.indexOf(b) - sortOrder.indexOf(a);
		}
				
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
			
		function truncate(cell, row) {
		   return(
			<ShowMoreText
					/* Default options */
					lines={5}
					more='Show more'
					less='Show less'
					anchorClass=''
					onClick={this.executeOnClick}
					expanded={false}
				>
					{cell}
				</ShowMoreText>
		   )
		};
		
        const {bugs} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Bug Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'icon',
                text: 'Bug Icon',
                sort: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
            },  {
                dataField: 'image',
                text: 'Bug Image',
                sort: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'monthNorth',
                text: 'Months Available in the Northern Hemisphere',
                sort: true,
				sortFunc: monthSort,
				formatter: monthFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'monthSouth',
                text: 'Months Available in the Southern Hemisphere',
                sort: true,
				sortFunc: monthSort,
				formatter: monthFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'time',
                text: 'Time Available',
                sort: true,
				sortFunc: timeSort,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'location',
                text: 'Bug Location',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectLocation[cell],
				filter: selectFilter({
					options: selectLocation
				})
            }, {
                dataField: 'rarity',
                text: 'Bug Rarity',
                sort: true,
				sortFunc: raritySort,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectRarity[cell],
				filter: selectFilter({
					options: selectRarity
				})
            }, {
                dataField: 'price',
                text: 'Selling Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter()
            },{
                dataField: 'catchPhrase',
                text: 'Catch Phrase',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'museumPhrase',
                text: 'Museum Description',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter(),
				formatter: truncate
            },{
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
            }
            ]
        }
		
		//mobile functions
		const { SearchBar } = Search;
	    const {mobilecolumns} = {
            mobilecolumns: [{
                dataField: 'name',
                text: 'Bug Name',
				formatter: (cell, row) => {
					return(
						<h5><b>Name: <Link to={{pathname: `/bugs/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b></h5>
					);
				},
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'image',
                text: 'Bug Image',
                searchable: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'monthNorth',
                text: 'Months Available in the Northern Hemisphere',
				formatter: (cell, row) => {
					return(
						<div><b>Months Available (Northern Hemisphere): </b> {monthFormatter(cell, row)} </div>
					);
				},
				filterValue: monthFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'monthSouth',
                text: 'Months Available in the Southern Hemisphere',
				formatter: (cell, row) => {
					return(
						<div><b>Months Available (Southern Hemisphere): </b> {monthFormatter(cell, row)} </div>
					);
				},
				filterValue: monthFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'time',
                text: 'Time Available',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Time Available: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'location',
                text: 'Bug Location',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Location: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'rarity',
                text: 'Bug Rarity',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Rarity: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'price',
                text: 'Selling Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Selling Price: </b> {cell} </div>
					);
				}
            },{
                dataField: 'catchPhrase',
                text: 'Catch Phrase',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Catch Phrase: </b> {cell} </div>
					);
				}
            },{
                dataField: 'museumPhrase',
                text: 'Museum Description',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Museum Phrase: </b> {cell} </div>
					);
				}
            },{
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }
            ]
        }
		
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <div style={{display: 'flex', justifyContent: 'center'}}>
				  <img src={process.env.PUBLIC_URL + '/bugs.png'} class="card-img" alt="Bugs" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				
				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">
				  <Tab eventKey="table" title="Table">	

				<BrowserView>

					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ bugs }
						columns={ columns }
						striped
						pagination={ paginationFactory( {sizePerPage: 25} ) }
						defaultSorted={ defaultSorted } 
						filter={ filterFactory() }
						
					/>
				</BrowserView>
				
				<MobileView>
					<ToolkitProvider
					  keyField="id"
					  data={ bugs }
					  columns={ mobilecolumns }
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
					  <h3 className='text-center'> Bugs By Location </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={1000}
							height={800}
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
							data={locationList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
					
					<div class="border border-success">
					  <h3 className='text-center'> Bugs By Rarity </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={1000}
							height={800}
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
							data={rarityList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
					
					<div class='border border-success'>
						<h3 className='text-center'> Bugs Selling Price Box-Plot </h3>
						<VictoryChart domainPadding={0}>
						    <VictoryAxis
							  // tickValues specifies both the number of ticks and where
							  // they are placed on the axis
							  tickValues={[1]}
							  tickFormat={["Selling Price"]}
							/>
							<VictoryAxis
							  dependentAxis
							  domain={[0, 16000]}
							  // tickFormat specifies how ticks should be displayed
							  tickFormat={(x) => (`$${x /1000}k`)}
							/>
						  <VictoryBoxPlot
							boxWidth={50}
							data={[
							  { x: 'Selling', y: sellPriceList
							  }
							]}
						  />
						</VictoryChart>			
					</div>
				  </Tab>
				</Tabs>
			</div>
        )
    }
}


export default Bugs;
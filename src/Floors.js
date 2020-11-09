import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Tabs, Tab } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import { PieChart } from 'react-minimal-pie-chart';

const TITLE = 'AC:NH Floors'

class Floors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floors: []
        }
    }

    componentDidMount() {
        fetch('/api/floors/').then(r => r.json()).then(floor_data => {
            this.setState({floors: floor_data.floors})
        })

    }

    render() {
		//chart stuff
		const data = this.state.floors
		
		let isInteractiveList = data.reduce(function(obj, v) {
		  obj[v.vfx] = (obj[v.vfx] || 0) + 1;
		  return obj;
		}, {})
		
		const defaultLabelStyle = {
		  fontSize: '5px',
		  fontFamily: 'sans-serif',
		};
		
		let vfxTypeChart = data.reduce(function(obj, v) {
		  obj[v.vfx] = (obj[v.vfx] || 0) + 1;
		  return obj;
		}, {})
		let vfxTypeList = []
		for (const key in vfxTypeChart) {
			let tmp = {label: key, value: vfxTypeChart[key]}
			vfxTypeList.push(tmp)
		}
		
		let sourceChart = data.reduce(function(obj, v) {
		  var newSource = (v.source).replace(/\s*\(.*?\)\s*/g, '')
		  obj[newSource] = (obj[newSource] || 0) + 1;
		  return obj;
		}, {})
		let sourceList = []
		for (const key in sourceChart) {
			let tmp = {label: key, value: sourceChart[key]}
			sourceList.push(tmp)
		}
		
		let tagChart = data.reduce(function(obj, v) {
		  obj[v.tag] = (obj[v.tag] || 0) + 1;
		  return obj;
		}, {})
		let tagList = []
		for (const key in tagChart) {
			let tmp = {label: key, value: tagChart[key]}
			tagList.push(tmp)
		}
		
		//table stuff
 		function nameFormatter(cell, row) {
            return (
                <b><Link to={{pathname: `/floors/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b>
            );
        }
		
		function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell}
                     alt="Pic Not Found" style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
		function booleanFormatter(cell, row){
			if(cell === true){
				return "Yes";
			}
			return "No";
		}
		
		const selectVFX= {
			true: 'Yes',
			false: 'No'
		};
		
		function buyFormatter(cell, row) {
			if(cell === -1){
				return "Not Purchasable"
			}
			return parseInt(cell)
		}
		
		const selectColor={
			'Aqua': 'Aqua',
			'Beige': 'Beige',
			'Black': 'Black',
			'Blue': 'Blue',
			'Brown': 'Brown',
			'Colorful': 'Colorful',
			'Gray': 'Gray',
			'Green': 'Green',
			'Orange': 'Orange',
			'Pink': 'Pink',
			'Purple': 'Purple',
			'Red': 'Red',
			'White': 'White',
			'Yellow': 'Yellow'
		}
		
		const selectSource = {
			'Birthday': 'Birthday',
			'Crafting': 'Crafting',
			'Cyrus': 'Cyrus',
			'Gullivarrr': 'Gullivarrr',
			'Nook Miles Redemption': 'Nook Miles Redemption',
			"Nook's Cranny": "Nook's Cranny",
			'Saharah': 'Saharah'
		}
		
		function capitalFormatter(cell, row) {
            return (
                <div className="capitalize">{cell}</div>
            );
        }
		
		const selectSeries = {
			'None': 'None',
			'Bunny Day': 'Bunny Day',
			'bamboo': 'Bamboo',
			'cherry blossoms': 'Cherry Blossoms',
			'frozen': 'Frozen',
			'golden': 'Golden',
			'mermaid': 'Mermaid',
			'mush': 'Mush',
			'pirate': 'Pirate',
			'rattan': 'Rattan',
			'stars': 'Stars',
			"tree's bounty or leaves": "Tree's Bounty Or Leaves",
			'wedding': 'Wedding'
		}
		
		const selectThemes = {
			'bathroom': 'Bathroom',
			"child's room": "Child's Room",
			'den': 'Den',
			'expensive': 'Expensive',
			'facility': 'Facility',
			'fancy': 'Fancy',
			'fitness': 'Fitness',
			'folk art': 'Folk Art',
			'freezing cold': 'Freezing Cold',
			'garage': 'Garage',
			'garden': 'Garden',
			'horror': 'Horror',
			'kitchen': 'Kitchen',
			'living room': 'Living Room',
			'music': 'Music',
			'ocean': 'Ocean',
			'outdoors': 'Outdoors',
			'party': 'Party',
			'school': 'School',
			'shop': 'Shop',
			'space': 'Space',
			'zen-style': 'Zen-style'
		}
		
		const selectTag = {
			'Animal Floor': 'Animal Floor',
			'Arched Brick': 'Arched Brick',
			'Argyle': 'Argyle',
			'Brick': 'Brick',
			'Camouflage': 'Camouflage',
			'Chocolate': 'Chocolate',
			'Cloth Floors': 'Cloth Floors',
			'Colorful Wood': 'Colorful Wood',
			'Country': 'Country',
			'Decadence': 'Decadence',
			'Deco Wood': 'Deco Wood',
			'Dot': 'Dot',
			'Grassland': 'Grassland',
			'Herringbone': 'Herringbone',
			'Honeycomb': 'Honeycomb',
			'Iron': 'Iron',
			'Iron Parquet': 'Iron Parquet',
			'Japanese Style': 'Japanese Style',
			'Kitchen Floors': 'Kitchen Floors',
			'Luxury': 'Luxury',
			'Machine Floor': 'Machine Floor',
			'Morocco': 'Morocco',
			'Nature - Brown': 'Nature - Brown',
			'Nature - Fallen Leaves': 'Nature - Fallen Leaves',
			'Nature - Green': 'Nature - Green',
			'Nature - White': 'Nature - White',
			'Neta': 'Neta',
			'Painted Wood': 'Painted Wood',
			'Panel': 'Panel',
			'Parquet': 'Parquet',
			'Puzzle Mat': 'Puzzle Mat',
			'Rubber': 'Rubber',
			'Sidewalk': 'Sidewalk',
			'Simple Carpet': 'Simple Carpet',
			'Simple Parquet': 'Simple Parquet',
			'Special Inorganic Floors': 'Special Inorganic Floors',
			'Special Nature Floors': 'Special Nature Floors',
			'Sports Floor': 'Sports Floor',
			'Stone Floors': 'Stone Floors',
			'Tatami': 'Tatami',
			'Tatami Panel': 'Tatami Panel',
			'Tile Checker': 'Tile Checker',
			'Tile Floors': 'Tile Floors',
			'Wood Floors': 'Wood Floors'
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}]; 
		
        const {floors} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter({placeholder: 'Search'})
            },{
                dataField: 'image',
                text: 'Image',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'vfx',
                text: 'Visual Effects',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: booleanFormatter,
				filter: selectFilter({
					placeholder: 'All',
					options: selectVFX
				})
			},{
                dataField: 'buy',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
 				filter: numberFilter({placeholder: 'Number'}),
				formatter: buyFormatter
			},{
                dataField: 'sell',
                text: 'Sell Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Number'})
			},{
                dataField: 'color',
                text: 'Color(s)',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectColor,
					placeholder: 'All',
					comparator: Comparator.LIKE
				}) 
			},{
                dataField: 'source',
                text: 'Source',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSource,
					placeholder: 'All',
					comparator: Comparator.LIKE
				}) 
			},{
                dataField: 'points',
                text: 'HHA Points',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Number'})
			},{
                dataField: 'series',
                text: 'HHA Series',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: capitalFormatter,
				filter: selectFilter({
					placeholder: 'All',
					options: selectSeries
				})
			},{
                dataField: 'concepts',
                text: 'Themes',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: capitalFormatter,
				filter: selectFilter({
					placeholder: 'All',
					options: selectThemes,
					comparator: Comparator.LIKE
				})
			},{
                dataField: 'tag',
                text: 'Tags',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					placeholder: 'All',
					options: selectTag
				})
			},{
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
            }
            ]
        }
		
		//mobile
		const { SearchBar } = Search;
		const {mobilecolumns} = {
            mobilecolumns: [{
                dataField: 'name',
                text: 'floor Name',
				formatter: (cell, row) => {
					return(
						<div><b>Name: </b> {nameFormatter(cell, row)} </div>
					);
				},
				align: "center",
				headerAlign: 'center',
            },{
                dataField: 'image',
                text: 'floor Image',
                sort: false,
				formatter: (cell, row) => {
					return(
						<div>{imageFormatter(cell, row)}</div>
					);
				},
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'vfx',
                text: 'Visual Effects Type',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>VFX Type: </b>{booleanFormatter(cell)}</div>
					);
				},
				filterValue: booleanFormatter
			},{
                dataField: 'buy',
                text: 'Purchase Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Purchase Price: </b>{buyFormatter(cell)}</div>
					);
				},
				filterValue: buyFormatter
			},{
                dataField: 'sell',
                text: 'Selling Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Sell Price: </b>{cell}</div>
					);
				}
			},{
                dataField: 'color',
                text: 'Color(s)',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Color(s): </b>{cell}</div>
					);
				}
			},{
                dataField: 'source',
                text: 'Source',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Source: </b>{cell}</div>
					);
				}
			},{
                dataField: 'points',
                text: 'HHA Points',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>HHA Points: </b>{cell}</div>
					);
				}
			},{
                dataField: 'series',
                text: 'HHA Series',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div className="capitalize"><b>HHA Series: </b>{cell}</div>
					);
				}
			},{
                dataField: 'concepts',
                text: 'Themes',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div className="capitalize"><b>Themes: </b>{cell}</div>
					);
				}
			},{
                dataField: 'tag',
                text: 'Tag(s)',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Tag(s): </b>{cell}</div>
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
		
		//about
		function about2(){
			return(
			<div>
				<h5 > 01. <u>Name:</u> The name of the floor when you select it in your inventory.</h5>
				<h5 > 02. <u>Image:</u> The image of the floor when seen in your inventory. </h5>
				<h5 > 03. <u>Visual Effects:</u> Whether or not the floor has a visual effect when placed inside your home. </h5>
				<h5 > 04. <u>Purchase Price:</u> The number of bells needed to buy the floor from Saharah or Nook's Cranny. 
					Please note that Saharah's floors are random. </h5>
				<h5 > 05. <u>Sell Price:</u> The number of bells you can sell the floor at Nook's Cranny. </h5>
				<h5 > 06. <u>Colors:</u> The main color(s) of the floor. Colorful is used to describe a wide range
				of colors. </h5>
				<h5 > 07. <u>Source:</u> Where to acquire the floor. </h5>
				<h5 > 08. <u>HHA Points:</u> The number of points this floor add to your Happy Home Academy Rating you
				receive in the mail every Sunday. </h5>
				<h5 > 09. <u>HHA Series:</u> A collection of items, that when the player collects enough items of the 
				same series, will increase the HHA Rating. </h5>
				<h5 > 10. <u>Themes:</u> A group of related items, typically decoration. </h5>
				<h5 > 11. <u>Tags:</u> Search by trying to find certain types of walls the player may want. </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Floors are one of the few ways the player can customize the interior of their house. To do so, simply go into your
				inventory and select it to apply the floor design. The room the player is currently in should change to that floor's
				design. You can find most floor patterns from Nook's Cranny or Saharah. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the floors currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the floor
				you want. (Please note that table sorting and filtering by column does not exist
				on mobile format. However, there is a universal search bar that can search every column instead.)
				The meaning of each column is explained below. </h5>
				<br/>
				    <BrowserView>
						<div className="indentall">
							{about2()}
						</div>
					</BrowserView>
					
					<MobileView>
						{about2()}
					</MobileView>
				<br/>
				<h3 className='indent'><b> Fun Charts </b></h3>
				<hr/>
				<h5 className='indent'> For certain columns that have common attributes, graphs were made to visualize how many types
				of each attribute exist in the table. Click on the Fun Charts tab above to see the visualizations. 
				(Note: some graphs may not be viewable on mobile.) </h5>
				<br/>
			</div>
			)
		}
	
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <div style={{display: 'flex', justifyContent: 'center'}}>
				  <img src={process.env.PUBLIC_URL + '/floors.png'} class="card-img" alt="floors" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				
				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">

				  
				  <Tab eventKey="table" title="Table">		
					<BrowserView>
						<BootstrapTable
							bootstrap4
							keyField = "id"
							data={ floors }
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
						  data={ floors }
						  columns={ mobilecolumns }
						  search>
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
						<div class="border border-success">
							<h3 className='text-center'> VFX of Floors </h3>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<PieChart 
								data={[
									{ title: 'Yes', value: isInteractiveList.true, color: '#add8e6' },
									{ title: 'No', value: isInteractiveList.false, color: '#FFC0CB' },
								  ]}
								animate
								label={({ dataEntry }) => (dataEntry.value + " " + dataEntry.title + " (" + Math.round(dataEntry.percentage) + '%)')}
								style={{maxHeight: '500px', maxWidth: '500px'}}
								labelStyle={{
									...defaultLabelStyle,
								}}
								/>
							</div>
							<br/>
						</div>
						
					  <h3 className='text-center'> Source of Floors </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={800}
							height={650}
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
							data={sourceList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
								
					<div class="border border-success">
					  <h3 className='text-center'> Tags of Floors </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={1200}
							height={1100}
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
							data={tagList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
				  </Tab>
				  				  <Tab eventKey="about" title="About">
				    <BrowserView>
						<div className="frontpagepadding">
							{about()}
						</div>
					</BrowserView>
					
					<MobileView>
						{about()}
					</MobileView>
				  </Tab>
				</Tabs>
			</div>
        )
    }
}

export default Floors;
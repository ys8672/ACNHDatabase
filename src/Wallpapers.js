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

const TITLE = 'AC:NH Wallpapers'

class Wallpapers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallpapers: []
        }
    }

    componentDidMount() {
        fetch('/api/wallpapers/').then(r => r.json()).then(wallpaper_data => {
            this.setState({wallpapers: wallpaper_data.wallpapers})
        })

    }

    render() {
		//chart stuff
		const data = this.state.wallpapers
		
		let vfxTypeChart = data.reduce(function(obj, v) {
		  obj[v.vfxType] = (obj[v.vfxType] || 0) + 1;
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
		
		let windowTypeChart = data.reduce(function(obj, v) {
		  obj[v.windowType] = (obj[v.windowType] || 0) + 1;
		  return obj;
		}, {})
		let windowTypeList = []
		for (const key in windowTypeChart) {
			let tmp = {label: key, value: windowTypeChart[key]}
			windowTypeList.push(tmp)
		}
		
		let ceilingTypeChart = data.reduce(function(obj, v) {
		  obj[v.ceilingType] = (obj[v.ceilingType] || 0) + 1;
		  return obj;
		}, {})
		let ceilingTypeList = []
		for (const key in ceilingTypeChart) {
			let tmp = {label: key, value: ceilingTypeChart[key]}
			ceilingTypeList.push(tmp)
		}
		
		let curtainTypeChart = data.reduce(function(obj, v) {
		  obj[v.curtainType] = (obj[v.curtainType] || 0) + 1;
		  return obj;
		}, {})
		let curtainTypeList = []
		for (const key in curtainTypeChart) {
			let tmp = {label: key, value: curtainTypeChart[key]}
			curtainTypeList.push(tmp)
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
                <b><Link to={{pathname: `/wallpapers/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b>
            );
        }
		
		function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell}
                     alt="Pic Not Found" style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
		const selectVFX= {
			'None': 'None',
			'Lights Off': 'Lights Off',
			'Random': 'Random',
			'Synchro': 'Synchro'
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
			'Bug-Off': 'Bug-Off',
			'Crafting': 'Crafting',
			'Cyrus': 'Cyrus',
			'Fishing Tourney': 'Fishing Tourney',
			'Gullivarrr': 'Gullivarrr',
			'Nintendo': 'Nintendo',
			'Nook Miles Redemption': 'Nook Miles Redemption',
			"Nook's Cranny": "Nook's Cranny",
			'Saharah': 'Saharah'
		}
		
		const selectWindowType = {
			'None': 'None',
			'Arch': 'Arch',
			'Circle': 'Circle',
			'Four Pane': 'Four Pane',
			'Single Pane': 'Single Pane',
			'Sliding Pane': 'Sliding Pane'
		}
		
		const selectCeilingType = {
			'Cloth': 'Cloth',
			'Gold': 'Gold',
			'Plain': 'Plain',
			'Stone': 'Stone',
			'Tile': 'Tile',
			'Wood': 'Wood'
		}
		
		const selectCurtainType = {
			'None': 'None',
			'Curtains': 'Curtains',
			'Roller Shades': 'Roller Shades',
			'Slatted Blinds': 'Slatted Blinds'
		}
		
		function capitalFormatter(cell, row) {
            return (
                <div className="capitalize">{cell}</div>
            );
        }
		
		const selectSeries = {
			'Bunny Day': 'Bunny Day',
			'None': 'None',
			'bamboo': 'Bamboo',
			'cherry blossoms': 'Cherry Blossoms',
			'festive': 'Festive',
			'frozen': 'Frozen',
			'fruits': 'Fruits',
			'golden': 'Golden',
			'mermaid': 'Mermaid',
			'mush': 'Mush',
			'pirate': 'Pirate',
			'stars': 'Stars',
			"tree's bounty or leaves ": "Tree's Bounty Or Leaves ",
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
			'office': 'Office',
			'outdoors': 'Outdoors',
			'party': 'Party',
			'school': 'School',
			'shop': 'Shop',
			'space': 'Space',
			'zen-style': 'Zen-style'
		}
		
		const selectTag = {
			'Art Deco Walls': 'Art Deco Walls',
			'Asia': 'Asia',
			'Brick': 'Brick',
			'Camouflage': 'Camouflage',
			'Chocolate': 'Chocolate',
			'Cloth Walls': 'Cloth Walls',
			'Country': 'Country',
			'Crown Walls': 'Crown Walls',
			'Cute Walls': 'Cute Walls',
			'Diner Walls': 'Diner Walls',
			'Dollhouse Walls': 'Dollhouse Walls',
			'Dot': 'Dot',
			'Flower Pop Walls': 'Flower Pop Walls',
			'Flower Walls': 'Flower Walls',
			'Fruit Walls': 'Fruit Walls',
			'Hall Walls': 'Hall Walls',
			'Heart Walls': 'Heart Walls',
			'Herringbone': 'Herringbone',
			'Honeycomb': 'Honeycomb',
			'Iron Walls': 'Iron Walls',
			'Japanese Style': 'Japanese Style',
			'Library Walls': 'Library Walls',
			'Manor Walls': 'Manor Walls',
			'Metro Walls': 'Metro Walls',
			'Morocco': 'Morocco',
			'Nature Walls': 'Nature Walls',
			'Neta Walls': 'Neta Walls',
			'Painted Wood': 'Painted Wood',
			'Panel Mold Walls': 'Panel Mold Walls',
			'Pegboard Walls': 'Pegboard Walls',
			'Puzzle Walls': 'Puzzle Walls',
			'Rose Walls': 'Rose Walls',
			'Simple Walls': 'Simple Walls',
			'Special Cool Nature Walls': 'Special Cool Nature Walls',
			'Special Inorganic Walls': 'Special Inorganic Walls',
			'Special Walls': 'Special Walls',
			'Special Warm Nature Walls': 'Special Warm Nature Walls',
			'Stone Walls': 'Stone Walls',
			'Stripe Walls': 'Stripe Walls',
			'Stucco Walls': 'Stucco Walls',
			'Tea Room Walls': 'Tea Room Walls',
			'Tile Walls': 'Tile Walls',
			'Tin Walls': 'Tin Walls',
			'Toy Walls': 'Toy Walls',
			'Two-Tone Tile Walls': 'Two-Tone Tile Walls',
			'Wood Plank Walls': 'Wood Plank Walls',
			'Wood Tile Walls': 'Wood Tile Walls',
			'Wood Walls': 'Wood Walls'
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}]; 
		
        const {wallpapers} = this.state
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
                dataField: 'vfxType',
                text: 'Visual Effects Type',
                sort: true,
				align: "center",
				headerAlign: 'center',
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
 				filter: numberFilter({placeholder: 'Num'}),
				formatter: buyFormatter
			},{
                dataField: 'sell',
                text: 'Sell Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Num'})
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
                dataField: 'windowType',
                text: 'Type of Window',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					placeholder: 'All',
					options: selectWindowType
				})
			},{
				dataField: 'ceilingType',
				text: 'Type of Ceiling',
				sort: true,
				align: 'center',
				headerAlign: 'center',
				filter: selectFilter({
					placeholder: 'All',
					options: selectCeilingType
				})
			},{
                dataField: 'curtainType',
                text: 'Type of Curtain',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					placeholder: 'All',
					options: selectCurtainType
				})
			},{
                dataField: 'points',
                text: 'HHA Points',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Num'})
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
                text: 'Wallpaper Name',
				formatter: (cell, row) => {
					return(
						<div><b>Name: </b> {nameFormatter(cell, row)} </div>
					);
				},
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Wallpaper Image',
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
                dataField: 'vfxType',
                text: 'Visual Effects Type',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>VFX Type: </b>{cell}</div>
					);
				}
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
                dataField: 'windowType',
                text: 'Type of Window',
				align: "center",
				formatter: (cell, row) => {
					return(
						<div><b>Window Type: </b>{cell}</div>
					);
				}
			},{
				dataField: 'ceilingType',
				text: 'Type of Ceiling',
				align: 'center',
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Ceiling Type: </b>{cell}</div>
					);
				}
			},{
                dataField: 'curtainType',
                text: 'Type of Curtain',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Curtain Type: </b>{cell}</div>
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
				<h5 > 01. <u>Name:</u> The name of the wallpaper when you select it in your inventory.</h5>
				<h5 > 02. <u>Image:</u> The image of the wallpaper when seen in your inventory. </h5>
				<h5 > 03. <u>Visual Effects Type:</u> Some wallpapers may have visual effects that allow that wallpaper
				to have an animation when you put it on your wall. </h5>
				<h5 > 04. <u>Purchase Price:</u> The number of bells needed to buy the wallpaper from Saharah or Nook's Cranny. 
					Please note that Saharah's wallpapers are random. </h5>
				<h5 > 05. <u>Sell Price:</u> The number of bells you can sell the wallpaper at Nook's Cranny. </h5>
				<h5 > 06. <u>Color(s):</u> The main color(s) of the wallpaper. Colorful is used to describe a wide range
				of colors. </h5>
				<h5 > 07. <u>Source:</u> Where to acquire the Wallpaper. </h5>
				<h5 > 08. <u>Type of Window:</u> For some wallpapers, the type of window the wallpaper contains. </h5>
				<h5 > 09. <u>Type of Ceiling:</u> For some wallpapers, the type of ceiling the wallpaper contains. </h5>
				<h5 > 10. <u>Type of Curtain:</u> For some wallpapers, the type of curtain the wallpaper contains. </h5>
				<h5 > 11. <u>HHA Points:</u> The number of points this wallpaper add to your Happy Home Academy Rating you
				receive in the mail every Sunday. </h5>
				<h5 > 12. <u>HHA Series:</u> A collection of items, that when the player collects enough items of the 
				same series, will increase the HHA Rating. </h5>
				<h5 > 13. <u>Themes:</u> A group of related items, typically decoration. </h5>
				<h5 > 14. <u>Tags:</u> Search by trying to find certain types of walls the player may want. </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Wallpapers are one of the few ways the player can customize the wall in the interior of their house. To do so, simply go into your
				inventory and select it to apply the wallpaper design. The room the player is currently in should change to that wallpaper's
				design. You can find most wallpaper from Nook's Cranny or Saharah. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the wallpapers currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the wallpaper
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
				  <img src={process.env.PUBLIC_URL + '/wallpapers.png'} class="card-img" alt="wallpapers" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				
				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">

				  
				  <Tab eventKey="table" title="Table">		
					<BrowserView>
						<BootstrapTable
							bootstrap4
							keyField = "id"
							data={ wallpapers }
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
						  data={ wallpapers }
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
					  <h3 className='text-center'> Visual Effect Types of Wallpapers </h3>
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
							data={vfxTypeList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
					
					<div class="border border-success">
					  <h3 className='text-center'> Source of Wallpapers </h3>
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
					  <h3 className='text-center'> Window Types of Wallpapers </h3>
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
							data={windowTypeList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
					
					<div class="border border-success">
					  <h3 className='text-center'> Ceiling Types of Wallpapers </h3>
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
							data={ceilingTypeList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
					
					<div class="border border-success">
					  <h3 className='text-center'> Curtain Types of Wallpapers </h3>
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
							data={curtainTypeList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
								
					<div class="border border-success">
					  <h3 className='text-center'> Tags of Wallpapers </h3>
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

export default Wallpapers;
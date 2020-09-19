import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { PieChart } from 'react-minimal-pie-chart';
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
		/* let isInteractiveList = data.reduce(function(obj, v) {
		  obj[v.isInteractive] = (obj[v.isInteractive] || 0) + 1;
		  return obj;
		}, {})
		
		let sizeChart = data.reduce(function(obj, v) {
		  obj[v.size] = (obj[v.size] || 0) + 1;
		  return obj;
		}, {})
		let sizeList = []
		for (const key in sizeChart) {
			let tmp = {label: key, value: sizeChart[key]}
			sizeList.push(tmp)
		}
		
		let sourceChart = data.reduce(function(obj, v) {
		  obj[v.source] = (obj[v.source] || 0) + 1;
		  return obj;

		}, {})
		let sourceList = []
		for (const key in sourceChart) {
			let tmp = {label: key, value: sourceChart[key]}
			sourceList.push(tmp)
		}
		
		let categoryChart = data.reduce(function(obj, v) {
		  obj[v.category] = (obj[v.category] || 0) + 1;
		  return obj;

		}, {})
		let categoryList = []
		for (const key in categoryChart) {
			let tmp = {label: key, value: categoryChart[key]}
			categoryList.push(tmp)
		}
		
		let typeofChart = data.reduce(function(obj, v) {
		  obj[v.typeof] = (obj[v.typeof] || 0) + 1;
		  return obj;

		}, {})
		let typeofList = []
		for (const key in typeofChart) {
			let tmp = {label: key, value: typeofChart[key]}
			typeofList.push(tmp)
		} */
		
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
                text: 'Wallpaper Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter({placeholder: 'Search'})
            },{
                dataField: 'image',
                text: 'Wallpaper Image',
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
                text: 'Selling Price',
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
				}
			},{
                dataField: 'sell',
                text: 'Selling Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Selling Price: </b>{cell}</div>
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
	
		const defaultLabelStyle = {
		  fontSize: '5px',
		  fontFamily: 'sans-serif',
		};
		
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

				  </Tab>
				</Tabs>
			</div>
        )
    }
}


export default Wallpapers;


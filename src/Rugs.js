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

const TITLE = 'AC:NH Rugs'

class Rugs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rugs: []
        }
    }

    componentDidMount() {
        fetch('/api/rugs/').then(r => r.json()).then(rug_data => {
            this.setState({rugs: rug_data.rugs})
        })

    }

    render() {
		//chart stuff
		const data = this.state.rugs
		
		let sizeChart = data.reduce(function(obj, v) {
		  var newsize = (v.size).replace(/\s*\(.*?\)\s*/g, '')
		  obj[newsize] = (obj[newsize] || 0) + 1;
		  return obj;
		}, {})
		let sizeList = []
		for (const key in sizeChart) {
			let tmp = {label: key, value: sizeChart[key]}
			sizeList.push(tmp)
		}
		
		let sizeCategoryChart = data.reduce(function(obj, v) {
		  var newsizeCategory = (v.sizeCategory).replace(/\s*\(.*?\)\s*/g, '')
		  obj[newsizeCategory] = (obj[newsizeCategory] || 0) + 1;
		  return obj;
		}, {})
		let sizeCategoryList = []
		for (const key in sizeCategoryChart) {
			let tmp = {label: key, value: sizeCategoryChart[key]}
			sizeCategoryList.push(tmp)
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
                <b><Link to={{pathname: `/rugs/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b>
            );
        }
		
		function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell}
                     alt="Pic Not Found" style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
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
			'Bug-Off': 'Bug-Off',
			'Crafting': 'Crafting',
			'Cyrus': 'Cyrus',
			'Fishing Tourney': 'Fishing Tourney',
			'Gullivarrr': 'Gullivarrr',
			'Mom': 'Mom',
			'Nintendo': 'Nintendo',
			'Nook Miles Redemption': 'Nook Miles Redemption',
			'Nook Shopping Seasonal': 'Nook Shopping Seasonal',
			'Saharah': 'Saharah'
		}
		
		const selectSize = {
			'2x1': '2x1',
			'2x2': '2x2',
			'3x2': '3x2',
			'3x3': '3x3',
			'4x3': '4x3',
			'4x4': '4x4',
			'5x5': '5x5'
		}
		
		const selectSizeCategory = {
			'Small': 'Small',
			'Medium': 'Medium',
			'Large': 'Large'
		}
		
		function capitalFormatter(cell, row) {
            return (
                <div className="capitalize">{cell}</div>
            );
        }
		
		const selectSeries = {
			'None': 'None',
			'Bunny Day': 'Bunny Day',
			'flowers': 'Flowers',
			'fruits': 'Fruits',
			'iron': 'Iron',
			'mermaid': 'Mermaid',
			'motherly': 'Motherly',
			'mush': 'Mush',
			'pirate': 'Pirate',
			'shell': 'Shell',
			'wedding': 'Wedding'
		}
		
		const selectThemes = {
			'None': 'None',
			'bathroom': 'Bathroom',
			"child's room": "Child's Room",
			'expensive': 'Expensive',
			'facility': 'Facility',
			'fancy': 'Fancy',
			'freezing cold': 'Freezing Cold',
			'garden': 'Garden',
			'horror': 'Horror',
			'kitchen': 'Kitchen',
			'living room': 'Living Room',
			'ocean': 'Ocean',
			'outdoors': 'Outdoors',
			'party': 'Party',
			'school': 'School',
			'shop': 'Shop',
			'space': 'Space',
			'zen-style': 'Zen-style'
		}
		
		const selectTag = {
			'Fruit Rugs': 'Fruit Rugs',
			'Heart Rugs': 'Heart Rugs',
			'Icon Rugs': 'Icon Rugs',
			'Kitchen Rugs': 'Kitchen Rugs',
			'Message Mats': 'Message Mats',
			'Park Rugs': 'Park Rugs',
			'Pattern Rugs': 'Pattern Rugs',
			'Rose Rug': 'Rose Rug',
			'Shaggy Round Rugs': 'Shaggy Round Rugs',
			'Simple Rugs': 'Simple Rugs',
			'Slender Pattern Rugs': 'Slender Pattern Rugs',
			'Slender Rugs': 'Slender Rugs',
			'Wood Rugs': 'Wood Rugs'
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}]; 
		
        const {rugs} = this.state
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
                text: 'Colors',
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
				dataField: 'size',
				text: 'Size',
				sort: true,
				align: 'center',
				headerAlign: 'center',
				filter: selectFilter({
					placeholder: 'All',
					options: selectSize
				})
			},{
                dataField: 'sizeCategory',
                text: 'Size Category',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					placeholder: 'All',
					options: selectSizeCategory
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
                text: 'Colors',
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
                dataField: 'size',
                text: 'Type of Window',
				align: "center",
				formatter: (cell, row) => {
					return(
						<div><b>Size: </b>{cell}</div>
					);
				}
			},{
				dataField: 'sizeCategory',
				text: 'Type of Ceiling',
				align: 'center',
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Size Category: </b>{cell}</div>
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
                text: 'Tags',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Tags: </b>{cell}</div>
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
				<h5 > 01. <u>Name:</u> The name of the rug when you select it in your inventory.</h5>
				<h5 > 02. <u>Image:</u> The image of the rug when seen in your inventory. </h5>
				<h5 > 03. <u>Purchase Price:</u> The number of bells needed to buy the rug. Rugs can be mostly
					bought from Saharah and will be random based on the size category of the rug. </h5>
				<h5 > 04. <u>Sell Price:</u> The number of bells you can sell the rug at Nook's Cranny. </h5>
				<h5 > 05. <u>Colors:</u> The main color(s) of the rug. Colorful is used to describe a wide range
				of colors. </h5>
				<h5 > 06. <u>Source:</u> Where to acquire the rug. </h5>
				<h5 > 07. <u>Size:</u> The number of tiles the rug is. </h5>
				<h5 > 08. <u>Size Category:</u> The category of how big the rug is. </h5>
				<h5 > 09. <u>HHA Points:</u> The number of points this rug add to your Happy Home Academy Rating you
				receive in the mail every Sunday. </h5>
				<h5 > 10. <u>HHA Series:</u> A collection of items, that when the player collects enough items of the 
				same series, will increase the HHA Rating. </h5>
				<h5 > 11. <u>Themes:</u> A group of related items, typically decoration. </h5>
				<h5 > 12. <u>Tags:</u> Search by trying to find certain types of walls the player may want. </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Rugs are one of the few ways the player can customize their own home floor. Rugs can be placed anywhere
					on your home floor as long as rugs do not overlap with each other. You can still place furniture and other items on top of rugs. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the rugs currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the rug
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
				  <img src={process.env.PUBLIC_URL + '/rugs.png'} class="card-img" alt="rugs" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				
				<Tabs defaultActiveKey="about" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">
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
				  
				  <Tab eventKey="table" title="Table">		
					<BrowserView>
						<BootstrapTable
							bootstrap4
							keyField = "id"
							data={ rugs }
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
						  data={ rugs }
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
					  <h3 className='text-center'> Source of Rugs </h3>
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
					  <h3 className='text-center'> Size of Rugs </h3>
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
							data={sizeList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
					
					<div class="border border-success">
					  <h3 className='text-center'> Size Category of Rugs </h3>
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
							data={sizeCategoryList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
												
					<div class="border border-success">
					  <h3 className='text-center'> Tags of Rugs </h3>
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
				</Tabs>
			</div>
        )
    }
}

export default Rugs;
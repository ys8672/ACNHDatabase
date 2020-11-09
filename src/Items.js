import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { PieChart } from 'react-minimal-pie-chart';
import { Tabs, Tab } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const TITLE = 'AC:NH Items'

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('/api/items/').then(r => r.json()).then(item_data => {
            this.setState({items: item_data.items})
        })

    }

    render() {
		//chart stuff
		const data = this.state.items
		
		let isInteractiveList = data.reduce(function(obj, v) {
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
		}
		
		//table stuff
		function nameFormatter(cell, row) {
            return (
                <b><Link to={{pathname: `/items/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b>
            );
        }
		
        function imageFormatter(cell, row) {
			var imageArray = cell.split(',');
			const img = imageArray.map(str => 
                <img src={str} alt="" style={{maxHeight: '100%', maxWidth: '100%'}}/>
			)
            return (
				<div>
					<AliceCarousel
						items={img}
						autoPlayInterval={3000}
						autoPlay={true}
						fadeOutAnimation={true}
						mouseTrackingEnabled={true}
						disableAutoPlayOnAction={true}
						dotsDisabled={true}
						buttonsDisabled={true}
					  />
				</div>
            );
        }
		
		function booleanFormatter(cell, row) {
			if(cell === true){
				return ("Yes")
			}
			return ("No")
		}
		
		const selectBoolean= {
			true: 'Yes',
			false: 'No'
		};
		
		function kitCostFormatter(cell, row) {
			if(cell === '-1'){
				return "Not Customizable"
			}
			return parseInt(cell)
		}
		
		const selectKitCost= {
			'-1': 'Not Customizable',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8'
		};
		
		const selectSize={
			'0.5x1':'0.5 x 1',
			'1x0.5':'1 x 0.5',
			'1x1':'1 x 1',
			'1x1.5':'1 x 1.5',
			'1x2':'1 x 2',
			'1.5x1.5':'1.5 x 1.5',
			'2x0.5':'2 x 0.5',
			'2x1':'2 x 1',
			'2x1.5':'2 x 1.5',
			'2x2':'2 x 2',
			'3x1':'3 x 1',
			'3x2':'3 x 2',
			'3x3':'3 x 3'
		}
		
		function sizeSort(a, b, order, dataField, rowA, rowB) {
			var sortOrder = ['0.5x1','1x0.5','1x1','1x1.5','1x2','1.5x1.5','2x0.5','2x1','2x1.5','2x2','3x1','3x2','3x3'];
			if (order === 'asc') {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			}
			return sortOrder.indexOf(b) - sortOrder.indexOf(a);			
		}
		
		const selectSource={
			'Birthday': 'Birthday',
			'Bug-Off': 'Bug-Off', 
			'Bunny Day': 'Bunny Day', 
			'C.J.': 'C.J.',
			'Crafting': 'Crafting',
			'Dodo Airlines': 'Dodo Airlines',
			'Fishing Tourney': 'Fishing Tourney',
			'Flick': 'Flick',
			'Gullivarrr': 'Gullivarrr',
			'Gulliver': 'Gulliver', 
			'HHA': 'HHA',
			'International Museum Day': 'International Museum Day',
			'Luna': 'Luna', 
			'Mom': 'Mom', 
			'Nintendo; Nook Shopping': 'Nintendo; Nook Shopping',
			'Nook Miles Shop': 'Nook Miles Shop',
			'Nook Shopping Promotion': 'Nook Shopping Promotion', 
			'Nook Shopping Seasonal': 'Nook Shopping Seasonal', 
			"Nook's Cranny": "Nook's Cranny",
			'Rover': 'Rover',
			'Starting items': 'Starting items', 
			'Wedding Season': 'Wedding Season'
		}
		
		function buyFormatter(cell, row) {
			if(cell === null){
				return "Not Buyable"
			}
			return parseInt(cell)
		}
		
		const selectCategory={
			'N/A': 'N/A',
			'Air Conditioning': 'Air Conditioning',
			'Animal': 'Animal',
			'Arch': 'Arch',
			'Audio': 'Audio',
			'Bathroom Things': 'Bathroom Things',
			'Bathtub': 'Bathtub',
			'Beauty': 'Beauty',
			'Bed': 'Bed',
			'Chair': 'Chair',
			'Chest': 'Chest',
			'Clock': 'Clock',
			'Compass': 'Compass',
			'Desk': 'Desk',
			'Dining': 'Dining',
			'Dresser': 'Dresser',
			'Easter': 'Easter',
			'Facility Decor': 'Facility Decor',
			'Fan': 'Fan',
			'Fireplace': 'Fireplace',
			'Fish': 'Fish',
			'Folk Craft Decor': 'Folk Craft Decor',
			'Game Console': 'Game Console',
			'Garden': 'Garden',
			'Heating': 'Heating',
			'Home Appliances': 'Home Appliances',
			'Hospital': 'Hospital',
			'House Door Decor': 'House Door Decor',
			'Insect': 'Insect',
			'Japanese Style': 'Japanese Style',
			'Kitchen': 'Kitchen',
			'Kitchen Things': 'Kitchen Things',
			'Lamp': 'Lamp',
			'Museum': 'Museum',
			'Musical Instrument': 'Musical Instrument',
			'Office': 'Office',
			'Outdoors Decor': 'Outdoors Decor',
			'Plants': 'Plants',
			'Playground': 'Playground',
			'Ranch': 'Ranch',
			'School': 'School',
			'Screen': 'Screen',
			'Sculpture': 'Sculpture',
			'Seaside': 'Seaside',
			'Seasonal Decor': 'Seasonal Decor',
			'Sewing Table': 'Sewing Table',
			'Shelf': 'Shelf',
			'Shop': 'Shop',
			'Sofa': 'Sofa',
			'Space': 'Space',
			'Special Fish': 'Special Fish',
			'Special Insect': 'Special Insect',
			'Sports': 'Sports',
			'Study': 'Study',
			'Supplies': 'Supplies',
			'TV': 'TV',
			'Table': 'Table',
			'Toilet': 'Toilet',
			'Toy': 'Toy',
			'Vehicle': 'Vehicle',
			'Work Bench': 'Work Bench'
		}
		
		const selectTypeOf = {
			"Houseware": "Houseware",
			"Misc": "Misc",
			"Wallmounted": "Wallmounted"
		}
		
		function emptyFormatter(cell, row) {
			if(cell === ''){
				return "N/A"
			}
			return cell
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
        const {items} = this.state
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
                dataField: 'kitCost',
                text: 'Customization Kit Cost',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: kitCostFormatter,
				filter: selectFilter({
					options: selectKitCost,
					placeholder: 'All'
				})
			},{
                dataField: 'size',
                text: 'Size',
                sort: true,
				sortFunc: sizeSort,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSize,
					placeholder: 'All'
				})
			},{
                dataField: 'source',
                text: 'Source',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSource,
					placeholder: 'All'
				})
			},{
                dataField: 'isInteractive',
                text: 'Interactability',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: booleanFormatter,
				filter: selectFilter({
					options: selectBoolean,
					placeholder: 'All'
				})
			},{
                dataField: 'buyPrice',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Number'}),
				formatter: buyFormatter
			},{
                dataField: 'sellPrice',
                text: 'Sell Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Number'})
			},{
				dataField: 'typeof',
				text: 'Type',
				sort: true,
				align: 'center',
				headerAlign: 'center',
				filter: selectFilter({
					options: selectTypeOf,
					placeholder: 'All'
				})
			},{
                dataField: 'category',
                text: 'Category',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
				filter: selectFilter({
					options: selectCategory,
					placeholder: 'All'
				})
			},{
                dataField: 'variant',
                text: 'Variations',
                sort: false,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
				filter: textFilter({placeholder: 'Search'})
			},{
                dataField: 'pattern',
                text: 'Patterns',
                sort: false,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
				filter: textFilter({placeholder: 'Search'})
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
                text: 'Item Name',
				formatter: (cell, row) => {
					return(
						<div><b>Name: </b> {nameFormatter(cell, row)} </div>
					);
				},
				align: "center",
				headerAlign: 'center',
            },{
                dataField: 'image',
                text: 'Item Image',
                formatter: (cell, row) => {
					return(
						<div>{imageFormatter(cell, row)}</div>
					);
				},
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'kitCost',
                text: 'Customization Kit Cost',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Customization Kit Cost: </b> {kitCostFormatter(cell, row)} </div>
					);
				},
				filterValue: kitCostFormatter
			},{
                dataField: 'size',
                text: 'Size of Item',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Size: </b> {cell} </div>
					);
				}
			},{
                dataField: 'source',
                text: 'How to Acquire',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Source: </b> {cell} </div>
					);
				}

			},{
                dataField: 'isInteractive',
                text: 'Interactable?',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Interactability: </b> {booleanFormatter(cell, row)} </div>
					);
				},
				filterValue: booleanFormatter
			},{
                dataField: 'buyPrice',
                text: 'Price to Buy',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Purchase Price: </b> {buyFormatter(cell, row)} </div>
					);
				},
				filterValue: buyFormatter
			},{
                dataField: 'sellPrice',
                text: 'Price to Sell',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Sell Price: </b> {cell} </div>
					);
				}
			},{
				dataField: 'typeof',
				text: 'Type of Item',
				align: 'center',
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Type: </b> {cell} </div>
					);
				}
			},{
                dataField: 'category',
                text: 'Category',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Category: </b> {emptyFormatter(cell, row)} </div>
					);
				},
				filterValue: emptyFormatter
			},{
                dataField: 'variant',
                text: 'List of Variants',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Variations: </b> {emptyFormatter(cell, row)} </div>
					);
				},
				filterValue: emptyFormatter
			},{
                dataField: 'pattern',
                text: 'List of Patterns',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Patterns: </b> {emptyFormatter(cell, row)} </div>
					);
				},
				filterValue: emptyFormatter
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
		
		//about
		function about2(){
			return(
			<div>
				<h5 > 01. <u>Name:</u> The name of the item as described in the inventory. </h5>
				<h5 > 02. <u>Image:</u> The picture of the item when placed on the island. (Please note for items with different variations,
				images of the different variations will be displayed every few seconds, so the image can change.) </h5>
				<h5 > 03. <u>Customization Kit Cost:</u> The number of kits required to customize the item on a DIY table, if the item
					is customizable. </h5>
				<h5 > 04. <u>Size:</u> The number of tile space the item will take when placed. </h5>
				<h5 > 05. <u>Source:</u> Where you can find the item. </h5>
				<h5 > 06. <u>Interactability:</u> Whether or not the player can interact with the item by pressing A. </h5>
				<h5 > 07. <u>Purchase Price:</u> The cost of the item in bells at Nook's Cranny. </h5>
				<h5 > 08. <u>Sell Price:</u> The number of bells you receive for selling the item at Nook's Cranny. </h5>
				<h5 > 09. <u>Type:</u> The type of item, or in which of the 3 inventory categories the player will find the item. </h5>
				<h5 > 10. <u>Category:</u> The category the item is classified as.</h5>
				<h5 > 11. <u>Variations:</u> The different variations that can exist for an item. </h5>
				<h5 > 12. <u>Patterns:</u> The different patterns of an item. </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Items are objects in your inventory you can place on your island. Besides the wall-mounted type
				of items, all other items can be placed outside of your home, inside your house, and anywhere on the island. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the items currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the items
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
				  <img src={process.env.PUBLIC_URL + '/items.png'} class="card-img" alt="Items" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				
				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">

				  
				  <Tab eventKey="table" title="Table">		
					<BrowserView>
						<BootstrapTable
							bootstrap4
							keyField = "id"
							data={ items }
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
						  data={ items }
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
						<h3 className='text-center'> Items by Interactability </h3>
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
						
					<div class="border border-success">
					  <h3 className='text-center'> Items By Type </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={800}
							height={600}
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
							data={typeofList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>

					<div class="border border-success">
					  <h3 className='text-center'> Items By Size </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart
							graph={{
								zoom: 1.0,
							}}
							width={750}
							height={600}
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
					  <h3 className='text-center'> Items By Source </h3>
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
					  <h3 className='text-center'> Items By Category </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={1200}
							height={1400}
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
							data={categoryList}
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


export default Items;
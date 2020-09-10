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
                text: 'Item Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Item Image',
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
					options: selectKitCost
				})
			},{
                dataField: 'size',
                text: 'Size of Item',
                sort: true,
				sortFunc: sizeSort,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSize
				})
			},{
                dataField: 'source',
                text: 'How to Acquire',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSource
				})
			},{
                dataField: 'isInteractive',
                text: 'Interactable?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: booleanFormatter,
				filter: selectFilter({
					options: selectBoolean
				})
			},{
                dataField: 'buyPrice',
                text: 'Price to Buy',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter(),
				formatter: buyFormatter
			},{
                dataField: 'sellPrice',
                text: 'Price to Sell',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter()
			},{
                dataField: 'category',
                text: 'Category',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
				filter: selectFilter({
					options: selectCategory
				})
			},{
                dataField: 'variant',
                text: 'List of Variants',
                sort: false,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
				filter: textFilter()
			},{
                dataField: 'pattern',
                text: 'List of Patterns',
                sort: false,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
				filter: textFilter()
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
						<div><b>Size of Item: </b> {cell} </div>
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
						<div><b>Interactable?: </b> {booleanFormatter(cell, row)} </div>
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
						<div><b>Selling Price: </b> {cell} </div>
					);
				}
			},{
                dataField: 'category',
                text: 'Category',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Purchase Price: </b> {emptyFormatter(cell, row)} </div>
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
						<div><b>List of Variants: </b> {emptyFormatter(cell, row)} </div>
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
						<div><b>List of Patterns: </b> {emptyFormatter(cell, row)} </div>
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
		
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Items</h1>
				
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
					  <h3 className='text-center'> Items by Size </h3>
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
					  <h3 className='text-center'> Items by Source </h3>
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
					  <h3 className='text-center'> Items by Category </h3>
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
				</Tabs>
			</div>
        )
    }
}


export default Items;
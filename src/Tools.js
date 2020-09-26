import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Tabs, Tab } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const TITLE = 'AC:NH Tools'

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: []
        }
    }

    componentDidMount() {
        fetch('/api/tools/').then(r => r.json()).then(tool_data => {
            this.setState({tools: tool_data.tools})
        })

    }

    render() {
		//chart stuff
		const data = this.state.tools
		
		let usesChart = data.reduce(function(obj, v) {
		  obj[v.uses] = (obj[v.uses] || 0) + 1;
		  return obj;

		}, {})
		let usesList = []
		for (const key in usesChart) {
			var realkey = key
			if (key === '-1'){
				realkey = 'Infinite'
			}
			let tmp = {label: realkey, value: usesChart[key]}
			usesList.push(tmp)
		}
		
		//table stuff
		function nameFormatter(cell, row) {
            return (
                <b><Link to={{pathname: `/tools/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b>
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
		
		function kitCostFormatter(cell, row) {
			if(cell === -1){
				return "Not Customizable"
			}
			return parseInt(cell)
		}
		
		const selectKitCost= {
			'-1': 'Not Customizable',
			'1': '1'
		};
		
		function usesFormatter(cell, row) {
			if(cell === -1){
				return "Infinite"
			}
			return parseInt(cell)
		}
		
		const selectUseCost= {
			'-1': 'Infinite',
			'1': '1',
			'3': '3',
			'10': '10',
			'20': '20',
			'30': '30',
			'40': '40',
			'60': '60',
			'90': '90',
			'100': '100',
			'200': '200'
		};
		
		const selectStack= {
			'1': '1',
			'10': '10'
		};
		
		const selectSource = {
			'Bug-Off': 'Bug-Off',
			'Crafting': 'Crafting',
			'Fishing Tourney': 'Fishing Tourney',
			'Isabelle': 'Isabelle',
			'May Day Tour': 'May Day Tour',
			'Nook Miles Redemption': 'Nook Miles Redemption',
			"Nook's Cranny": "Nook's Cranny",
			"Redd's Raffle": "Redd's Raffle",
			'Wilbur': 'Wilbur'

		}
		
		function buyFormatter(cell, row) {
			if(cell === -1){
				return "Not Buyable"
			}
			return parseInt(cell)
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
		
        const {tools} = this.state
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
                dataField: 'diy',
                text: 'Recipe',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter({placeholder: 'Search'})
			},{
                dataField: 'kitcost',
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
                dataField: 'uses',
                text: 'Uses',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: usesFormatter,
				filter: selectFilter({
					options: selectUseCost,
					placeholder: 'All'
				})
			},{
                dataField: 'stacksize',
                text: 'Stack Size',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectStack,
					placeholder: 'All'
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
                dataField: 'variations',
                text: 'Variations',
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
                text: 'Name',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Name: </b> {nameFormatter(cell, row)} </div>
					);
				},
            },{
                dataField: 'image',
                text: 'Image',
				searchable: false,
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div>{imageFormatter(cell, row)} </div>
					);
				},
			},{
                dataField: 'diy',
                text: 'Recipe',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Recipe: </b> {cell} </div>
					);
				},
			},{
                dataField: 'kitcost',
                text: 'Customization Kit Cost',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Customization Kit Cost: </b> {kitCostFormatter(cell, row)} </div>
					);
				},
			},{
                dataField: 'uses',
                text: 'Uses',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Uses: </b> {usesFormatter(cell, row)} </div>
					);
				},
			},{
                dataField: 'stacksize',
                text: 'Stack Size',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Stack Size: </b> {cell} </div>
					);
				},
			},{
                dataField: 'buy',
                text: 'Purchase Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Purchase Price: </b> {buyFormatter(cell, row)} </div>
					);
				},
			},{
                dataField: 'sell',
                text: 'Sell Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Sell Price: </b> {cell} </div>
					);
				},
			},{
                dataField: 'source',
                text: 'Source',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Source: </b> {cell} </div>
					);
				},
			},{
                dataField: 'variations',
                text: 'Variations',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Variations: </b> {cell} </div>
					);
				},
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
				<h5 > 01. <u>Name:</u> The name of the tool as described in the inventory. </h5>
				<h5 > 02. <u>Image:</u> The picture of the tool. (Please note for tools with different variations,
				images of the different variations will be displayed every few seconds, so the image can change.) </h5>
				<h5 > 03. <u>Recipe:</u> The materials needed to craft the tool. </h5>
				<h5 > 04. <u>Customization Kit Cost:</u> The number of customization kits needed to change the decoration
					of this tool. </h5>
				<h5 > 05. <u>Uses:</u> Number of times you can use the tool before it breaks. </h5>
				<h5 > 06. <u>Stack Size:</u> Maximum number of the tool you can have in one inventory space. </h5>
				<h5 > 07. <u>Purchase Price:</u> The cost of the tool in bells at Nook's Cranny. </h5>
				<h5 > 08. <u>Sell Price:</u> The number of bells you receive for selling the tool at Nook's Cranny. </h5>
				<h5 > 09. <u>Source:</u> How to acquire the tool. </h5>
				<h5 > 10. <u>Variations:</u> The different variations that can exist for an tool. </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Tools are items to help the player with doing chores and tasks around the island. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the tools currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the tools
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
				  <img src={process.env.PUBLIC_URL + '/tools.png'} class="card-img" alt="tools" 
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
							data={ tools }
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
						  data={ tools }
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
					  <h3 className='text-center'> Tools By Uses </h3>
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
							data={usesList}
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


export default Tools;
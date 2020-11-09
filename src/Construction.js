import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Tabs, Tab } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const TITLE = 'AC:NH Construction'

class Construction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cons: []
        }
    }

    componentDidMount() {
        fetch('/api/construction/').then(r => r.json()).then(construction_data => {
            this.setState({cons: construction_data.construction})
        })

    }
	
	

    render() {
		//fun facts code
		const data = this.state.cons
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
	
		// table code
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/construction/${row.id}/`}}>{cell}</Link></b> 
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '50%', maxWidth: '50%'}}/>
            );
        }

		const selectSource={
			'Tent': 'Tent',
			'Resident Services Upgrade': 'Resident Services Upgrade',
			'Initial House': 'Initial House',
			'3rd House Upgrade (Left Room)': '3rd House Upgrade (Left Room)',
			'4th House Upgrade (Right Room)': '4th House Upgrade (Right Room)',
			'5th House Upgrade (2nd Floor)': '5th House Upgrade (2nd Floor)'
		}
			
		function sourceSort(a, b, order, dataField, rowA, rowB) {
			var sortOrder = ['Tent', 'Resident Services Upgrade', 'Initial House', 
				'3rd House Upgrade (Left Room)', '4th House Upgrade (Right Room)',
				'5th House Upgrade (2nd Floor)'];
			if (order === 'asc') {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			}
			return sortOrder.indexOf(b) - sortOrder.indexOf(a);			
		}
		
		const selectCategory={
			'Bridge': 'Bridge',
			'Door': 'Door',
			'Incline': 'Incline',
			'Mailbox': 'Mailbox',
			'Roofing': 'Roofing',
			'Siding': 'Siding'
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
        const {cons} = this.state
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
			}, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Number'})
            }, {
                dataField: 'source',
                text: 'Source',
                sort: true,
				sortFunc: sourceSort,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSource[cell],
				filter: selectFilter({
					options: selectSource,
					placeholder: 'All'
				})
            }, {
                dataField: 'category',
                text: 'Category',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectCategory[cell],
				filter: selectFilter({
					options: selectCategory,
					placeholder: 'All'
				})
            }, {
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
                text: 'Construction Name',
				formatter: (cell, row) => {
					return(
						<h5><b>Name: <Link to={{pathname: `/construction/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b></h5>
					);
				},
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Construction Photo',
                searchable: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
			}, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<h5><b>Purchase Price: <div className="capitalize">{cell}</div></b></h5>
					);
				}
            }, {
                dataField: 'source',
                text: 'How to Acquire',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Source: </b> {cell} </div>
					);
				},
            }, {
                dataField: 'category',
                text: 'Category',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Category: </b> {cell} </div>
					);
				},
            }, {
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
				<h5 > 1. <u>Name:</u> The name of the construction item as described by Tom Nook. </h5>
				<h5 > 2. <u>Image:</u> The picture of the construction project as it would look on your island. </h5>
				<h5 > 3. <u>Purchase Price:</u> The number of bells required to build a construction project. Bridge and inclines
					are paid by talking to Lloid after placing the part on your island. Also, if your house is at the maximum
					expansion, you can get one free house construction per day. </h5>
				<h5 > 4. <u>Source:</u> Where and/or when to start the construction project. </h5>
				<h5 > 5. <u>Category:</u> The type of construction project. </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Construction projects are unique projects that can help you spice up your island. These
					can be constructed by talking to Tom Nook in the Resident Services. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the construction projects currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the construction project
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
				  <img src={process.env.PUBLIC_URL + '/construction.png'} class="card-img" alt="Construction" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">

				  
				  <Tab eventKey="table" title="Table">	
					<BrowserView>
						<BootstrapTable
							bootstrap4
							keyField = "id"
							data={ cons }
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
						  data={ cons }
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
					  <h3 className='text-center'> Construction By Source </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart
							graph={{
								zoom: 1.0,
							}}
							width={1000}
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
					  <h3 className='text-center'> Construction By Category </h3>
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


export default Construction;
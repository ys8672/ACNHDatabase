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
			
		function booleanFormatter(cell, row) {
			if(cell === true){
				return ("Yes")
			}
			return ("No")
		}
		
		const selectVFX= {
			'Lights Off': 'Lights Off',
			'None': 'None',
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
				//filter: numberFilter()
			},{
				dataField: 'ceilingType',
				text: 'Type of Ceiling',
				sort: true,
				align: 'center',
				headerAlign: 'center',
/* 				filter: selectFilter({
					options: selectTypeOf
				}) */
			},{
                dataField: 'curtainType',
                text: 'Type of Curtain',
                sort: true,
				align: "center",
				headerAlign: 'center',
/* 				formatter: emptyFormatter,
				filter: selectFilter({
					options: selectCategory
				}) */
			},{
                dataField: 'points',
                text: 'HHA Points',
                sort: true,
				align: "center",
				headerAlign: 'center',
/* 				formatter: emptyFormatter,
				filter: textFilter() */
			},{
                dataField: 'series',
                text: 'HHA Series',
                sort: true,
				align: "center",
				headerAlign: 'center',
/* 				formatter: emptyFormatter,
				filter: textFilter() */
			},{
                dataField: 'concepts',
                text: 'Themes',
                sort: true,
				align: "center",
				headerAlign: 'center',
/* 				formatter: emptyFormatter,
				filter: textFilter() */
			},{
                dataField: 'tag',
                text: 'Tags',
                sort: true,
				align: "center",
				headerAlign: 'center',
/* 				formatter: emptyFormatter,
				filter: textFilter() */
			},{
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
            }
            ]
        }
		
		//mobile
		/* const { SearchBar } = Search;
		const {mobilecolumns} = {
            mobilecolumns: [{
                dataField: 'name',
                text: 'wallpaper Name',
				formatter: (cell, row) => {
					return(
						<div><b>Name: </b> {nameFormatter(cell, row)} </div>
					);
				},
				align: "center",
				headerAlign: 'center',
            },{
                dataField: 'image',
                text: 'wallpaper Image',
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
                text: 'Size of wallpaper',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Size of wallpaper: </b> {cell} </div>
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
				dataField: 'typeof',
				text: 'Type of wallpaper',
				align: 'center',
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Type of wallpaper: </b> {cell} </div>
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
        } */
	
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
					

					
				 </Tab>

				  <Tab eventKey="charts" title="Fun Charts">

				  </Tab>
				</Tabs>
			</div>
        )
    }
}


export default Wallpapers;

					/* <MobileView>
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
					</MobileView> */
import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const TITLE = 'AC:NH Songs'

class Songs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }

    componentDidMount() {
        fetch('/api/songs/').then(r => r.json()).then(song_data => {
            this.setState({songs: song_data.songs})
        })

    }

    render() {
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/songs/${row.id}/`}}>{cell}</Link></b>
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }

		function buyPriceFormatter(cell, row) {
			if(cell === -1){
				return "Not Purchasable"
			}
			return cell
		}
		
		function musicFormatter(cell, row) {
			return (
				<audio src={cell} controls>
					Your browser does not support the audio element.
				</audio>
			)
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
		const selectPurchasable= {
			'Yes': 'Yes',
			'No': 'No'
		};
		
		const selectBuyPrice= {
			'3200': '3200',
			'-1': 'Not Purchasable'			
		};
		
		const selectSellPrice= {
			'800': '800'
		};

        const {songs} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Song Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Song Cover Photo',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'isOrderable',
                text: 'Purchasable?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectPurchasable[cell],
				filter: selectFilter({
					options: selectPurchasable
				})
            }, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: buyPriceFormatter,
				filter: selectFilter({
					options: selectBuyPrice
				})
            }, {
                dataField: 'sellPrice',
                text: 'Sell Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSellPrice[cell],
				filter: selectFilter({
					options: selectSellPrice
				})
            }, {
                dataField: 'music',
                text: 'Music',
                sort: false,
				align: "center",
				headerAlign: 'center',
				formatter: musicFormatter
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
            }
            ]
        }
	
		//mobile functions
		function mobileName(cell, row){
			return (
				<div>
					<h5><b>Song Name: <Link to={{pathname: `/songs/${row.id}/`}}>{cell}</Link></b></h5>
				</div>
            );
		}
		
		function mobileOrderable(cell, row){
			return (
				<div>
					<b>Is Orderable?: </b> {cell}
				</div>
            );
		}
		
		function mobileBuyPrice(cell, row){
			return (
				<div>
					<b>Purchase Price: </b> {buyPriceFormatter(cell, row)}
				</div>
            );
		}
		
		function mobileSellPrice(cell, row){
			return (
				<div>
					<b>Selling Price: </b> {cell}
				</div>
            );
		}
		
		const { SearchBar } = Search;
		const { mobilecol } = {
            mobilecol:
			[{
                dataField: 'name',
                text: 'Song Name',
				formatter: mobileName,
				align: "center",
				headerAlign: 'center',
            },{
                dataField: 'image',
                text: 'Song Cover Photo',
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'isOrderable',
                text: 'Purchasable?',
				align: "center",
				headerAlign: 'center',
				formatter: mobileOrderable
            }, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
				align: "center",
				headerAlign: 'center',
				formatter: mobileBuyPrice,
				filterValue: buyPriceFormatter
            }, {
                dataField: 'sellPrice',
                text: 'Sell Price',
				align: "center",
				headerAlign: 'center',
				formatter: mobileSellPrice
            }, {
                dataField: 'music',
                text: 'Music',
                searchable: false,
				align: "center",
				headerAlign: 'center',
				formatter: musicFormatter
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }]
		}; 
		
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Songs</h1>

				<BrowserView>
					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ songs }
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
					  data={ songs }
					  columns={ mobilecol }
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
			</div>
        )
    }
}


export default Songs;
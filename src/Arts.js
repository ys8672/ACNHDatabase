import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const TITLE = 'AC:NH Art'

class Arts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arts: []
        }
    }

    componentDidMount() {
        fetch('/api/art/').then(r => r.json()).then(art_data => {
            this.setState({arts: art_data.arts})
        })

    }

    render() {
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/art/${row.id}`}}>{cell}</Link></b> 
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }

		function fakeFormatter(cell, row) {
			if(cell === true){
				return ("Yes")
			}
			return ("No")
		}
		
		function truncate(cell, row) {
		   if (cell.length > 128) {
				var link = <Link to={{pathname: `/art/${row.id}`}}>...</Link>;
				return (
					<div> {cell.substring(0, 128)}{link} </div>
				)
		   }
		   return cell;
		};
		
		const selectFake= {
			true: 'Yes',
			false: 'No'
		};
		
		const selectBuyPrice= {
			'4980': '4980',		
		};
		
		const selectSellPrice= {
			'1245': '1245'
		};
				
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
        const {arts} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Art Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Art Photo',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'hasFake',
                text: 'Has Fake Version?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: fakeFormatter,
				filter: selectFilter({
					options: selectFake
				})
            }, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectBuyPrice[cell],
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
                dataField: 'museum',
                text: 'Museum Description',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter(),
				formatter: truncate
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
                text: 'Art Name',
				formatter: (cell, row) => {
					return(
						<h5><b>Name: <Link to={{pathname: `/art/${row.id}`}}><div className="capitalize">{cell}</div></Link></b></h5>
					);
				},
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Art Photo',
                searchable: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'buyPrice',
                text: 'Purchase Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Purchase Price: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'sellPrice',
                text: 'Sell Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Sell Price: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'museum',
                text: 'Museum Description',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Museum Description: </b> {truncate(cell, row)} </div>
					);
				}
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }
            ]
        }
	
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Art</h1>

				<BrowserView>

					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ arts }
						columns={ columns }
						striped
						pagination={ paginationFactory() }
						defaultSorted={ defaultSorted } 
						filter={ filterFactory() }
						
					/>
				</BrowserView>
				
				<MobileView>
					<ToolkitProvider
					  keyField="id"
					  data={ arts }
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
			</div>
        )
    }
}


export default Arts;
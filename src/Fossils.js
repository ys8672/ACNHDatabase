import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ShowMoreText from 'react-show-more-text';

const TITLE = 'AC:NH Fossils'

class Fossils extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fossils: []
        }
    }

    componentDidMount() {
        fetch('/api/fossils/').then(r => r.json()).then(fossil_data => {
            this.setState({fossils: fossil_data.fossils})
        })

    }

    render() {
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/fossils/${row.id}/`}}>{cell}</Link></b> 
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asce'
		}];
		
		function truncate(cell, row) {
		   return(
				<ShowMoreText
					/* Default options */
					lines={5}
					more='Show more'
					less='Show less'
					anchorClass=''
					onClick={this.executeOnClick}
					expanded={false}
				>
					{cell}
				</ShowMoreText>
			)
		};
		
        const {fossils} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Fossil Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Fossil Image',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'price',
                text: 'Sell Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter()
            }, {
                dataField: 'museumPhrase',
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
		
		//mobile
		const { SearchBar } = Search;
		const {mobilecolumns} = {
            mobilecolumns: [{
                dataField: 'name',
                text: 'Fossil Name',
				formatter: (cell, row) => {
					return(
						<div><b>Name: </b> {nameFormatter(cell, row)} </div>
					);
				},
				align: "center",
				headerAlign: 'center',
            },{
                dataField: 'image',
                text: 'Fossil Image',
                formatter: (cell, row) => {
					return(
						<div>{imageFormatter(cell, row)}</div>
					);
				},
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'price',
                text: 'Sell Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Sell Price: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'museumPhrase',
                text: 'Museum Description',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Museum Phrase: </b> {truncate(cell, row)} </div>
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
	
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Fossils</h1>

				<BrowserView>
					<BootstrapTable 
						bootstrap4
						keyField = "id"
						data={ fossils }
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
					  data={ fossils }
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
			</div>
        )
    }
}


export default Fossils;
import React from 'react'
import {Link} from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const TITLE = 'AC:NH Reactions'

class Reactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reactions: []
        }
    }

    componentDidMount() {
        fetch('/api/reactions/').then(r => r.json()).then(reaction_data => {
            this.setState({reactions: reaction_data.reactions})
        })

    }

    render() {
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/reactions/${row.id}/`}}>{cell}</Link></b> 
            );
        }
		
		function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
		const selectSource={
			'All Villagers': 'All Villagers',
			'Big Sister Villagers': 'Big Sister Villagers',
			'Cranky Villagers': 'Cranky Villagers',
			'Jock Villagers': 'Jock Villagers',
			'Lazy Villagers': 'Lazy Villagers',
			'Normal Villagers': 'Normal Villagers',
			'Peppy Villagers': 'Peppy Villagers',
			'Smug Villagers': 'Smug Villagers',
			'Snooty Villagers': 'Snooty Villagers'
		}

		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
        const {reactions} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Reaction Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Image',
                sort: false,
				align: "center",
				headerAlign: 'center',
				formatter: imageFormatter
            },{
                dataField: 'source',
                text: 'Where to Acquire:',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSource[cell],
				filter: selectFilter({
					options: selectSource
				})
            },{
                dataField: 'sourceNotes',
                text: 'Important Notes',
                sort: false,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true
            }
            ]
        }
		
		//mobile
		const { SearchBar } = Search;
        const {mobilecolumns} = {
            mobilecolumns: [{
                dataField: 'name',
                text: 'Reaction Name',
				formatter: (cell, row) => {
					return(
						<h5><b>Name: <Link to={{pathname: `/reactions/${row.id}/`}}>{cell}</Link></b></h5>
					);
				},
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Image',
                searchable: false,
				align: "center",
				headerAlign: 'center',
				formatter: imageFormatter
            },{
                dataField: 'source',
                text: 'Where to Acquire:',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Source: </b> {cell} </div>
					);
				}
            },{
                dataField: 'sourceNotes',
                text: 'Important Notes',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Source Notes: </b> {cell} </div>
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
		
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Reactions</h1>

				<BrowserView>
					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ reactions }
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
					  data={ reactions }
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


export default Reactions;
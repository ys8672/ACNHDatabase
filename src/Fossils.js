import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

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
                <b className="capitalize"><Link to={{pathname: `/fossils/${row.id}`}}>{cell}</Link></b> 
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
		   if (cell.length > 128) {
				var link = <Link to={{pathname: `/fossils/${row.id}`}}>...</Link>;
				return (
					<div> {cell.substring(0, 128)}{link} </div>
				)
		   }
		   return cell;
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
	
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Fossils</h1>

				<div>

					<BootstrapTable 
						bootstrap4
						keyField = "id"
						data={ fossils }
						columns={ columns }
						striped
						pagination={ paginationFactory() }
						defaultSorted={ defaultSorted } 
						filter={ filterFactory() }
						
					/>
				</div>
			</div>
        )
    }
}


export default Fossils;
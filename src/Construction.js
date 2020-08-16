import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

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
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/construction/${row.id}`}}>{cell}</Link></b> 
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
                text: 'Construction Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Construction Photo',
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
				filter: numberFilter()
            }, {
                dataField: 'source',
                text: 'How to Acquire',
                sort: true,
				sortFunc: sourceSort,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSource[cell],
				filter: selectFilter({
					options: selectSource
				})
            }, {
                dataField: 'category',
                text: 'Category',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectCategory[cell],
				filter: selectFilter({
					options: selectCategory
				})
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

                <h1 className="text-center">Construction</h1>

				<div>

					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ cons }
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


export default Construction;
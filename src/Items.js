import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

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
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize">{cell} </b> 
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell}
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asce'
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
                text: 'Fossil Image',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'canCustomize',
                text: 'Customizable?',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'kitCost',
                text: 'Customization Kit Cost',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'size',
                text: 'Size of Item',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'source',
                text: 'How to Acquire Item',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'isInteractive',
                text: 'Interactable?',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'buyPrice',
                text: 'Price to Buy',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'sellPrice',
                text: 'Price to Sell',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'category',
                text: 'Category',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'variant',
                text: 'List of Variants',
                sort: false,
				align: "center",
				headerAlign: 'center'
			},{
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

                <h1 className="text-center">Items</h1>

				<div>

					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ items }
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


export default Items;
import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter  } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

const TITLE = 'AC:NH Recipes'

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        fetch('/api/recipes/').then(r => r.json()).then(recipe_data => {
            this.setState({recipes: recipe_data.recipes})
        })

    }

    render() {
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize">{cell}</b> 
            );
        }
				
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
        const {recipes} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Recipe Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'buyPrice',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },  {
                dataField: 'sellPrice',
                text: 'Sellling Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            }, {
                dataField: 'source',
                text: 'Where To Find?',
                sort: true,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'recipesToUnlock',
                text: 'Number of Recipes Needed to Unlock',
                sort: true,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'category',
                text: 'Category',
                sort: true,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'cardColor',
                text: 'Recipe Card Color',
                sort: true,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'materials',
                text: 'Materials To Craft',
                sort: false,
				align: "center",
				headerAlign: 'center'
            }, {
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
                hidden: true,
            }
            ]
        }
	
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Recipes</h1>

				<div>

					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ recipes }
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


export default Recipes;
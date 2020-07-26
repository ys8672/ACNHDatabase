import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Helmet } from 'react-helmet'

const TITLE = 'AC:NH Villagers'

class Villagers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            villagers: []
        }
    }

    componentDidMount() {
        fetch('/api/villagers/').then(r => r.json()).then(data => {
            this.setState({villagers: data.villagers})
        })

    }

    render() {
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt={"Image Not Found"}
                     style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }

        const {villagers} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Villager Name',
                sort: true,
            }, {
                dataField: 'image',
                text: 'Villager Photo',
                sort: false,
                formatter: imageFormatter,
				searchable: false
            }, {
                dataField: 'personality',
                text: 'Personality',
                sort: true,
				searchable: false
            }, {
                dataField: 'birthday',
                text: 'Birthday',
                sort: true,
				searchable: false
            }, {
                dataField: 'species',
                text: 'Species',
                sort: true,
				searchable: false
            }, {
                dataField: 'catchPhrase',
                text: 'Catch Phrase',
                sort: true,
				searchable: false
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }
            ]
        }
		const { SearchBar, ClearSearchButton } = Search

        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Villagers</h1>
                <h5 className="text-center">Hint: You can click on the column names to sort by that column information
                    up or down alphanumerically.</h5>

				<ToolkitProvider
				  keyField="id"
				  data={ villagers }
				  columns={ columns }
				  search
				  >
				  {
					props => (
					  <div>
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<SearchBar { ...props.searchProps }/>
							<ClearSearchButton { ...props.searchProps } />
						</div> 
						<hr/>
						<BootstrapTable
							{...props.baseProps }
							striped
							pagination={ paginationFactory() }
						/>
					  </div>
					)
				  }
				</ToolkitProvider>
				
            </div>
        )
    }
}


export default Villagers;

import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'

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
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt={"Image Not Found"}
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }

		function orderableFormatter(cell, row) {
			if(cell === true){
				return ("Yes")
			}
			return ("No")
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
			order: 'asce'
		}];
		
		const selectPurchasable= {
			true: 'Yes',
			false: 'No'
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
				formatter: orderableFormatter,
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
	
        return (
            <div class='tablepad'>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <h1 className="text-center">Songs</h1>

				<div>

					<BootstrapTable
						keyField = "id"
						data={ songs }
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


export default Songs;
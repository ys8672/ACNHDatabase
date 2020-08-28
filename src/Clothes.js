import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const TITLE = 'AC:NH Clothes'

class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: []
        }
    }

    componentDidMount() {
        fetch('/api/clothes/').then(r => r.json()).then(clothes_data => {
            this.setState({clothes: clothes_data.clothes})
        })

    }

    render() {
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/clothes/${row.id}/`}}>{cell}</Link></b>
            );
        }
		
        function imageFormatter(cell, row) {
			var imageArray = cell.split(',');
			const img = imageArray.map(str => 
                <img src={str} alt="" style={{maxHeight: '100%', maxWidth: '100%'}}/>
			)
            return (
				<div>
					<AliceCarousel
						items={img}
						autoPlayInterval={3000}
						autoPlay={true}
						fadeOutAnimation={true}
						mouseTrackingEnabled={true}
						disableAutoPlayOnAction={true}
						dotsDisabled={true}
						buttonsDisabled={true}
					  />
				</div>
            );
        }
		
		const selectSourceSheet= {
			'Accessories': 'Accessories',
			'Bags': 'Bags',
			'Bottoms': 'Bottoms',
			'Clothing Other': 'Clothing Other',
			'Dress-Up': 'Dress-Up',
			'Headwear': 'Headwear',
			'Shoes': 'Shoes',
			'Socks': 'Socks',
			'Tops': 'Tops',
			'Umbrellas': 'Umbrellas'
		}
		
		function buyFormatter(cell, row) {
			if(cell === -1){
				return "Not Buyable"
			}
			return parseInt(cell)
		}
		
		const selectSource ={
			'Able Sisters': 'Able Sisters',
			'Birthday': 'Birthday',
			'Bug-Off': 'Bug-Off',
			'Crafting': 'Crafting',
			'Cyrus': 'Cyrus',
			'Dodo Airlines': 'Dodo Airlines',
			'Fishing Tourney': 'Fishing Tourney',
			'Gullivarrr': 'Gullivarrr',
			'Gulliver': 'Gulliver',
			'Isabelle': 'Isabelle',
			'Kicks': 'Kicks',
			'Kicks, Able Sisters': 'Kicks, Able Sisters',
			'Label': 'Label',
			'Mom': 'Mom',
			"New Year's Eve": "New Year's Eve",
			'Nintendo, Able Sisters': 'Nintendo, Able Sisters',
			'Nook Miles Redemption': 'Nook Miles Redemption',
			'Nook Shopping Catalog': 'Nook Shopping Catalog',
			'Nook Shopping Promotion': 'Nook Shopping Promotion',
			'Nook Shopping Seasonal': 'Nook Shopping Seasonal',
			"Nook's Cranny": "Nook's Cranny",
			'Pascal': 'Pascal',
			'Recycle box': 'Recycle box'
		}
		
		const selectSeasonal = {
			'All Year': 'All Year',
			'Fall': 'Fall',
			'Spring': 'Spring',
			'Summer': 'Summer',
			'Winter': 'Winter'
		}
		
		function booleanFormatter(cell, row) {
			if(cell === true){
				return ("Yes")
			}
			return ("No")
		}
		
		const selectBoolean= {
			true: 'Yes',
			false: 'No'
		};
		
		function variationFormatter(cell, row) {
			if(cell === null){
				return "N/A"
			}
			return cell
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
        const {clothes} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Clothing Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Clothing Image',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'sourceSheet',
                text: 'Clothing Type',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSourceSheet
				})
			},{
                dataField: 'buy',
                text: 'Price to Buy',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: buyFormatter,
				filter: numberFilter()

			},{
                dataField: 'sell',
                text: 'Price to Sell',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter()
			},{
                dataField: 'source',
                text: 'How To Acquire',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSource,
					comparator: Comparator.LIKE // default is Comparator.EQ
				})
			},{
                dataField: 'seasonal',
                text: 'Seasons Available',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSeasonal
				})
			},{
                dataField: 'villager',
                text: 'Villager Wearable?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: booleanFormatter,
				filter: selectFilter({
					options: selectBoolean
				})
			},{
                dataField: 'themes',
                text: 'Themes',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter(),
				formatter: (cell, row) => {
					return(
						<div className="capitalize"> {cell} </div>
					);
				}
			},{
                dataField: 'variations',
                text: 'Variations',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter(),
				formatter: variationFormatter,
				filterValue: variationFormatter
			},{
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
                text: 'Clothing Name',
				formatter: (cell, row) => {
					return(
						<div><b>Name: </b> {nameFormatter(cell, row)} </div>
					);
				},
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Clothing Image',
                searchable: false,
				formatter: (cell, row) => {
					return(
						<div> {imageFormatter(cell, row)} </div>
					);
				},
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'sourceSheet',
                text: 'Clothing Type',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Clothing Type: </b> {cell} </div>
					);
				}
			},{
                dataField: 'buy',
                text: 'Price to Buy',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Price To Buy: </b> {buyFormatter(cell, row)} </div>
					);
				},
				filterValue: buyFormatter
			},{
                dataField: 'sell',
                text: 'Price to Sell',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Price To Sell: </b> {cell} </div>
					);
				}
			},{
                dataField: 'source',
                text: 'How To Acquire',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>How To Acquire: </b> {cell} </div>
					);
				}
			},{
                dataField: 'seasonal',
                text: 'Seasons Available',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Seasons Available: </b> {cell} </div>
					);
				}
			},{
                dataField: 'villager',
                text: 'Villager Wearable?',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Villager Wearable?: </b> {booleanFormatter(cell, row)} </div>
					);
				},
				filterValue: booleanFormatter
			},{
                dataField: 'themes',
                text: 'Themes',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div className="capitalize"><b>Themes: </b> {cell} </div>
					);
				}
			},{
                dataField: 'variations',
                text: 'Variations',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Variations: </b> {variationFormatter(cell, row)} </div>
					);
				},
				filterValue: variationFormatter
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

                <h1 className="text-center">Clothes</h1>

				<BrowserView>

					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ clothes }
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
					  data={ clothes }
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



export default Clothes;
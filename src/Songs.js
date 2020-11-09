import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { PieChart } from 'react-minimal-pie-chart';
import { Tabs, Tab } from 'react-bootstrap';

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
		const data = this.state.songs
		let res = data.reduce(function(obj, v) {
		  obj[v.isOrderable] = (obj[v.isOrderable] || 0) + 1;
		  return obj;
		}, {})
		const defaultLabelStyle = {
		  fontSize: '5px',
		  fontFamily: 'sans-serif',
		};
		
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/songs/${row.id}/`}}>{cell}</Link></b>
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
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
			order: 'asc'
		}];
		
		const selectPurchasable= {
			'Yes': 'Yes',
			'No': 'No'
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
                text: 'Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter({placeholder: 'Search'})
            },{
                dataField: 'image',
                text: 'Cover Photo',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'isOrderable',
                text: 'Orderable?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectPurchasable[cell],
				filter: selectFilter({
					options: selectPurchasable,
					placeholder: 'All'
				})
            }, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: buyPriceFormatter,
				filter: selectFilter({
					options: selectBuyPrice,
					placeholder: 'All'
				})
            }, {
                dataField: 'sellPrice',
                text: 'Sell Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSellPrice[cell],
				filter: selectFilter({
					options: selectSellPrice,
					placeholder: 'All'
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
	
		//mobile functions
		function mobileName(cell, row){
			return (
				<div>
					<h5><b>Name: <Link to={{pathname: `/songs/${row.id}/`}}>{cell}</Link></b></h5>
				</div>
            );
		}
		
		function mobileOrderable(cell, row){
			return (
				<div>
					<b>Orderable?: </b> {cell}
				</div>
            );
		}
		
		function mobileBuyPrice(cell, row){
			return (
				<div>
					<b>Purchase Price: </b> {buyPriceFormatter(cell, row)}
				</div>
            );
		}
		
		function mobileSellPrice(cell, row){
			return (
				<div>
					<b>Sell Price: </b> {cell}
				</div>
            );
		}
		
		const { SearchBar } = Search;
		const { mobilecol } = {
            mobilecol:
			[{
                dataField: 'name',
                text: 'Song Name',
				formatter: mobileName,
				align: "center",
				headerAlign: 'center',
            },{
                dataField: 'image',
                text: 'Song Cover Photo',
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'isOrderable',
                text: 'Purchasable?',
				align: "center",
				headerAlign: 'center',
				formatter: mobileOrderable
            }, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
				align: "center",
				headerAlign: 'center',
				formatter: mobileBuyPrice,
				filterValue: buyPriceFormatter
            }, {
                dataField: 'sellPrice',
                text: 'Sell Price',
				align: "center",
				headerAlign: 'center',
				formatter: mobileSellPrice
            }, {
                dataField: 'music',
                text: 'Music',
                searchable: false,
				align: "center",
				headerAlign: 'center',
				formatter: musicFormatter
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }]
		}; 
		
		//about
		function about2(){
			return(
			<div>
				<h5 > 1. <u>Name:</u> The name of the K.K. Slider song. </h5>
				<h5 > 2. <u>Cover Photo:</u> The photo of the song cover when you put it inside a music player item. </h5>
				<h5 > 3. <u>Orderable?:</u> Whether or not the song can be bought. </h5>
				<h5 > 4. <u>Purchase Price:</u> Number of bells needed to buy the song. </h5>
				<h5 > 5. <u>Sell Price:</u> Number of bells acquired when you sell the song.. </h5>
				<h5 > 6. <u>Music:</u> Listen to the song. (Please note that some browsers may not support the audio functionality
				to play the song.) </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Songs are music performed by K.K. Slider. Once the player has gotten their island to a 
				3-star rating from talking to Isabelle, K.K. Slider will be invited the next day to your island. Afterwards, he will show
				up every Saturday (or the day after if there is an event Saturday) on the island plaza. You can get an album of the first song
				you request from him in your inventory and the credits will play with that K.K. Slider song playing. </h5>
				<h5 className='indent'> Once you have acquired a song from K.K. Slider, you can play that music in a music-player related
					item. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the songs currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the songs
				you want. (Please note that table sorting and filtering by column does not exist
				on mobile format. However, there is a universal search bar that can search every column instead.)
				The meaning of each column is explained below. </h5>
				<br/>
				    <BrowserView>
						<div className="indentall">
							{about2()}
						</div>
					</BrowserView>
					
					<MobileView>
						{about2()}
					</MobileView>
				<br/>
				<h3 className='indent'><b> Fun Charts </b></h3>
				<hr/>
				<h5 className='indent'> For certain columns that have common attributes, graphs were made to visualize how many types
				of each attribute exist in the table. Click on the Fun Charts tab above to see the visualizations. 
				(Note: some graphs may not be viewable on mobile.) </h5>
				<br/>
			</div>
			)
		}
		
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <div style={{display: 'flex', justifyContent: 'center'}}>
				  <img src={process.env.PUBLIC_URL + '/songs.png'} class="card-img" alt="Songs" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>

				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">

				  
				  <Tab eventKey="table" title="Table">		
				<BrowserView>
					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ songs }
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
					  data={ songs }
					  columns={ mobilecol }
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
				</Tab>
				<Tab eventKey="charts" title="Fun Charts">
				<div class="border border-success">
					<h3 className='text-center'> Songs By Orderability </h3>
					<div style={{display: 'flex', justifyContent: 'center'}}>
							<PieChart data={[
								{ title: 'Yes', value: res.Yes, color: '#add8e6' },
								{ title: 'No', value: res.No, color: '#FFC0CB' },
							  ]}
							animate
							label={({ dataEntry }) => (dataEntry.value + " " + dataEntry.title + " (" + Math.round(dataEntry.percentage) + '%)')}
							style={{maxHeight: '500px', maxWidth: '500px'}}
							labelStyle={{
								...defaultLabelStyle,
							}}
							/>
						</div>
						<br/>
					</div>
				</Tab>
								  <Tab eventKey="about" title="About">
				    <BrowserView>
						<div className="frontpagepadding">
							{about()}
						</div>
					</BrowserView>
					
					<MobileView>
						{about()}
					</MobileView>
				  </Tab>
			  </Tabs>
			</div>
        )
    }
}


export default Songs;
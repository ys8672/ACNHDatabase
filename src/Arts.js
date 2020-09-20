import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ShowMoreText from 'react-show-more-text';
import { PieChart } from 'react-minimal-pie-chart';
import { Tabs, Tab } from 'react-bootstrap';

const TITLE = 'AC:NH Art'

class Arts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arts: []
        }
    }

    componentDidMount() {
        fetch('/api/art/').then(r => r.json()).then(art_data => {
            this.setState({arts: art_data.arts})
        })

    }

    render() {
		//chart stuff
		const data = this.state.arts
		
		let isInteractiveList = data.reduce(function(obj, v) {
		  obj[v.hasFake] = (obj[v.hasFake] || 0) + 1;
		  return obj;
		}, {})
		
		const defaultLabelStyle = {
		  fontSize: '5px',
		  fontFamily: 'sans-serif',
		};
		
		//table stuff
		function nameFormatter(cell, row) {
            return (
                <b className="capitalize"><Link to={{pathname: `/art/${row.id}/`}}>{cell}</Link></b> 
            );
        }
		
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt=""
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }

		function fakeFormatter(cell, row) {
			if(cell === true){
				return ("Yes")
			}
			return ("No")
		}
		
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
		
		const selectFake= {
			true: 'Yes',
			false: 'No'
		};
		
		const selectBuyPrice= {
			'4980': '4980',		
		};
		
		const selectSellPrice= {
			'1245': '1245'
		};
				
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
		
        const {arts} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Art Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'image',
                text: 'Art Image',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'hasFake',
                text: 'Has Fake Version?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: fakeFormatter,
				filter: selectFilter({
					options: selectFake
				})
            }, {
                dataField: 'buyPrice',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectBuyPrice[cell],
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
                dataField: 'museum',
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
		
		//mobile functions
		const { SearchBar } = Search;
		const {mobilecolumns} = {
            mobilecolumns: [{
                dataField: 'name',
                text: 'Art Name',
				formatter: (cell, row) => {
					return(
						<h5><b>Art Name: <Link to={{pathname: `/art/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b></h5>
					);
				},
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Art Image',
                searchable: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'hasFake',
                text: 'Has Fake Version?',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Has Fake Version?: </b> {fakeFormatter(cell, row)} </div>
					);
				}
			},{
                dataField: 'buyPrice',
                text: 'Purchase Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Purchase Price: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'sellPrice',
                text: 'Sell Price',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Sell Price: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'museum',
                text: 'Museum Description',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Museum Description: </b> {cell} </div>
					);
				}
            }, {
                dataField: 'id',
                text: 'ID',
                sort: true,
                hidden: true,
				searchable: false
            }
            ]
        }
		
		//about
		function about2(){
			return(
			<div>
				<h5 > 1. <u>Art Name:</u> The name of the art piece when you select it in your inventory. Please note that although
				these art pieces are all drawn by real life artists and all have another offical name in real life, the game does not refer 
				to them as such in the inventory. </h5>
				<h5 > 2. <u>Art Image:</u> The image of the art piece. </h5>
				<h5 > 3. <u>Has Fake Version?:</u> When you purchase art pieces from Jolly Redd, some art pieces have fake versions.
				Fake art pieces cannot be donated to the museum nor sold at Nook's Cranny. These fakes usually have a small difference between 
				the real versions, and you can take a closer look before purchasing to make sure the art piece is authentic. </h5>
				<h5 > 4. <u>Purchase Price:</u> The number of bells needed to buy the art piece from Jolly Redd. </h5>
				<h5 > 5. <u>Sell Price:</u> The number of bells you can sell the art piece in Nook's Cranny. </h5>
				<h5 > 6. <u>Museum Description:</u> After the art piece is successfully donated to the museum, a description of the 
				art piece will appear near the art exhibit, and this column will tell you what it says for a certain art piece. </h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Added on April 23th, 2020 as part of the Earth Day Update (Version 1.2.0), art pieces are either
				paintings or sculptures that can be purchased from Jolly Redd and donated to Blather's museum. </h5>
				<h5 className='indent'> When you first meet Redd, he can be found wandering your island, where he will give you an authentic art piece. 
				Afterwards, Jolly Redd will occasionally appear on your secret northern beach on a boat. He will always sell 4 art pieces and
				2 pieces of furniture. You can only purchase one art piece per day, and the painting will be sent to your mailbox the next day. Be
				careful though, the art pieces can be forgeries. Forged art pieces cannot be donated to the museum and cannot be sold. </h5>
				<h5 className='indent'> Fun Trivia: Villagers can occasionally gift you art pieces in the mail. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the art pieces currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the art pieces
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
				  <img src={process.env.PUBLIC_URL + '/art.png'} class="card-img" alt="Art" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				
				<Tabs defaultActiveKey="about" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">
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
				  
				  <Tab eventKey="table" title="Table">		
		
					<BrowserView>

						<BootstrapTable
							bootstrap4
							keyField = "id"
							data={ arts }
							columns={ columns }
							striped
							pagination={ paginationFactory( {sizePerPage: 25} ) }
							defaultSorted={ defaultSorted } 
							filter={ filterFactory() }
							
						/>
					</BrowserView>
					
					<MobileView>
						<ToolkitProvider
						  keyField="id"
						  data={ arts }
						  columns={ mobilecolumns }
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
							<h3 className='text-center'> Art By Fakes </h3>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<PieChart 
								data={[
									{ title: 'Has Fake Version', value: isInteractiveList.true, color: '#add8e6' },
									{ title: 'No Fake Version', value: isInteractiveList.false, color: '#FFC0CB' },
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
				</Tabs>
			</div>
        )
    }
}


export default Arts;
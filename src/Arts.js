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
                text: 'Art Photo',
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
						<h5><b>Name: <Link to={{pathname: `/art/${row.id}/`}}><div className="capitalize">{cell}</div></Link></b></h5>
					);
				},
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Art Photo',
                searchable: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
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
						<div><b>Museum Description: </b> {truncate(cell, row)} </div>
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
	
        return (
            <div>
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>

                <div style={{display: 'flex', justifyContent: 'center'}}>
				  <img src={process.env.PUBLIC_URL + '/art.png'} class="card-img" alt="Art" 
					style={{maxHeight: '300px', maxWidth: '300px'}}/>
				</div>
				
				<Tabs defaultActiveKey="table" id="uncontrolled-tab-example" mountOnEnter = 'true' class="nav nav-tabs justify-content-center">
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
import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import {BrowserView, MobileView} from "react-device-detect";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { PieChart } from 'react-minimal-pie-chart';
import { Tabs, Tab } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

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
		//chart stuff
		const data = this.state.clothes
		
		let villagerList = data.reduce(function(obj, v) {
		  obj[v.villager] = (obj[v.villager] || 0) + 1;
		  return obj;
		}, {})
		
		let sourceSheetChart = data.reduce(function(obj, v) {
		  obj[v.sourceSheet] = (obj[v.sourceSheet] || 0) + 1;
		  return obj;

		}, {})
		let sourceSheetList = []
		for (const key in sourceSheetChart) {
			let tmp = {label: key, value: sourceSheetChart[key]}
			sourceSheetList.push(tmp)
		}
		
		let sourceChart = data.reduce(function(obj, v) {
		  var newString = (v.source).replace(/\s*\(.*?\)\s*/g, '').replace(/[()]/g, '');
		  obj[newString] = (obj[newString] || 0) + 1;
		  return obj;

		}, {})
		let sourceList = []
		for (const key in sourceChart) {
			let tmp = {label: key, value: sourceChart[key]}
			sourceList.push(tmp)
		}
		
		let seasonalChart = data.reduce(function(obj, v) {
		  obj[v.seasonal] = (obj[v.seasonal] || 0) + 1;
		  return obj;

		}, {})
		let seasonalList = []
		for (const key in seasonalChart) {
			let tmp = {label: key, value: seasonalChart[key]}
			seasonalList.push(tmp)
		}
		
		const defaultLabelStyle = {
		  fontSize: '5px',
		  fontFamily: 'sans-serif',
		};
		
		//table stuff
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
		
		const selectTheme = {
			'comfy': 'Comfy',
			'everyday': 'Everyday',
			'fairy tale': 'Fairy Tale',
			'formal': 'Formal',
			'goth': 'Goth',
			'outdoorsy': 'Outdoorsy',
			'party': 'Party',
			'sporty': 'Sporty',
			'theatrical': 'Theatrical',
			'vacation': 'Vacation',
			'work': 'Work'
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
                text: 'Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter({placeholder: 'Search'})
            },{
                dataField: 'image',
                text: 'Image',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'sourceSheet',
                text: 'Type',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSourceSheet,
					placeholder: 'All'
				})
			},{
                dataField: 'buy',
                text: 'Purchase Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: buyFormatter,
				filter: numberFilter({placeholder: 'Number'})

			},{
                dataField: 'sell',
                text: 'Sell Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter({placeholder: 'Number'})
			},{
                dataField: 'source',
                text: 'Source',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSource,
					comparator: Comparator.LIKE,
					placeholder: 'All'
				})
			},{
                dataField: 'seasonal',
                text: 'Seasons Available',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSeasonal,
					placeholder: 'All'
				})
			},{
                dataField: 'villager',
                text: 'Villager Wearable?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: booleanFormatter,
				filter: selectFilter({
					options: selectBoolean,
					placeholder: 'All'
				})
			},{
                dataField: 'themes',
                text: 'Themes',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectTheme,
					comparator: Comparator.LIKE,
					placeholder: 'All'
				}),
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
				filter: textFilter({placeholder: 'Search'}),
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
						<div><b>Type: </b> {cell} </div>
					);
				}
			},{
                dataField: 'buy',
                text: 'Price to Buy',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Purchase Price: </b> {buyFormatter(cell, row)} </div>
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
						<div><b>Sell Price: </b> {cell} </div>
					);
				}
			},{
                dataField: 'source',
                text: 'How To Acquire',
				align: "center",
				headerAlign: 'center',
				formatter: (cell, row) => {
					return(
						<div><b>Source: </b> {cell} </div>
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
		
		//about
		function about2(){
			return(
			<div>
				<h5 > 01. <u>Name:</u> The name of the clothing as described in the inventory. </h5>
				<h5 > 02. <u>Image:</u> The picture of the clothing as seen when the player wears it. (Please note
				that the different variations of a cloth will be displayed every few seconds, so the picture can change.) </h5>
				<h5 > 03. <u>Type:</u> The type of clothing. </h5>
				<h5 > 04. <u>Purchase Price:</u> The cost of the cloth in bells at Nook's Cranny. </h5>
				<h5 > 05. <u>Sell Price:</u> The number of bells you receive for selling the cloth at Nook's Cranny. </h5>
				<h5 > 06. <u>Source:</u> Where you can find the article of clothing. </h5>
				<h5 > 07. <u>Seasons Available:</u> The seasons you can find this article of clothing. </h5>
				<h5 > 08. <u>Villager Wearable?:</u> When the player gifts a villager a clothing item, some clothes can
					be worn by the villagers while some cannot. The villager will immediately equip the clothing if they can.</h5>
				<h5 > 09. <u>Themes:</u> Themes of your clothing that can be useful when Label visits your village and
					requests you to dress in a certain theme for Label's rewards. </h5>
				<h5 > 10. <u>Variations:</u> The different types of colors available for this type of cloth. The image column
					will switch variations of a clothing every few seconds if variations exist.</h5>
			</div>
			)
		}
		
		function about(){
			return(
			<div>
				<br/>
				<h3 className='indent'><b> About </b></h3>
				<hr/>
				<h5 className='indent'> Clothes, or known as Fashion Items in your inventory, are items you can equip to change your
					villager's outer appearance. The player has 9 slots to equip clothes, and can even make their own cloth design on 
					the Nook Phone. </h5>
				<br/>
				<h3 className='indent'><b> Table </b></h3>
				<hr/>
				<h5 className='indent'> Click on the Table tab above to go see all the clothes currently available in Animal Crossing: New Horizons. You can sort
				each column in the table in ascending or descending order, or search/filter each column to better help you find the clothes
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
				  <img src={process.env.PUBLIC_URL + '/clothing.png'} class="card-img" alt="Clothing" 
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
							data={ clothes }
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
					
					</Tab>

				  <Tab eventKey="charts" title="Fun Charts">
						<div class="border border-success">
							<h3 className='text-center'> Clothes By Villager Wearable? </h3>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<PieChart 
								data={[
									{ title: 'Yes', value: villagerList.true, color: '#add8e6' },
									{ title: 'No', value: villagerList.false, color: '#FFC0CB' },
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

					<div class="border border-success">
					  <h3 className='text-center'> Clothes By Type </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart
							graph={{
								zoom: 1.0,
							}}
							width={750}
							height={600}
							padding={1} // optional value, number that set the padding between bubbles
							showLegend={true} // optional value, pass false to disable the legend.
							legendPercentage={20} // number that represent the % of with that legend going to use.
							valueFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							labelFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							data={sourceSheetList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>

					<div class="border border-success">
					  <h3 className='text-center'> Clothes By Source </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={1000}
							height={800}
							padding={1} // optional value, number that set the padding between bubbles
							showLegend={true} // optional value, pass false to disable the legend.
							legendPercentage={20} // number that represent the % of with that legend going to use.
							legendFont={{
								family: 'Arial',
								size: 12,
								color: '#000',
								weight: 'bold',
							}}
							valueFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							labelFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							data={sourceList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
					
					<div class="border border-success">
					  <h3 className='text-center'> Clothes By Seasonal Availability </h3>
					  <div style={{display: 'flex', justifyContent: 'center'}}>
							<BrowserView>
							<BubbleChart 
							graph={{
								zoom: 1.0,
							}}
							width={1000}
							height={800}
							padding={1} // optional value, number that set the padding between bubbles
							showLegend={true} // optional value, pass false to disable the legend.
							legendPercentage={20} // number that represent the % of with that legend going to use.
							legendFont={{
								family: 'Arial',
								size: 12,
								color: '#000',
								weight: 'bold',
							}}
							valueFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							labelFont={{
								family: 'Arial',
								size: 16,
								color: '#ffffff',
								weight: 'bold',
							}}
							data={seasonalList}
							/>
							</BrowserView>
							
							<MobileView>
								<p className='text-center'> This chart is not viewable on mobile. Please switch to
									a non-mobile web browser. </p>
							</MobileView>
						</div>
					</div>
				  </Tab>
				</Tabs>
			</div>
        )
    }
}



export default Clothes;
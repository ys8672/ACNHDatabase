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
		
		function kitCostFormatter(cell, row) {
			if(cell === '-1'){
				return "Not Customizable"
			}
			return parseInt(cell)
		}
		
		const selectKitCost= {
			'-1': 'Not Customizable',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8'
		};
		
		const selectSize={
			'0.5x1':'0.5 x 1',
			'1x0.5':'1 x 0.5',
			'1x1':'1 x 1',
			'1x1.5':'1 x 1.5',
			'1x2':'1 x 2',
			'1.5x1.5':'1.5 x 1.5',
			'2x0.5':'2 x 0.5',
			'2x1':'2 x 1',
			'2x1.5':'2 x 1.5',
			'2x2':'2 x 2',
			'3x1':'3 x 1',
			'3x2':'3 x 2',
			'3x3':'3 x 3'
		}
		
		function sizeSort(a, b, order, dataField, rowA, rowB) {
			var sortOrder = ['0.5x1','1x0.5','1x1','1x1.5','1x2','1.5x1.5','2x0.5','2x1','2x1.5','2x2','3x1','3x2','3x3'];
			if (order === 'asc') {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			}
			return sortOrder.indexOf(b) - sortOrder.indexOf(a);			
		}
		
		const selectSource={
			'Birthday': 'Birthday',
			'Bug-Off': 'Bug-Off', 
			'Bunny Day': 'Bunny Day', 
			'C.J.': 'C.J.',
			'Crafting': 'Crafting',
			'Dodo Airlines': 'Dodo Airlines',
			'Fishing Tourney': 'Fishing Tourney',
			'Flick': 'Flick',
			'Gullivarrr': 'Gullivarrr',
			'Gulliver': 'Gulliver', 
			'HHA': 'HHA',
			'International Museum Day': 'International Museum Day',
			'Luna': 'Luna', 
			'Mom': 'Mom', 
			'Nintendo; Nook Shopping': 'Nintendo; Nook Shopping',
			'Nook Miles Shop': 'Nook Miles Shop',
			'Nook Shopping Promotion': 'Nook Shopping Promotion', 
			'Nook Shopping Seasonal': 'Nook Shopping Seasonal', 
			"Nook's Cranny": "Nook's Cranny",
			'Rover': 'Rover',
			'Starting items': 'Starting items', 
			'Wedding Season': 'Wedding Season'
		}
		
		function buyFormatter(cell, row) {
			if(cell === null){
				return "Not Buyable"
			}
			return parseInt(cell)
		}
		
		const selectCategory={
			'N/A': 'N/A',
			'Air Conditioning': 'Air Conditioning',
			'Animal': 'Animal',
			'Arch': 'Arch',
			'Audio': 'Audio',
			'Bathroom Things': 'Bathroom Things',
			'Bathtub': 'Bathtub',
			'Beauty': 'Beauty',
			'Bed': 'Bed',
			'Chair': 'Chair',
			'Chest': 'Chest',
			'Clock': 'Clock',
			'Compass': 'Compass',
			'Desk': 'Desk',
			'Dining': 'Dining',
			'Dresser': 'Dresser',
			'Easter': 'Easter',
			'Facility Decor': 'Facility Decor',
			'Fan': 'Fan',
			'Fireplace': 'Fireplace',
			'Fish': 'Fish',
			'Folk Craft Decor': 'Folk Craft Decor',
			'Game Console': 'Game Console',
			'Garden': 'Garden',
			'Heating': 'Heating',
			'Home Appliances': 'Home Appliances',
			'Hospital': 'Hospital',
			'House Door Decor': 'House Door Decor',
			'Insect': 'Insect',
			'Japanese Style': 'Japanese Style',
			'Kitchen': 'Kitchen',
			'Kitchen Things': 'Kitchen Things',
			'Lamp': 'Lamp',
			'Museum': 'Museum',
			'Musical Instrument': 'Musical Instrument',
			'Office': 'Office',
			'Outdoors Decor': 'Outdoors Decor',
			'Plants': 'Plants',
			'Playground': 'Playground',
			'Ranch': 'Ranch',
			'School': 'School',
			'Screen': 'Screen',
			'Sculpture': 'Sculpture',
			'Seaside': 'Seaside',
			'Seasonal Decor': 'Seasonal Decor',
			'Sewing Table': 'Sewing Table',
			'Shelf': 'Shelf',
			'Shop': 'Shop',
			'Sofa': 'Sofa',
			'Space': 'Space',
			'Special Fish': 'Special Fish',
			'Special Insect': 'Special Insect',
			'Sports': 'Sports',
			'Study': 'Study',
			'Supplies': 'Supplies',
			'TV': 'TV',
			'Table': 'Table',
			'Toilet': 'Toilet',
			'Toy': 'Toy',
			'Vehicle': 'Vehicle',
			'Work Bench': 'Work Bench'
		}
		
		function emptyFormatter(cell, row) {
			if(cell === ''){
				return "N/A"
			}
			return cell
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
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
                text: 'Item Image',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
			},{
                dataField: 'canCustomize',
                text: 'Customizable?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: booleanFormatter,
				filter: selectFilter({
					options: selectBoolean
				})
			},{
                dataField: 'kitCost',
                text: 'Customization Kit Cost',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: kitCostFormatter,
				filter: selectFilter({
					options: selectKitCost
				})
			},{
                dataField: 'size',
                text: 'Size of Item',
                sort: true,
				sortFunc: sizeSort,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSize
				})
			},{
                dataField: 'source',
                text: 'How to Acquire',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSource
				})
			},{
                dataField: 'isInteractive',
                text: 'Interactable?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: booleanFormatter,
				filter: selectFilter({
					options: selectBoolean
				})
			},{
                dataField: 'buyPrice',
                text: 'Price to Buy',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter(),
				formatter: buyFormatter
			},{
                dataField: 'sellPrice',
                text: 'Price to Sell',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter()
			},{
                dataField: 'category',
                text: 'Category',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
				filter: selectFilter({
					options: selectCategory
				})
			},{
                dataField: 'variant',
                text: 'List of Variants',
                sort: false,
				align: "center",
				headerAlign: 'center',
				formatter: emptyFormatter,
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
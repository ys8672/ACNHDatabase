import React from 'react'
import {Link} from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
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
                <b className="capitalize"><Link to={{pathname: `/recipes/${row.id}`}}>{cell}</Link></b> 
            );
        }
		
		function colorFormatter(cell, row) {
            return (
                <p className="capitalize">{cell}</p> 
            );
        }
		
		const selectBuyPrice={
			'Not Purchasable': 'Not Purchasable',
			'280 bells': '280 bells',
			'300 bells': '300 bells',
			'500 bells': '500 bells',
			'800 Nook Miles': '800 Nook Miles',
			'1000 Nook Miles': '1000 Nook Miles',
			'1500 Nook Miles': '1500 Nook Miles',
			'2000 Nook Miles': '2000 Nook Miles',
			'3000 Nook Miles': '3000 Nook Miles',
			'5000 Nook Miles': '5000 Nook Miles'
		}
		
		function buyPriceSort(a, b, order, dataField, rowA, rowB) {
			var sortOrder = ['Not Available','280 bells','300 bells','500 bells','800 Nook Miles',
				'1000 Nook Miles','1500 Nook Miles','2000 Nook Miles','3000 Nook Miles','5000 Nook Miles'];
			if (order === 'asc') {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			}
			return sortOrder.indexOf(b) - sortOrder.indexOf(a);			
		}
		
		const selectSellPrice={
			'200': '200'
		}
				
		const selectSource={
			'5-star town evaluation': '5-star town evaluation',
			'All Villagers': 'All Villagers',
			'All Villagers (while stung)': 'All Villagers (while stung)',
			'All Villagers, Tom Nook': 'All Villagers, Tom Nook',
			'All villagers': 'All villagers',
			'Balloons': 'Balloons',
			'Balloons, Isabelle': 'Balloons, Isabelle',
			'Big Sister villagers': 'Big Sister villagers',
			'Big Sister villagers, Tom Nook': 'Big Sister villagers, Tom Nook',
			"Blathers, Nook's Cranny": "Blathers, Nook's Cranny",
			'Breaking 100 axes': 'Breaking 100 axes',
			'Celeste': 'Celeste',
			'Collecting earth eggs': 'Collecting earth eggs',
			'Collecting leaf eggs': 'Collecting leaf eggs',
			'Collecting sky eggs': 'Collecting sky eggs',
			'Collecting stone eggs': 'Collecting stone eggs',
			'Collecting water eggs': 'Collecting water eggs',
			'Collecting wood eggs': 'Collecting wood eggs',
			'Completing bug Critterpedia': 'Completing bug Critterpedia',
			'Completing fish Critterpedia': 'Completing fish Critterpedia',
			'Cranky villagers': 'Cranky villagers',
			'Cyrus': 'Cyrus',
			'DIY for Beginners': 'DIY for Beginners',
			'Digging up clams': 'Digging up clams',
			'Egg bottle, Egg balloon': 'Egg bottle, Egg balloon',
			'Fishing': 'Fishing',
			'Harvey': 'Harvey',
			'Helping Gulliver 30 times': 'Helping Gulliver 30 times',
			'Jock villagers': 'Jock villagers',
			'Jock villagers, Tom Nook': 'Jock villagers, Tom Nook',
			'Lazy villagers': 'Lazy villagers',
			'Lazy villagers, Tom Nook': 'Lazy villagers, Tom Nook',
			'Learning all egg outfit DIYs': 'Learning all egg outfit DIYs',
			'Nook Miles Exchange': 'Nook Miles Exchange',
			"Nook's Cranny": "Nook's Cranny",
			'Normal villagers': 'Normal villagers',
			'Normal villagers, Tom Nook': 'Normal villagers, Tom Nook',
			'Pascal': 'Pascal',
			'Peppy villagers': 'Peppy villagers',
			'Peppy villagers, Tom Nook': 'Peppy villagers, Tom Nook',
			'Pretty Good Tools Recipes': 'Pretty Good Tools Recipes',
			'Shooting 300 balloons': 'Shooting 300 balloons',
			'Smug villagers': 'Smug villagers',
			'Snooty villagers': 'Snooty villagers',
			'Snowboy': 'Snowboy',
			'Test Your DIY Skills': 'Test Your DIY Skills',
			'Test Your DIY Skills, Tom Nook': 'Test Your DIY Skills, Tom Nook',
			'Tom Nook': 'Tom Nook',
			'Tom Nook, Big Sister villagers': 'Tom Nook, Big Sister villagers',
			'Tom Nook, Cranky villagers': 'Tom Nook, Cranky villagers',
			'Tom Nook, Lazy villagers': 'Tom Nook, Lazy villagers',
			"Tom Nook, Nook's Cranny": "Tom Nook, Nook's Cranny",
			'Tom Nook, Normal villagers': 'Tom Nook, Normal villagers',
			'Tom Nook, Peppy villagers': 'Tom Nook, Peppy villagers',
			'Tom Nook, Smug villagers': 'Tom Nook, Smug villagers',
			'Tom Nook, Snooty villagers': 'Tom Nook, Snooty villagers',
			'Wildest Dreams DIY': 'Wildest Dreams DIY',
			'Zipper': 'Zipper'
		}
		
		const selectRecipesToUnlock={
			'0': '0',
			'50': '50',
			'100': '100',
			'200': '200'
		}
		
		const selectCategory={
			'Dress-Up': 'Dress-Up',
			'Equipment': 'Equipment',
			'Floors': 'Floors',
			'Housewares': 'Housewares',
			'Miscellaneous': 'Miscellaneous',
			'Other': 'Other',
			'Rugs': 'Rugs',
			'Tools': 'Tools',
			'Wall-mounted': 'Wall-mounted',
			'Wallpaper': 'Wallpaper'
		}
		
		const selectColor={
			'beige': 'Beige',
			'blue': 'Blue',
			'brick': 'Brick',
			'brown': 'Brown',
			'dark gray': 'Dark Gray',
			'gold': 'Gold',
			'green': 'Green',
			'light gray': 'Light Gray',
			'No Color': 'No Color',
			'orange': 'Orange',
			'pink': 'Pink',
			'red': 'Red',
			'silver': 'Silver',
			'white': 'White',
			'yellow': 'Yellow'
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
				sortFunc: buyPriceSort,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectBuyPrice
				})
            },  {
                dataField: 'sellPrice',
                text: 'Sellling Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSellPrice
				})
            }, {
                dataField: 'source',
                text: 'Where To Find?',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectSource
				})
            }, {
                dataField: 'recipesToUnlock',
                text: 'Number of Recipes Needed to Unlock',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectRecipesToUnlock
				})
            }, {
                dataField: 'category',
                text: 'Category',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectCategory
				})
            }, {
                dataField: 'cardColor',
                text: 'Recipe Card Color',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: selectFilter({
					options: selectColor
				}),
				formatter: colorFormatter
            }, {
                dataField: 'materials',
                text: 'Materials To Craft',
                sort: false,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
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
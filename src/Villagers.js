import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
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
        fetch('/api/villagers/').then(r => r.json()).then(villager_data => {
            this.setState({villagers: villager_data.villagers})
        })

    }

    render() {
        function imageFormatter(cell, row) {
            return (
                <img className="img" src={cell} alt={"Image Not Found"}
                     style={{maxHeight: '75%', maxWidth: '75%'}}/>
            );
        }
		
		function imageFormatter2(cell, row) {
            return (
                <img className="img" src={cell} alt={"Image Not Found"}
                     style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
		function villagerFormatter(cell, row) {
            return (
                <b> {cell} </b>
            );
        }
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asce'
		}];
		
		const selectPersonality= {
			Cranky: 'Cranky',
			Jock: 'Jock',
			Lazy: 'Lazy',
			Normal: 'Normal',
			Peppy: 'Peppy',
			Smug: 'Smug',
			Snooty: 'Snooty',
			Uchi: 'Uchi'	
		};
		
		const selectSpecies= {
			Alligator: 'Alligator',
			Anteater: 'Anteater',
			Bear: 'Bear',
			Bird: 'Bird',
			Bull: 'Bull',
			Cat: 'Cat',
			Chicken: 'Chicken',
			Cow: 'Cow',
			Cub: 'Cub',
			Deer: 'Deer',
			Dog: 'Dog',
			Duck: 'Duck',
			Eagle: 'Eagle',
			Elephant: 'Elephant',
			Frog: 'Frog',
			Goat: 'Goat',
			Gorilla: 'Gorilla',
			Hamster: 'Hamster',
			Hippo: 'Hippo',
			Horse: 'Horse',
			Kangaroo: 'Kangaroo',
			Koala: 'Koala',
			Lion: 'Lion',
			Monkey: 'Monkey',
			Mouse: 'Mouse',
			Octopus: 'Octopus',
			Ostrich: 'Ostrich',
			Penguin: 'Penguin',
			Pig: 'Pig',
			Rabbit: 'Rabbit',
			Rhino: 'Rhino',
			Sheep: 'Sheep',
			Squirrel: 'Squirrel',
			Tiger: 'Tiger',
			Wolf: 'Wolf'
		};

        const {villagers} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Villager Name',
                sort: true,
				formatter: villagerFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'icon',
                text: 'Villager Icon',
                sort: false,
                formatter: imageFormatter2,
				searchable: false,
				align: "center",
				headerAlign: 'center'
            },{
                dataField: 'image',
                text: 'Villager Photo',
                sort: false,
                formatter: imageFormatter,
				searchable: false,
				align: "center",
				headerAlign: 'center'
            },  {
                dataField: 'personality',
                text: 'Personality',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectPersonality[cell],
				filter: selectFilter({
					options: selectPersonality
				})
            }, {
                dataField: 'birthday',
                text: 'Birthday',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            }, {
                dataField: 'species',
                text: 'Species',
                sort: true,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSpecies[cell],
				filter: selectFilter({
					options: selectSpecies
				})
            }, {
                dataField: 'catchPhrase',
                text: 'Catch Phrase',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
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

                <h1 className="text-center">Villagers</h1>

				<div>
					<BootstrapTable
						keyField = "id"
						data={ villagers }
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


export default Villagers;
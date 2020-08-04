import React from 'react'
import {Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter  } from 'react-bootstrap-table2-filter';
import { Helmet } from 'react-helmet'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

const TITLE = 'AC:NH Sea Creatures'

class Sea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seas: []
        }
    }

    componentDidMount() {
        fetch('/api/sea/').then(r => r.json()).then(sea_data => {
            this.setState({seas: sea_data.sea})
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
                <img className="img" src={cell} alt={"Image Not Found"}
                     style={{maxHeight: '100%', maxWidth: '100%'}}/>
            );
        }
		
		function switchMonth(month){
			switch(month){
				case 1:
					month = "January";
					break;
				case 2:
					month = "February";
					break;
				case 3:
					month = "March";
					break;
				case 4:
					month = "April";
					break;
				case 5:
					month = "May";
					break;
				case 6:
					month = "June";
					break;
				case 7:
					month = "July";
					break;
				case 8:
					month = "August";
					break;
				case 9:
					month = "September";
					break;
				case 10:
					month = "October";
					break;
				case 11:
					month = "November";
					break;
				case 12:
					month = "December";
			}
			return month;
		}
		
		function monthFormatter(cell, row){
			if (cell === ""){
				return "All Year"
			}
			else if (cell.includes("&")){
				var field = cell.split("&");
				var monthOne = (field[0]).split("-");
				var monthTwo = (field[1]).split("-");
				var monthOneBegin = switchMonth(parseInt(monthOne[0]));
				var monthOneEnd = switchMonth(parseInt(monthOne[1]));
				var monthTwoBegin = switchMonth(parseInt(monthTwo[0]));
				var monthTwoEnd = switchMonth(parseInt(monthTwo[1]));
				return monthOneBegin + " - " + monthOneEnd + ", " + monthTwoBegin + " - " + monthTwoEnd;
			}
			else{
				var field = cell.split("-");
				var monthBegin = switchMonth(parseInt(field[0]));
				var monthEnd = switchMonth(parseInt(field[1]));
				return monthBegin + " - " + monthEnd;
			}
		}
		
		function timeFormatter(cell, row){
			if (cell === ""){
				return "All Day";
			}	
			return cell;
		}
		
		function monthSort(a, b, order, dataField, rowA, rowB){
			if (a === ""){
				a = "1-1";
			}
			if (b === ""){
				b = "1-1";
			}
			
			if(a.includes("&") && b.includes("&")){
				//If sorted a and b both are double dates do this.
				var aField = a.split("&");
				var aMonth1 = (aField[0]).split("-");
				var aMonth2 = (aField[1]).split("-");
				var aMonth1Begin = parseInt(aMonth1[0]);
				var aMonth1End = parseInt(aMonth1[1]);
				if (aMonth1Begin > aMonth1End){
					aMonth1End += 12;
				}
				var aMonth2Begin = parseInt(aMonth2[0]);
				var aMonth2End = parseInt(aMonth2[1]);
				if (aMonth2Begin > aMonth2End){
					aMonth2End += 12;
				}
				var bField = b.split("&");
				var bMonth1 = (bField[0]).split("-");
				var bMonth2 = (bField[1]).split("-");
				var bMonth1Begin = parseInt(bMonth1[0]);
				var bMonth1End = parseInt(bMonth1[1]);
				if (bMonth1Begin > bMonth1End){
					bMonth1End += 12;
				}
				var bMonth2Begin = parseInt(bMonth2[0]);
				var bMonth2End = parseInt(bMonth2[1]);
				if (bMonth2Begin > bMonth2End){
					bMonth2End += 12;
				}
				if (order === 'asc') {
					return aMonth1Begin - bMonth1Begin || aMonth1End - bMonth1End
						|| aMonth2Begin - bMonth2Begin || aMonth2End - bMonth2End;
				}
				return bMonth1Begin - aMonth1Begin || bMonth1End - aMonth1End
					|| bMonth2Begin - aMonth2Begin || bMonth2End - aMonth2End;
			}
			
			var aField = a.split("-");
			var bField = b.split("-");
			if(a.includes("&")){
				var oneField = a.split("&");
				aField = (oneField[0]).split("-");
			}
			if(b.includes("&")){
				var twoField = b.split("&");
				bField = (twoField[0]).split("-");
			}
			var aMonthBegin = parseInt(aField[0]);
			var aMonthEnd = parseInt(aField[1]);
			var bMonthBegin= parseInt(bField[0]);
			var bMonthEnd = parseInt(bField[1]);
			if (aMonthBegin > aMonthEnd){
				aMonthEnd += 12;
			}
			if (bMonthBegin > bMonthEnd){
				bMonthEnd += 12;
			}
			if (order === 'asc') {
				return aMonthBegin - bMonthBegin || aMonthEnd - bMonthEnd;
			}
			return bMonthBegin - aMonthBegin || bMonthEnd - aMonthEnd;
		}
		
		function timeSort(a, b, order, dataField, rowA, rowB){
			if (a === ""){
				a = "0am - 0am";
			}
			if (b === ""){
				b = "0am - 0am";
			}
			
			var aField = a.split("-");
			var bField = b.split("-");
			if(a.includes("&")){
				var oneField = a.split("&");
				aField = (oneField[0]).split("-");
			}
			if(b.includes("&")){
				var twoField = b.split("&");
				bField = (twoField[0]).split("-");
			}
			
			var aTimeBegin = parseInt(aField[0].replace(/\D/g,''));
			var aTimeEnd = parseInt(aField[1].replace(/\D/g,''));
			var bTimeBegin= parseInt(bField[0].replace(/\D/g,''));
			var bTimeEnd = parseInt(bField[1].replace(/\D/g,''));
			if(aField[0].includes('pm')){
				aTimeBegin += 12;
			}
			if(aField[1].includes('pm')){
				aTimeEnd += 12;
			}
			if(aTimeEnd < aTimeBegin){
				aTimeBegin += 24;
			}
			if(bField[0].includes('pm')){
				bTimeBegin += 12;
			}
			if(bField[1].includes('pm')){
				bTimeEnd += 12;
			}
			if(bTimeEnd < bTimeBegin){
				bTimeBegin += 24;
			}
			if (order === 'asc') {
				return aTimeBegin - bTimeBegin || aTimeEnd - bTimeEnd;
			}
			return bTimeBegin - aTimeBegin || bTimeEnd - aTimeEnd;
		}
		
		function speedSort(a, b, order, dataField, rowA, rowB) {
			var sortOrder = ['Stationary', 'Very slow', 'Slow', 'Medium', 'Fast', 'Very fast'];
			if (order === 'asc') {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			}
			return sortOrder.indexOf(b) - sortOrder.indexOf(a);			
		}
		
		function shadowSort(a, b, order, dataField, rowA, rowB) {
			var sortOrder = ['Smallest', 'Small', 'Medium', 'Large', 'Largest'];
			if (order === 'asc') {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			}
			return sortOrder.indexOf(b) - sortOrder.indexOf(a);			
		}
		
		const selectSpeed={
			"Stationary": 'Stationary',
			"Very slow": 'Very slow',
			"Slow": 'Slow',
			"Medium": 'Medium',
			"Fast": 'Fast',
			"Very fast": 'Very fast'
		}
		
		const selectShadow={
			"Smallest": 'Smallest',
			"Small": 'Small',
			"Medium": 'Medium',
			"Large": 'Large',
			"Largest": 'Largest'
		}
		
		const defaultSorted = [{
			dataField: 'id',
			order: 'asc'
		}];
			
		function truncate(cell, row) {
		   if (cell.length > 64) {
			    var link = <Link to={{pathname:`/details`, state: {cell}}}>...</Link>;
				return (
					<div> {cell.substring(0, 64)}{link} </div>
				)
				//return cell.substring(0, 64) + "...";
		   }
		   return cell;
		};
		
        const {seas} = this.state
        const {columns} = {
            columns: [{
                dataField: 'name',
                text: 'Sea Creature Name',
                sort: true,
				formatter: nameFormatter,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'icon',
                text: 'Sea Creature Icon',
                sort: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
            },  {
                dataField: 'image',
                text: 'Sea Creature Image',
                sort: false,
                formatter: imageFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'monthNorth',
                text: 'Months Available in the Northern Hemisphere',
                sort: true,
				sortFunc: monthSort,
				formatter: monthFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'monthSouth',
                text: 'Months Available in the Southern Hemisphere',
                sort: true,
				sortFunc: monthSort,
				formatter: monthFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'time',
                text: 'Time Available',
                sort: true,
				sortFunc: timeSort,
				formatter: timeFormatter,
				align: "center",
				headerAlign: 'center'
            }, {
                dataField: 'speed',
                text: 'Movement Speed',
                sort: true,
				sortFunc: speedSort,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectSpeed[cell],
				filter: selectFilter({
					options: selectSpeed
				})
            }, {
                dataField: 'shadow',
                text: 'Sea Creature Shadow Size',
                sort: true,
				sortFunc: shadowSort,
				align: "center",
				headerAlign: 'center',
				formatter: cell => selectShadow[cell],
				filter: selectFilter({
					options: selectShadow
				})
            },{
                dataField: 'price',
                text: 'Selling Price',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: numberFilter()
            },{
                dataField: 'catchPhrase',
                text: 'Catch Phrase',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter()
            },{
                dataField: 'museumPhrase',
                text: 'Museum Description',
                sort: true,
				align: "center",
				headerAlign: 'center',
				filter: textFilter(),
				formatter: truncate
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

                <h1 className="text-center">Sea Creatures</h1>

				<div>

					<BootstrapTable
						bootstrap4
						keyField = "id"
						data={ seas }
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


export default Sea;
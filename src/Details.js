import React from 'react'
import {Link} from 'react-router-dom';


class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }
	
	componentDidMount() {
		fetch('/fish').then(data => {
			if(this.props.location.state === undefined){
				this.setState({data: 'No Information'})
			}
			else{
				this.setState({data: this.props.location.state.cell})
			}
		})
    }

    render() {
		const {data} = this.state
        return (
            <div class = "seamuseumpadding">   
				<h1 className="text-center"> <b>Full Museum Description</b> </h1>
				<br/>
				<h5 className="text-center">{data}</h5>
				<br/>
				<br/>
				<br/>
				<div class="text-center">
					<p> Click the back button to go back or <Link to={{pathname:`/`}}>return to home page</Link>. </p>					
				</div>
				<br/>
            </div>
        )
    }
}

export default Details;

import React from 'react'
import {Link} from 'react-router-dom';


class SeaMuseum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
	
	componentDidMount() {
        fetch('/sea').then(data => {
            this.setState({data: this.props.location.state.cell})
        })
    }

    render() {
		const {data} = this.state
        return (
            <div class = "seamuseumpadding">   
				<h1 className="text-center"> <b>Full Museum Description</b> </h1>
				<br/>
				<p className="text-center">{data}</p>
				<br/>
				<div class="text-center">
					<Link to={{pathname:`/sea`}}>Return To Sea Page</Link>
				</div>
				<br/>
            </div>
        )
    }
}

export default SeaMuseum;

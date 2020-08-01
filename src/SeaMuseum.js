import React from 'react'

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
            </div>
        )
    }
}

export default SeaMuseum;

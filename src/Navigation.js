import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Navigation extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-primary text-uppercase font-weight-bold">
			  <a class="navbar-brand" href="index.html">AC:NH Database</a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			  </button>
			  <div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ml-auto">
				  <li class="nav-item">
					<a class="nav-link" href="/">Home</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link disabled" href="/art">Art</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link disabled" href="/bugs">Bugs</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link disabled" href="/fish">Fish</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link disabled" href="/fossils">Fossils</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/sea">Sea</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/songs">Songs</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/villagers">Villagers</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link disabled" href="/about">About</a>
				  </li>
				</ul>
			  </div>
			</nav>
        )
    }
}

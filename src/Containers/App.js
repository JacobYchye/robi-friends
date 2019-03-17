import React from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css'
import ErrorBoundry from '../Components/ErrorBoundry';

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            robots : [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then( response => {
            return response.json()
        })
        .then(users =>{
            this.setState({ robots : users })
        })
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render(){
        const filteredRobot = this.state
        .robots
        .filter(user => {
                          return user.name.toLowerCase()
                                     .includes( this.state.searchfield.toLowerCase() )
                         })
    return !this.state.robots.length ?
             <h1>Loading</h1> : 
        (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobot} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}

export default App;
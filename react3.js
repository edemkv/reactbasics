const Card = (props) => {
	return(
  	<div  style={{margin: '1em'}}> 
    	<img width="75" src={props.url}/>
      <div style={{ display: 'inline-block', marginLeft:10 }}>
      	<div style = {{ fontSize: '1.25em', fontWeight:'bold'}}> {props.name}</div>
        <div> {props.company} </div>
      </div>
    </div>
  )
}
let datass = [
{
  name:"edem",
  url:"https://avatars2.githubusercontent.com/u/2005548?v=4",
  company:"Quicky"
},
{
  name:"made",
  url:"https://avatars2.githubusercontent.com/u/2005548?v=4",
  company:"Quicky 2.0"
}
]
const CardList = (props) => {
		return (
    	<div>
      	{props.cards.map(card => <Card {...card }/>)}
      </div>
    )

}

class Form extends React.Component {
	state = {userName: ''};
	handleSubmit = (event)=> {
  		event.preventDefault();
      console.log("form submit",this.state.userName)
      axios.get('https://api.github.com/users/' +this.state.userName)
      .then(resp => {
      	//console.log(resp)
        this.props.onSubmit(resp.data)
      })
  };

	render(){
  	return(
    	<form onSubmit={this.handleSubmit}>
      
{/*<input ref={(input)  => this.usernameInput = input} type="text" placeholder="GitHub username"/> */}
        <input value={this.state.userName} onChange={(event) => this.setState({userName : event.target.value})} type="text" placeholder="GitHub username"/>
        <button type="submit"> Add card</button>
      </form>
    )
  }
}
class App extends React.Component {
state = {cards: datass}

addNewCard = (cardInfo) => {
	//console.log(cardInfo)
  this.setState(prevState =>({
  	cards:prevState.cards.concat(cardInfo)
  }))
};

	render(){
  	return(
    <div>
    	<Form onSubmit={this.addNewCard}/>
      <CardList cards={this.state.cards}/>
    </div>
    )}
}




ReactDOM.render(<App />, mountNode)

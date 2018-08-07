import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

const Card = (props) => {
  return (
      <div style={{ margin: '1em' }}>
          <img width="75" alt="X" src={props.avatar_url} />
          <div style={{ display: 'inline-block', marginLeft: 10 }}>
              <div> {props.name} </div>
              <div> {props.company} </div>
          </div>
      </div>
  );
};

const CardList = (props) => {
  return (
      <div>
          {props.cards.map(card => <Card {...card} />)}
      </div>

  )
}

class Form extends React.Component {
    state={userName:''}

  handleSubmit=(event)=>{
  event.preventDefault();
  console.log('Event:Form Submit',this.state.userName);
  //ajax.. (fetch or axios)
 axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
      })
  };
  render() {
      return (
          <form onSubmit={this.handleSubmit}>
              <input type="text" 
            //  ref={(input)=>this.userNameInput=input} this is one way to read input data
               value={this.state.userName}
               onChange={(event)=>this.setState({userName: event.target.value})}
              placeholder="Github username" required/>
              <button type="submit">Add card </button>
          </form>
      );
  }
}


class App extends React.Component {

  state={
    cards:[
      {
        name: "mojombo",
        avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
        company: "Facebook"
    },
    {
        name: "defunkt",
        avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
        company: "Github"
    },
    ]
  };
  addNewCard=(cardInfo)=>
  {
      this.setState(prevState =>({
          cards: prevState.cards.concat(cardInfo)
      }));
  };

  render() {
      return (
          <div>
              <Form onSubmit={this.addNewCard}/>
              <CardList cards={this.state.cards}/>
          </div>
      );
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

export default App;

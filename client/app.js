var React = require("react")
var ReactDOM = require("react-dom")

var Card = React.createClass({
  getInitialState() {
    return {
      showing: false
    }
  },
  toggle() {
    this.setState({
      showing: !this.state.showing
    })
  },
  render: function() {
    var card = this.props.card;

    var classes = "card " + this.props.mode
    if (this.state.showing) {
      classes += " showing"
    }

    return (
      <div className={classes} onClick={this.toggle}>
        <div className="card-content">
          <div className="card-question">
            <div className="kanji">{card.kanji}</div>
            <div className="kana">{card.kana}</div>
          </div>
          <div className="card-answer">
            <div>{card.english}</div>
          </div>
        </div>
      </div>
    )
  }
})

var App = React.createClass({
  componentWillMount() {
      this.setState({
        decks: vocab,
        currentDeck: 0,
        mode: "ask-jp",        
      })
  },

  getInitialState: function () {
    return {  };
  },

  switchChapter: function(k) {
    this.setState({ currentDeck: k })
  },

  switchMode() {
    this.setState({ mode:  this.state.mode == "ask-jp" ? "ask-en" : "ask-jp" })
  },

  render: function () {
    if (this.state.decks.length == 0) {
      return (<div className="loading-cards"></div>)
    }


    var decks = this.state.decks.map(
      (c, k) => <button onClick={e => this.switchChapter(k)}>{"Chapter "+(k+1)}</button>
    )

    var cards = this.state.decks[this.state.currentDeck].map(
      (c, k) => <Card key={"card-"+k} card={c} mode={this.state.mode} />
    )


    return <div className="cards">
      <div className="decks">
        {decks}
      </div>
      <button onClick={this.switchMode}>Switch Mode</button>
      {cards}
    </div>;
  }
});

ReactDOM.render(<App />, document.getElementById('app'));

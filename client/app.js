var React = require("react")
var ReactDOM = require("react-dom")
var EventEmitter = require("events").EventEmitter

var events = new EventEmitter()

var Card = React.createClass({
  getInitialState() {
    return {
      showing: false
    }
  },

  componentWillMount() {
    events.on("hide", () => this.setState({ showing: false }))
    events.on("show", () => this.setState({ showing: true }))
  },

  toggle() {
    this.setState({
      showing: !this.state.showing
    })
  },

  openExamples() {
    var url = "http://tangorin.com/examples/" + this.props.card.kanji;
    window.open(url, '_blank');
  },

  render: function() {
    var card = this.props.card;

    var classes = "card " + this.props.mode
    if (this.state.showing) {
      classes += " showing"
    }

    if (card.kanji == "") {
      card.kanji = card.kana
      card.kana = ""
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
          <i className="question icon" onClick={this.openExamples}>?</i>
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
    return {
      showHiragana: false,
      showKatakana: false,
    };
  },

  switchChapter(k) {
    this.setState({ currentDeck: k })
  },

  switchMode() {
    this.setState({ mode:  this.state.mode == "ask-jp" ? "ask-en" : "ask-jp" })
  },

  hideAnswers() {
    events.emit("hide")
  },

  showAnswers() {
    events.emit("show")
  },

  toggleHiragana() {
    this.setState({ showHiragana: !this.state.showHiragana })
  },
  toggleKatakana() {
    this.setState({ showKatakana: !this.state.showKatakana })
  },
  render: function () {
    if (this.state.decks.length == 0) {
      return (<div className="loading-cards"></div>)
    }


    var decks = this.state.decks.map(
      (c, k) => <button className={this.state.currentDeck == k ? "active" : ""} onClick={e => this.switchChapter(k)}>{"Chapter "+(k+1)}</button>
    )

    var cards = this.state.decks[this.state.currentDeck].map(
      (c, k) => <Card key={"card-"+this.state.currentDeck+"-"+k} card={c} mode={this.state.mode} />
    )


    return <div>
      <div className={"backdrop " + (this.state.showHiragana || this.state.showKatakana ? "active" : "")}> </div>
      <div className="decks">
        <page-title>{"Japanese Study Cards <(^.^<)"}</page-title>
        {decks}
        <button className="kana-button" onClick={this.toggleHiragana}>Hiragana</button>
        <button className="kana-button" onClick={this.toggleKatakana}>Katakana</button>
      </div>
      <div className="controls">
        <button onClick={this.switchMode}>Reverse Questions</button>
        <button onClick={this.hideAnswers}>Hide Answers</button>
        <button onClick={this.showAnswers}>Show Answers</button>
        <span className="button-spacer"></span>
      </div>
      <div className="cards">
        {cards}
      </div>
      <div className={"hiragana-chart " + (this.state.showHiragana ? "active" : "")}>
        <div className="title">Hiragana Chart</div>
        <img src="hiragana.svg" />
        <span className="close" onClick={this.toggleHiragana}>X</span>
      </div>
      <div className={"katakana-chart " + (this.state.showKatakana ? "active" : "")}>
        <div className="title">Katakana Chart</div>
        <img src="katakana.svg" />
        <span className="close" onClick={this.toggleKatakana}>X</span>
      </div>
    </div>;
  }
});

ReactDOM.render(<App />, document.getElementById('app'));

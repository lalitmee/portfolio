import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
  }

  componentDidMount() {
    axios.get('quotes.json').then(data => {
      this.setState({
        quotes: data.data.quotes
      });
    });
  }

  render() {
    const {quotes} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 15000,
      initialSlide: Math.floor(Math.random(quotes.length) * 100)
    };
    return (
      <div className="quotes-wrapper" id="quotes">
        <Paper className="quotes-wrapper-paper" elevation={1}>
          <Slider {...settings}>
            {quotes.map((item, i) => (
              <div className="quote" key={i}>
                <div className="quotes-text">{item.quote}</div>
                <div className="quotes-writer">- {item.author}</div>
              </div>
            ))}
          </Slider>
        </Paper>
      </div>
    );
  }
}

export default Quotes;

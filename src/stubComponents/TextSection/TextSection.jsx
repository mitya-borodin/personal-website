import withStyles from 'HOC/withStyles';
import Component from 'inferno-component';
import propTypes from 'prop-types';
import s from './TextSection.css';

class TextSection extends Component {
  static propTypes = {
    title: propTypes.string,
    body: propTypes.string,
  };

  render () {
    const {
      title = 'About Me',
      body = `Hello! My name is Dmitry. I leave in Kazan, Russia (GMT +03:00)
              I’m looking for a job with wage about $3 500 per month.
              I’m ready for remote work.`
    } = this.props;

    return (
      <section className={ s.root }>
        <h1>{ title.toUpperCase() }</h1>
        <p>{ body }</p>
      </section>
    );
  }
}

export default withStyles(s)(TextSection);
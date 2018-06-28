import Section from 'app/components/section';
import Transition__Content from './__content';

class Transition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      currentTransaction: null,
    };
  }

  componentWillMount() {
    if (this.props.transactions.length > 0) {
      this.setState({ currentTransaction: this.props.transactions[0] });
    }
  }

  render() {
    const { currentTransaction } = this.state;

    if (!currentTransaction) return null;

    const { request, response, attributes } = currentTransaction;
    const { method, uri } = attributes;
    return (
      <Section
        title={`Структура ответов на запрос ${method} ${uri}`}
        titleTag="h4"
        mix={[b('transition', { mods: { type: method.toLowerCase() } })]}
        mods={{ hiddenTitle: true }}
      >
        <p className="transition__definition">
          <span className="transition__method">{method.toUpperCase()}</span>
          {' '}
          {uri}
        </p>

        <Transition__Content data={request} contentType={'Requests'}/>
        <Transition__Content data={response} contentType={'Responses'}/>
      </Section>
    );
  }
}

Transition.defaultProps = {
  transactions: [],
};

Transition.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      request: PropTypes.object,
      response: PropTypes.object,
      attributes: PropTypes.object,
    })
  ),
};

export default Transition;

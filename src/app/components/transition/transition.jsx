import URL from 'url-parse';

import Section from 'app/components/section';
import Transition__Content from './__content';

const highlightQuery = queryObj => (
  Object.keys(queryObj).map(qKey => {
    const key = `<span class="hljs-attr">${qKey}</span>`;
    const value = `<span class="hljs-literal">${queryObj[qKey]}</span>`;
    return `${key}=${value}`;
  }).join('&')
);

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
    const { pathname, query } = new URL(uri, true);
    const formattedQuery = highlightQuery(query);
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
          {pathname}
          {'?'}
          <span dangerouslySetInnerHTML={{ __html: formattedQuery }}/>
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

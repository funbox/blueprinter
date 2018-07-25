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

    this.transitionAttributes = {};

    this.availableRequests = [];
    this.availableResponses = [];
  }

  componentWillMount() {
    const { attributes, transactions } = this.props;

    if (attributes.href && attributes.method) {
      Object.assign(this.transitionAttributes, attributes);
    }

    if (transactions.length > 0) {
      this.availableRequests = transactions.reduce((reqArray, transaction) => {
        if (transaction.request) reqArray.push(transaction.request);

        return reqArray;
      }, []);
      this.availableResponses = transactions.reduce((respArray, transaction) => {
        if (transaction.response) respArray.push(transaction.response);

        return respArray;
      }, []);

      this.setState({
        selectedRequest: this.availableRequests[0],
        selectedResponse: this.availableResponses[0],
      });
    }
  }

  render() {
    const {
      selectedRequest,
      selectedResponse,
    } = this.state;

    if (!selectedRequest && !selectedResponse) return null;

    const { method, href } = this.transitionAttributes;
    const { pathname, query } = new URL(href, true);
    const formattedQuery = highlightQuery(query);
    return (
      <Section
        title={`Структура ответов на запрос ${method} ${href}`}
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

        <Transition__Content
          availableData={this.availableRequests}
          selectedData={selectedRequest}
          contentType="request"
          title="Requests"
        />
        <Transition__Content
          availableData={this.availableResponses}
          selectedData={selectedResponse}
          contentType="response"
          title="Responses"
        />
      </Section>
    );
  }
}

Transition.defaultProps = {
  transactions: [],
  attributes: {
    href: '',
    method: '',
  },
};

Transition.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      request: PropTypes.object,
      response: PropTypes.object,
    })
  ),
  attributes: PropTypes.shape({
    href: PropTypes.string,
    method: PropTypes.string,
  }),
};

export default Transition;

import URL from 'url-parse';
import formatHref from 'app/common/utils/helpers/formatHref';

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
      selectedRequest: null,
      selectedResponse: null,
    };

    this.transitionAttributes = {
      href: '',
      method: '',
    };

    this.availableRequests = [];
    this.availableResponses = [];

    this.onRequestOptionLabelClick = this.onRequestOptionLabelClick.bind(this);
    this.onResponseOptionLabelClick = this.onResponseOptionLabelClick.bind(this);
  }

  componentWillMount() {
    const { attributes, transactions } = this.props;

    if (attributes.href && attributes.method) {
      Object.assign(this.transitionAttributes, attributes);
    }

    if (transactions.length > 0) {
      this.availableRequests = transactions.reduce((reqArray, transaction) => {
        if (Object.values(transaction.request).some(value => !!value)) {
          reqArray.push(transaction.request);
        }

        return reqArray;
      }, []);
      this.availableResponses = transactions.reduce((respArray, transaction) => {
        if (Object.values(transaction.response).some(value => !!value)) {
          respArray.push(transaction.response);
        }

        return respArray;
      }, []);

      this.setState({
        selectedRequest: this.availableRequests[0],
        selectedResponse: this.availableResponses[0],
      });
    }
  }

  onRequestOptionLabelClick(labelId) {
    const selectedRequest = this.availableRequests[labelId];
    this.setState({ selectedRequest });
  }

  onResponseOptionLabelClick(labelId) {
    const selectedResponse = this.availableResponses[labelId];
    this.setState({ selectedResponse });
  }

  render() {
    const {
      selectedRequest,
      selectedResponse,
    } = this.state;

    if (!selectedRequest && !selectedResponse) return null;

    const { method, href, hrefVariables } = this.transitionAttributes;
    const formattedHref = hrefVariables ? formatHref(href, hrefVariables) : href;

    const { pathname, query } = new URL(formattedHref, true);
    const formattedQuery = highlightQuery(query);
    return (
      <Section
        title={`Структура ответов на запрос ${method} ${href}`}
        titleTag="h4"
        mix={[b('transition', { mods: { ...this.props.mods, type: method.toLowerCase() } })]}
        mods={{ hiddenTitle: true }}
      >
        <p className="transition__definition">
          <span className="transition__method">{method.toUpperCase()}</span>
          {' '}
          {pathname}
          {!!formattedQuery && '?'}
          <span className="transition__query" dangerouslySetInnerHTML={{ __html: formattedQuery }}/>
        </p>

        <Transition__Content
          availableData={this.availableRequests}
          selectedData={selectedRequest}
          contentType="request"
          title="Requests"
          onLabelClick={this.onRequestOptionLabelClick}
        />
        <Transition__Content
          availableData={this.availableResponses}
          selectedData={selectedResponse}
          contentType="response"
          title="Responses"
          onLabelClick={this.onResponseOptionLabelClick}
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
  mods: {},
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
  mods: PropTypes.object,
};

export default Transition;

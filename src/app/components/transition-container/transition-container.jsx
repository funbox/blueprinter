import { Fragment } from 'react';
import Transition from 'app/components/transition';

const TransitionContainer = (props) => {
  let availableRequests = [];
  let availableResponses = [];
  const {
    transactions,
    transitionProps = {},
  } = props;

  if (transactions.length > 0) {
    availableRequests = transactions.reduce((reqArray, transaction) => {
      if (Object.values(transaction.request).some(value => !!value)) {
        reqArray.push(transaction.request);
      }

      return reqArray;
    }, []);
    availableResponses = transactions.reduce((respArray, transaction) => {
      if (Object.values(transaction.response).some(value => !!value)) {
        respArray.push(transaction.response);
      }

      return respArray;
    }, []);
  }

  return (
    <Fragment>
      {
        availableRequests.length > 0 && (
          <Transition
            title="Requests"
            contentType="request"
            availableTransactions={availableRequests}
            {...transitionProps}
          />
        )
      }

      {
        availableResponses.length > 0 && (
          <Transition
            title="Responses"
            contentType="response"
            availableTransactions={availableResponses}
            {...transitionProps}
          />
        )
      }
    </Fragment>
  );
};

TransitionContainer.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      request: PropTypes.object,
      response: PropTypes.object,
    }),
  ),
  transitionProps: PropTypes.object,
};

export default TransitionContainer;

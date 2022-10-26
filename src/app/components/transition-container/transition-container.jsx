import { t } from '@lingui/macro';
import Transition from 'app/components/transition';

import ViewContext from 'app/components/app/view-context';

const TransitionContainer = (props) => {
  const {
    requests,
    responses,
    transitionProps = {},
  } = props;

  return (
    <>
      {
        requests.length > 0 && (
          <ViewContext.Consumer>
            {value => (
              <Transition
                mods={{
                  view: value,
                }}
                title={t`Requests`}
                contentType="request"
                availableTransactions={requests}
                {...transitionProps}
              />
            )}
          </ViewContext.Consumer>
        )
      }

      {
        responses.length > 0 && (
          <ViewContext.Consumer>
            {value => (
              <Transition
                mods={{
                  view: value,
                }}
                title={t`Responses`}
                contentType="response"
                availableTransactions={responses}
                {...transitionProps}
              />
            )}
          </ViewContext.Consumer>
        )
      }
    </>
  );
};

TransitionContainer.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object),
  responses: PropTypes.arrayOf(PropTypes.object),
  transitionProps: PropTypes.object,
};

TransitionContainer.defaultProps = {
  requests: [],
  responses: [],
  transitionProps: {},
};

export default TransitionContainer;

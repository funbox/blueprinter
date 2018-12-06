import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import ActionCard from 'app/components/action-card';
import { get, htmlFromText, withHeaderAnchors } from 'app/common/utils/helpers';
import { hashFromTitle, combineHashes } from 'app/common/utils/helpers/hash';
import Resource__Action from './__action';

const DEFAULT_TITLE = 'Resource';

class Resource extends React.Component {
  render() {
    const { route } = this.context.router;
    const { resource, parentHash } = this.props;

    const { content } = resource;
    const href = get('attributes', 'href').from(resource);
    const description = resource.content[0].element === 'copy' ? resource.content[0].content : null;
    const title = get('meta', 'title').from(resource) || DEFAULT_TITLE;

    const hash = combineHashes(parentHash, hashFromTitle(title));

    return (
      <section className="resource" id={hash}>
        <h3 className="resource__heading">
          {title}
          <Anchor
            mix="resource__anchor"
            hash={hash}
            pathname={route.location.pathname}
          />
        </h3>
        <div className="resource__body">
          {!!description && (
            <RawContent mix="resource__description">
              {withHeaderAnchors(htmlFromText(description))}
            </RawContent>
          )}

          <div className="resource__content">
            {content
              .filter(rItem => rItem.element !== 'copy')
              .map(action => (
                <Resource__Action id={action.id} key={`resource-action-${action.id}`}>
                  <ActionCard
                    action={action}
                    key={`action-${action.id}`}
                    parentHash={hash}
                    href={href}
                    title={title}
                  />
                </Resource__Action>
              ))
            }
          </div>
        </div>
      </section>
    );
  }
}


Resource.defaultProps = {
  resource: {},
};

Resource.propTypes = {
  resource: PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
  }),
  parentHash: PropTypes.string.isRequired,
};

Resource.contextTypes = {
  router: PropTypes.object,
};

export default Resource;

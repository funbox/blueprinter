import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import ActionCard from 'app/components/action-card';
import Resource__Action from './__action';

import { get, hashFromTitle, htmlFromText, withHeaderAnchors } from 'app/common/utils/helpers';

const defaultTitle = 'Resource';

class Resource extends React.Component {
  render() {
    const { route } = this.context.router;
    const { resource } = this.props;

    const { content } = resource;
    const title = get('meta', 'title').from(resource) || defaultTitle;
    const href = get('attributes', 'href').from(resource);
    const description = resource.content[0].element === 'copy' ? resource.content[0].content : null;

    return (
      <section className="resource" id={hashFromTitle(title)}>
        <h3 className="resource__heading">
          {title}
          <Anchor
            mix="resource__anchor"
            title={title}
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
                    href={href}
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
  children: PropTypes.node,
};

Resource.contextTypes = {
  router: PropTypes.object,
};

export default Resource;

import RawContent from 'app/components/raw-content';
import ActionCard from 'app/components/action-card';
import MessageCard from 'app/components/message-card';
import { get, withHeaderAnchors } from 'app/common/utils/helpers';
import Resource__Action from './__action';

class Resource extends React.Component {
  render() {
    const { resource } = this.props;

    const { content, title } = resource;
    const href = get('attributes', 'href', 'content').from(resource);
    const description = resource.content[0].element === 'copy' ? resource.content[0].content : null;

    return (
      <section className={b('resource', this.props)}>
        <h3 className="resource__heading">
          {title}
        </h3>
        <div className="resource__body">
          {!!description && (
            <RawContent mix="resource__description">
              {withHeaderAnchors(description)}
            </RawContent>
          )}

          <div className="resource__content">
            {content
              .filter(rItem => rItem.element !== 'copy')
              .map(rItem => (
                rItem.element === 'message'
                  ? (
                    <Resource__Action id={rItem.id} key={`resource-action-${rItem.id}`}>
                      <MessageCard
                        message={rItem}
                        key={`message-${rItem.id}`}
                        title={title}
                      />
                    </Resource__Action>
                  ) : (
                    <Resource__Action id={rItem.id} key={`resource-action-${rItem.id}`}>
                      <ActionCard
                        action={rItem}
                        key={`action-${rItem.id}`}
                        href={href}
                      />
                    </Resource__Action>
                  )
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
    title: PropTypes.string,
    content: PropTypes.array,
  }),
};

export default Resource;

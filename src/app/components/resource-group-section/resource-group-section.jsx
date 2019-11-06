import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import { get, withHeaderAnchors } from 'app/common/utils/helpers';
import Resource from 'app/components/resource';
import MessageCard from 'app/components/message-card';

class ResourceGroupSection extends React.PureComponent {
  render() {
    const { group } = this.props;

    const { title, hash } = group;
    const descriptionEl = group.content.find(el => el.element === 'copy');
    const description = get('content').from(descriptionEl);

    return (
      <section className={b('resource-group-section', this.props)} id={hash}>
        <h2 className="resource-group-section__heading">
          {title}
          <Anchor
            mix="resource-group-section__anchor"
            hash={hash}
          />
        </h2>
        <div className="resource-group-section__body">
          {!!description && (
            <RawContent mix="resource-group-section__description">
              {withHeaderAnchors(description)}
            </RawContent>
          )}

          <div className="resource-group-section__content">
            {group.content
              .filter(gItem => gItem.element !== 'copy')
              .map((gItem, gIndex) => (
                gItem.element === 'message' ? (
                  <MessageCard
                    message={gItem}
                    title={title}
                    index={gIndex}
                    key={`resource-group-message-${gItem.id}`}
                    mix="resource-group-section__message"
                  />
                ) : (
                  <Resource
                    resource={gItem}
                    index={gIndex}
                    key={`resource-${gItem.title}`}
                    mix="resource-group-section__resource"
                  />
                )
              ))}
          </div>
        </div>
      </section>
    );
  }
}

ResourceGroupSection.defaultProps = {
  group: {},
};

ResourceGroupSection.propTypes = {
  group: PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
  }),
};

export default ResourceGroupSection;

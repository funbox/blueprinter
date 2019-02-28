import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import { get, htmlFromText, withHeaderAnchors } from 'app/common/utils/helpers';
import { hashFromTitle } from 'app/common/utils/helpers/hash';
import Resource from 'app/components/resource/resource';

const DEFAULT_TITLE = 'Resource Group';

class ResourceGroupSection extends React.PureComponent {
  render() {
    const { route } = this.context.router;
    const { group } = this.props;

    const title = get('meta', 'title', 'content').from(group) || DEFAULT_TITLE;
    const hash = hashFromTitle(title);
    const descriptionEl = group.content.find(el => el.element === 'copy');
    const description = get('content').from(descriptionEl);

    return (
      <section className={b('resource-group-section', this.props)} id={hash}>
        <h2 className="resource-group-section__heading">
          {title}
          <Anchor
            mix="resource-group-section__anchor"
            hash={hash}
            pathname={route.location.pathname}
          />
        </h2>
        <div className="resource-group-section__body">
          {!!description && (
            <RawContent mix="resource-group-section__description">
              {withHeaderAnchors(htmlFromText(description))}
            </RawContent>
          )}

          <div className="resource-group-section__content">
            {group.content
              .filter(gItem => gItem.element !== 'copy')
              .map(resource => (
                <Resource
                  parentHash={hash}
                  resource={resource}
                  key={`resource-${resource.meta.title.content}`}
                />
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

ResourceGroupSection.contextTypes = {
  router: PropTypes.object,
};

export default ResourceGroupSection;

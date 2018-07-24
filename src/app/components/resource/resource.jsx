import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';

const defaultTitle = 'Resource';
const defaultContent = '';
const hashFromTitle = title => title.split(' ').join('-');

class Resource extends React.Component {
  render() {
    const { route } = this.context.router;
    const { resource } = this.props;
    const hasContent = !!resource.content && resource.content.length > 0;
    const hasTitle = !!resource.meta && !!resource.meta.title && !!resource.meta.title.content;

    const title = hasTitle ? resource.meta.title.content : defaultTitle;
    const content = hasContent ? resource.meta.text.content : defaultContent;

    return (
      <section className="resource">
        <h3 className="resource__heading">
          {title}
          <Link
            mix="resource__anchor"
            to={{ hash: hashFromTitle(title), pathname: route.location.pathname }}
          >¶</Link>
        </h3>
        <div className="resource__content">
          <RawContent>
            {content}
          </RawContent>
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
};

Resource.contextTypes = {
  router: PropTypes.object,
};

export default Resource;

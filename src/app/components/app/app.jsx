import Home from 'app/views/home';

export default class App extends React.Component {
  componentDidMount() {
    const { location } = this.props;

    if (location.hash !== '') {
      // Push onto event loop so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      // https://github.com/rafrex/react-router-hash-link/tree/react-router-v2/3
      setTimeout(() => {
        const id = decodeURIComponent(location.hash.replace('#', ''));
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    const currentHash = decodeURIComponent(location.hash);
    const elementId = currentHash.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView();
  }

  render() {
    return <Home/>;
  }
}

App.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
  }),
};

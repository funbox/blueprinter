import Highlight from 'react-highlight/lib/optimized';

const observerAvailable = 'IntersectionObserver' in window;

class CodeSnippet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      useHighlight: !observerAvailable,
    };

    this.el = React.createRef();
  }

  componentDidMount() {
    if (!observerAvailable) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;
        if (!this.state.useHighlight && isIntersecting) {
          this.setState({
            useHighlight: true,
          });
          this.observer.disconnect();
          this.observer = null;
        }
      });
    });
    this.observer.observe(this.el.current);
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  render() {
    const { useHighlight } = this.state;
    const disabledSyntax = this.props.mods && this.props.mods.disabledSyntax;
    const preferredSyntax = this.props.syntax;
    const languages = disabledSyntax ? [] : ['json', 'http'];

    return (
      <div className={b('code-snippet', this.props)} ref={this.el}>
        {
          useHighlight ? (
            <Highlight languages={languages} className={disabledSyntax ? 'plaintext' : preferredSyntax}>
              {this.props.children}
            </Highlight>
          ) : (
            <pre className="code-snippet__raw">
              {this.props.children}
            </pre>
          )
        }
      </div>
    );
  }
}

CodeSnippet.defaultProps = {
  syntax: 'json',
};

CodeSnippet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  syntax: PropTypes.oneOf(['json', 'http']),
  mods: PropTypes.object,
};

export default CodeSnippet;

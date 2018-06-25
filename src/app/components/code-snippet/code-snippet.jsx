import Highlight from 'react-highlight';

const CodeSnippet = (props) => {
  const disabledSyntax = props.mods && props.mods.disabledSyntax;

  return (
    <div className={b('code-snippet', props)}>
      <Highlight className={disabledSyntax ? 'nohighlight' : 'json'}>
        {props.children}
      </Highlight>
    </div>
  );
};

CodeSnippet.propTypes = {
  children: PropTypes.string,
  mods: PropTypes.object,
};

export default CodeSnippet;

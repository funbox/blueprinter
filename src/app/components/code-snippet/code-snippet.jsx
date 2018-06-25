import Highlight from 'react-highlight';

const CodeSnippet = (props) => {
  const disabledSyntax = props.mods && props.mods.disabledSyntax;
  const languages = disabledSyntax ? [] : ['json'];

  return (
    <div className={b('code-snippet', props)}>
      <Highlight languages={languages} className={disabledSyntax ? 'nohighlight' : ''}>
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

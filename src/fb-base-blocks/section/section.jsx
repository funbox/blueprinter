const Section = (props) => {
  const {
    id,
    title,
    titleTag,
    children,
  } = props;

  const TitleTag = titleTag || 'h2';

  return (
    <section className={b('section', props)} id={id}>
      <div className="section__header">
        <TitleTag className="section__title">
          {title}
        </TitleTag>
      </div>
      <div className="section__body">
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  title: PropTypes.node.isRequired,
  titleTag: PropTypes.string,
};

export default Section;

import CheckboxField, { propTypes } from '../checkbox-field';

const Toggler = (props) => {
  const { mods, ...rest } = props;

  return (
    <CheckboxField
      mods={{
        theme: 'toggler',
        ...mods,
      }}
      {...rest}
    />
  );
};

Toggler.propTypes = propTypes;

export default Toggler;

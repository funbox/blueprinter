export default React.forwardRef((props, ref) => (
  <ul
    {...props}
    ref={ref}
    className={b('search-field__option-list')}
  />
));

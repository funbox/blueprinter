import Button from 'fb-base-blocks/button';

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func,
};

const Pagination = (props) => {
  const {
    currentPage,
    totalPages,
    setPage,
  } = props;

  const goPrev = () => {
    if (setPage) setPage(currentPage - 1);
  };

  const goNext = () => {
    if (setPage) setPage(currentPage + 1);
  };

  const isPrevAvailable = (currentPage - 1) > 0;
  const isNextAvailable = currentPage < totalPages;

  return (
    <div className={b('pagination', props)}>
      {
        <Button
          mix={b('pagination__control', {}, { type: 'previous', disabled: !isPrevAvailable })}
          onClick={goPrev}
          mods={{
            onlyIcon: true,
            disabled: !isPrevAvailable,
          }}
          text="Предыдущая страница"
        />
      }

      <ul className={b('pagination__list')}>
        {
          Array.from({ length: totalPages }, (_, index) => {
            const value = index + 1;
            const isCurrent = currentPage === value;
            const Tag = isCurrent ? 'span' : Button;

            const attr = {
              ...(isCurrent
                ? { className: 'pagination__button' }
                : {
                  mix: 'pagination__button',
                  onClick: () => {
                    if (setPage) setPage(value);
                  },
                }
              ),
            };

            return (
              <li
                key={`page-${value}`}
                className={b('pagination__item', {}, { current: isCurrent })}
              >
                <Tag {...attr}>
                  {value}
                </Tag>
              </li>
            );
          })
        }
      </ul>

      <Button
        mix={b('pagination__control', {}, { type: 'next', disabled: !isNextAvailable })}
        mods={{
          onlyIcon: true,
          disabled: !isNextAvailable,
        }}
        onClick={goNext}
        text="Следующая страница"
      />
    </div>
  );
};

Pagination.propTypes = propTypes;

export default Pagination;

import Link from 'app/components/link';

const PrintMenu = ({ data }) => {
  if (!data) return null;

  return (
    <nav className={b('print-menu')}>
      {data.map((categoryElement, i) => (
        <div key={`category${i}`}>
          <Link
            className={b('print-menu__item', { mods: { type: 'category' } })}
            to={categoryElement.route}
          >
            {categoryElement.title}
          </Link>

          {!!categoryElement.content && categoryElement.content
            .filter(item => item.element !== 'copy')
            .map((resourceElement, j) => (
              <div key={`resource${j}`}>
                <Link
                  className={b('print-menu__item', { mods: { type: 'resource' } })}
                  to={resourceElement.route}
                >
                  {resourceElement.title}
                </Link>

                {!!resourceElement.content && resourceElement.content
                  .filter(item => item.element !== 'copy')
                  .map((transitionElement, k) => (
                    <div key={`transition${k}`}>
                      <Link
                        className={b('print-menu__item', { mods: { type: 'transition' } })}
                        to={transitionElement.route}
                      >
                        {transitionElement.title}
                      </Link>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </nav>
  );
};

PrintMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
    title: PropTypes.string,
    route: PropTypes.string,
  })),
};

export default PrintMenu;

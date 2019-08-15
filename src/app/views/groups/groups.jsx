import { Route } from 'react-router-dom';
import ResourceGroupSection from 'app/components/resource-group-section';

const GroupRoutes = (groups) => (
  groups.map(group => {
    const { hash, route } = group;

    return (
      <Route
        key={`group-${hash}`}
        exact
        path={route}
        render={(props) => (
          <ResourceGroupSection
            {...props}
            group={group}
          />
        )}
      />
    );
  })
);

export default GroupRoutes;

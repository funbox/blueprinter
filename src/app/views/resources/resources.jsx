import { Route } from 'react-router-dom';
import ResourceGroupSection from 'app/components/resource-group-section';

const ResourceRoutes = (resources) => (
  resources.map(resource => {
    const { id, route, parentGroup } = resource;

    return (
      <Route
        key={`resource-${id}`}
        exact
        path={route}
        render={(props) => (
          <ResourceGroupSection
            {...props}
            group={{
              title: parentGroup.title,
              content: [resource],
            }}
          />
        )}
      />
    );
  })
);

export default ResourceRoutes;

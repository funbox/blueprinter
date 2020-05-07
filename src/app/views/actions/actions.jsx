import { Route } from 'react-router-dom';
import ResourceGroupSection from 'app/components/resource-group-section';

const ActionRoutes = (actions) => (
  actions.map(action => {
    const { id, route, parentResource } = action;

    const parentGroup = parentResource.group;
    const resource = { ...parentResource };

    resource.content = [action];
    delete resource.group;

    return (
      <Route
        key={`action-${id}`}
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

export default ActionRoutes;

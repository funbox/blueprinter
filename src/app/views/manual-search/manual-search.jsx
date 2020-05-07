import { Page__Stripe } from 'app/components/page';
import ResourceGroupSection from 'app/components/resource-group-section';

const ManualSearch = (props) => {
  const { groups, location } = props;

  return groups.map(group => {
    const { id } = group;

    return (
      <Page__Stripe
        key={`group-stripe-${id}`}
        mods={{ for: 'group' }}
      >
        <ResourceGroupSection
          group={group}
          location={location}
        />
      </Page__Stripe>
    );
  });
};

export default ManualSearch;

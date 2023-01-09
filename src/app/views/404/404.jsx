import { t } from '@lingui/macro';
import PageDescription from 'app/components/page-description';

const ContentNotFound = () => (
  <PageDescription
    description={t`Nothing to show.`}
  />
);

export default ContentNotFound;

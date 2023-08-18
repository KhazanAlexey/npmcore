import { SETTINGS } from '@/core/settings';

interface VersionViewProps {
  label?: string;
}

export const VersionView = (props: VersionViewProps) => {
  const { label = '' } = props;

  return <div className='version-container'>{`${label} ${SETTINGS.appVersion}`.trim()}</div>;
};

import { UpgradeToProBanner } from '@/components/common/UpgradeToProBanner';
import { Container } from '@/components/layout/Container';
import { SettingsLayout } from '@/components/layout/SettingsLayout';
import { Box } from '@/components/ui/v2/Box';
import { ArrowSquareOutIcon } from '@/components/ui/v2/icons/ArrowSquareOutIcon';
import { Link } from '@/components/ui/v2/Link';
import { Text } from '@/components/ui/v2/Text';
import { useCurrentWorkspaceAndProject } from '@/features/projects/common/hooks/useCurrentWorkspaceAndProject';
import { AuthDomain } from '@/features/projects/custom-domains/settings/components/AuthDomain';
import { DatabaseDomain } from '@/features/projects/custom-domains/settings/components/DatabaseDomain';
import { HasuraDomain } from '@/features/projects/custom-domains/settings/components/HasuraDomain';
import { RunServiceDomains } from '@/features/projects/custom-domains/settings/components/RunServiceDomains';
import { type ReactElement } from 'react';

export default function CustomDomains() {
  const { currentProject } = useCurrentWorkspaceAndProject();

  if (currentProject.plan.isFree) {
    return (
      <Container
        className="grid grid-flow-row gap-6 bg-transparent"
        rootClassName="bg-transparent"
      >
        <UpgradeToProBanner
          title="Upgrade to Nhost Pro to unlock custom domains"
          description="In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content."
        />
      </Container>
    );
  }

  return (
    <Container
      className="grid max-w-5xl grid-flow-row gap-6 bg-transparent"
      rootClassName="bg-transparent"
    >
      <Box className="flex flex-row items-center gap-4 overflow-hidden rounded-lg border-1 p-4">
        <div className="flex flex-col space-y-2">
          <Text className="text-lg font-semibold">Custom Domains</Text>

          <Text color="secondary">
            Add a custom domain to Auth, Hasura, PostgreSQL, and your Run 
            services for only a $10 flat fee 🚀 <br /> Learn more about
            <Link
              href="https://docs.nhost.io/platform/custom-domains"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              className="ml-1 font-medium"
            >
              Custom Domains
              <ArrowSquareOutIcon className="ml-1 h-4 w-4" />
            </Link>
          </Text>
        </div>
      </Box>

      <AuthDomain />
      <HasuraDomain />
      <DatabaseDomain />

      <RunServiceDomains />
    </Container>
  );
}

CustomDomains.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

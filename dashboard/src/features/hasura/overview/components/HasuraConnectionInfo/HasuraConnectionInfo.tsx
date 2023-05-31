import { LoadingScreen } from '@/components/presentational/LoadingScreen';
import { useCurrentWorkspaceAndProject } from '@/features/projects/common/hooks/useCurrentWorkspaceAndProject';
import { useIsPlatform } from '@/features/projects/common/hooks/useIsPlatform';
import {
  defaultLocalBackendSlugs,
  defaultRemoteBackendSlugs,
  generateAppServiceUrl,
} from '@/features/projects/common/utils/generateAppServiceUrl';
import { Box } from '@/ui/v2/Box';
import { Button } from '@/ui/v2/Button';
import { IconButton } from '@/ui/v2/IconButton';
import { ArrowSquareOutIcon } from '@/ui/v2/icons/ArrowSquareOutIcon';
import { CopyIcon } from '@/ui/v2/icons/CopyIcon';
import { Text } from '@/ui/v2/Text';
import { copy } from '@/utils/common/copy';
import { getHasuraConsoleServiceUrl } from '@/utils/env';
import Image from 'next/image';

interface HasuraConnectionInfoProps {
  close?: () => void;
}

export default function HasuraConnectionInfo({
  close,
}: HasuraConnectionInfoProps) {
  const { currentProject } = useCurrentWorkspaceAndProject();
  const isPlatform = useIsPlatform();
  const projectAdminSecret = currentProject?.config?.hasura.adminSecret;

  if (!currentProject?.subdomain || !projectAdminSecret) {
    return <LoadingScreen />;
  }

  const hasuraUrl =
    process.env.NEXT_PUBLIC_ENV === 'dev' || !isPlatform
      ? `${getHasuraConsoleServiceUrl()}`
      : generateAppServiceUrl(
          currentProject?.subdomain,
          currentProject?.region,
          'hasura',
          defaultLocalBackendSlugs,
          { ...defaultRemoteBackendSlugs, hasura: '/console' },
        );

  return (
    <div className="mx-auto w-full max-w-md px-6 py-4 text-left">
      <div className="grid grid-flow-row gap-1">
        <div className="mx-auto">
          <Image
            src="/assets/hasuramodal.svg"
            width={72}
            height={72}
            alt="Hasura"
          />
        </div>

        <Text variant="h3" component="h1" className="text-center">
          Open Hasura
        </Text>

        <Text className="text-center">
          Hasura is the dashboard you&apos;ll use to edit your schema and
          permissions as well as browse data. Copy the admin secret to your
          clipboard and enter it in the next screen.
        </Text>

        <Box className="mt-6 border-y-1">
          <div className="grid w-full grid-cols-1 place-content-between items-center py-2 sm:grid-cols-3">
            <Text className="col-span-1 text-center font-medium sm:justify-start sm:text-left">
              Admin Secret
            </Text>

            <div className="col-span-1 grid grid-flow-col items-center justify-center gap-2 sm:col-span-2 sm:justify-end">
              <Text className="font-medium" variant="subtitle2">
                {Array(projectAdminSecret.length).fill('•').join('')}
              </Text>

              <IconButton
                onClick={() => copy(projectAdminSecret, 'Hasura admin secret')}
                variant="borderless"
                color="secondary"
                className="min-w-0 p-1"
                aria-label="Copy admin secret"
              >
                <CopyIcon className="h-4 w-4" />
              </IconButton>
            </div>
          </div>
        </Box>

        <div className="mt-6 grid grid-flow-row gap-2">
          <Button
            href={hasuraUrl}
            // Both `target` and `rel` are available when `href` is set. This is
            // a limitation of MUI.
            // @ts-ignore
            target="_blank"
            rel="noreferrer noopener"
            endIcon={<ArrowSquareOutIcon className="h-4 w-4" />}
          >
            Open Hasura
          </Button>

          {close && (
            <Button
              variant="outlined"
              color="secondary"
              className="text-sm+ font-normal"
              onClick={close}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

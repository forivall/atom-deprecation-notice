import { Package, NotificationOptions } from 'atom';

interface PackageJson {
  name: string
  deprecated?: string
  deprecationNotice?: DeprecationNoticeConfig
}

interface DeprecationNoticeConfig {
  message?: string
  description?: NotificationOptions['description']
  detail?: NotificationOptions['detail']
}

interface PackageExt extends Package {
  mainModulePath?: string
  metadata: PackageJson
}

export default function internalNotice(module: NodeModule | null) {
  if (module == null) {
    console.warn('Could not get metadata to show deprecation notice for package');
    return;
  }
  const moduleFilename = module.filename;
  const p = (atom.packages.getLoadedPackages() as PackageExt[]).find(
    (value) => value.mainModulePath === moduleFilename
  );

  if (!p) {
    console.warn(
      `Could not get metadata to show deprecation notice for package at ${moduleFilename}`
    );
    return;
  }

  const meta = p.metadata;
  const config = {
    icon: 'issue-opened',
    message: `The ${p.name} package is deprecated.`,
    description: meta.deprecated,
    ...meta.deprecationNotice,
  }

  atom.notifications.addWarning(config.message, config)
}

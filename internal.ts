import { Package, NotificationOptions, PackageManager } from 'atom';

interface DeprecatedPackageEntry {
  message?: string
  hasAlternative?: boolean
  alternative?: string
  version?: string
  hasDeprecations?: boolean
  latestHasDeprecations?: boolean
}

interface PackageJson {
  name: string
  deprecated?: string
  deprecationNotice?: DeprecationNoticeConfig
}

interface DeprecationNoticeConfig extends DeprecatedPackageEntry {
  message?: string
  description?: NotificationOptions['description']
  detail?: NotificationOptions['detail']
}

interface PackageManagerExt extends PackageManager {
  deprecatedPackages: {
    [name: string]: DeprecatedPackageEntry
  }
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

  (atom.packages as PackageManagerExt).deprecatedPackages[p.name] = meta.deprecationNotice || {}

  const configPath = `${p.name}.hideDeprecationMessage`

  if (atom.config.get(configPath)) {
    return;
  }

  const config: NotificationOptions & DeprecationNoticeConfig = {
    icon: 'issue-opened',
    message: `The ${p.name} package is deprecated.`,
    description: meta.deprecated,
    ...meta.deprecationNotice,
    buttons: [{
      text: 'Open Settings',
      onDidClick() {
        notification.dismiss();
        atom.workspace.open('atom://config/packages/remember-folds')
      }
    }, {
      text: 'Disable Package',
      className: 'btn btn-warning btn-primary',
      onDidClick() {
        notification.dismiss();
        atom.packages.disablePackage(p.name);
      },
    }, {
      text: 'Ignore',
      className: 'btn btn-warning',
      onDidClick() {
        notification.dismiss();
        atom.config.set(configPath, true);
      }
    }]
  }

  const notification = atom.notifications.addWarning(config.message!, config)
}

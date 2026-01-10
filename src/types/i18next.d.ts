import 'react-i18next';
import common from '../../public/locales/en/translation.json';

declare module 'react-i18next' {
  interface Resources {
    common: typeof common;
  }

  interface DefaultNamespace extends Resources {}
}

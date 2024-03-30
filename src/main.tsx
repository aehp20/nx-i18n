import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { I18NProvider } from './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <I18NProvider locale="es" urlApp="http://localhost:4200" folderPath="/translations/">
      <App />
    </I18NProvider>
  </StrictMode>
);

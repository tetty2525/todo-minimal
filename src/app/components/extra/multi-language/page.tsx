import { CONFIG } from 'src/config-global';
import { getServerTranslations } from 'src/locales/server';

import { MultiLanguageView } from 'src/sections/_examples/extra/multi-language-view';
import { navData } from 'src/sections/_examples/extra/multi-language-view/config-nav';

// ----------------------------------------------------------------------

export const metadata = { title: `Multi language | Components - ${CONFIG.site.name}` };

export default async function Page() {
  const { t } = await getServerTranslations('navbar');

  const data = navData(t);

  return <MultiLanguageView navData={data} />;
}

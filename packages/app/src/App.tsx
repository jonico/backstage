/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useApi } from '@backstage/core-plugin-api';
import { stringifyError } from '@backstage/errors';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import React, { useEffect } from 'react';
import useAsync from 'react-use/lib/useAsync';
import { useDeclarativeRoot } from './declarative/useDeclarativeRoot';

export function TestPage() {
  const catalogApi = useApi(catalogApiRef);

  useEffect(() => {
    catalogApi
      .getEntities()
      .then(r => console.log('loaded entity', r.items[0]))
      .catch(err => console.log('error', err));
  }, [catalogApi]);

  const { loading, error, value } = useAsync(async () => {
    return await catalogApi.getEntities();
  }, [catalogApi]);
  console.log('useAsync', { loading, error, value });

  return <div>Test Page</div>;
}

export default function App() {
  const result = useDeclarativeRoot();

  if (result.state === 'loading') {
    return <h1>LOADING.....</h1>;
  } else if (result.state === 'boot-error') {
    return <h1>OH NO BOOT ERROR! {stringifyError(result.error)}</h1>;
  }

  return <result.Root />;
}

// import {
//   RELATION_API_CONSUMED_BY,
//   RELATION_API_PROVIDED_BY,
//   RELATION_CONSUMES_API,
//   RELATION_DEPENDENCY_OF,
//   RELATION_DEPENDS_ON,
//   RELATION_HAS_PART,
//   RELATION_OWNED_BY,
//   RELATION_OWNER_OF,
//   RELATION_PART_OF,
//   RELATION_PROVIDES_API,
// } from '@backstage/catalog-model';
// import { createApp } from '@backstage/app-defaults';
// import { AppRouter, FeatureFlagged, FlatRoutes } from '@backstage/core-app-api';
// import {
//   AlertDisplay,
//   OAuthRequestDialog,
//   SignInPage,
// } from '@backstage/core-components';
// import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
// import { AzurePullRequestsPage } from '@backstage/plugin-azure-devops';

// import {
//   CatalogEntityPage,
//   CatalogIndexPage,
//   catalogPlugin,
// } from '@internal/plugin-catalog-customized';

// import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
// import {
//   CatalogImportPage,
//   catalogImportPlugin,
// } from '@backstage/plugin-catalog-import';
// import {
//   CostInsightsLabelDataflowInstructionsPage,
//   CostInsightsPage,
//   CostInsightsProjectGrowthInstructionsPage,
// } from '@backstage/plugin-cost-insights';
// import { orgPlugin } from '@backstage/plugin-org';
// import { ExplorePage } from '@backstage/plugin-explore';
// import { GcpProjectsPage } from '@backstage/plugin-gcp-projects';
// import { GraphiQLPage } from '@backstage/plugin-graphiql';
// import { HomepageCompositionRoot } from '@backstage/plugin-home';
// import { LighthousePage } from '@backstage/plugin-lighthouse';
// import { NewRelicPage } from '@backstage/plugin-newrelic';
// import { NextScaffolderPage } from '@backstage/plugin-scaffolder/alpha';
// import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
// import {
//   ScaffolderFieldExtensions,
//   ScaffolderLayouts,
// } from '@backstage/plugin-scaffolder-react';
// import { SearchPage } from '@backstage/plugin-search';
// import { TechRadarPage } from '@backstage/plugin-tech-radar';
// import {
//   TechDocsIndexPage,
//   TechDocsReaderPage,
//   techdocsPlugin,
// } from '@backstage/plugin-techdocs';
// import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
// import {
//   ExpandableNavigation,
//   ReportIssue,
//   TextSize,
//   LightBox,
// } from '@backstage/plugin-techdocs-module-addons-contrib';
// import {
//   SettingsLayout,
//   UserSettingsPage,
// } from '@backstage/plugin-user-settings';
// import { AdvancedSettings } from './components/advancedSettings';
// import AlarmIcon from '@material-ui/icons/Alarm';
// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import { apis } from './apis';
// import { entityPage } from './components/catalog/EntityPage';
// import { homePage } from './components/home/HomePage';
// import { Root } from './components/Root';
// import {
//   DelayingComponentFieldExtension,
//   LowerCaseValuePickerFieldExtension,
// } from './components/scaffolder/customScaffolderExtensions';
// import { defaultPreviewTemplate } from './components/scaffolder/defaultPreviewTemplate';
// import { searchPage } from './components/search/SearchPage';
// import { providers } from './identityProviders';
// import * as plugins from './plugins';

// import { techDocsPage } from './components/techdocs/TechDocsPage';
// import { ApacheAirflowPage } from '@backstage/plugin-apache-airflow';
// import { RequirePermission } from '@backstage/plugin-permission-react';
// import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
// import { PlaylistIndexPage } from '@backstage/plugin-playlist';
// import { TwoColumnLayout } from './components/scaffolder/customScaffolderLayouts';
// import { ScoreBoardPage } from '@oriflame/backstage-plugin-score-card';
// import { StackstormPage } from '@backstage/plugin-stackstorm';
// import { PuppetDbPage } from '@backstage/plugin-puppetdb';

// const app = createApp({
//   apis,
//   plugins: Object.values(plugins),
//   icons: {
//     // Custom icon example
//     alert: AlarmIcon,
//   },
//   featureFlags: [
//     {
//       name: 'scaffolder-next-preview',
//       description: 'Preview the new Scaffolder Next',
//       pluginId: '',
//     },
//   ],
//   components: {
//     SignInPage: props => {
//       return (
//         <SignInPage
//           {...props}
//           providers={['guest', 'custom', ...providers]}
//           title="Select a sign-in method"
//           align="center"
//         />
//       );
//     },
//   },
//   bindRoutes({ bind }) {
//     bind(catalogPlugin.externalRoutes, {
//       createComponent: scaffolderPlugin.routes.root,
//       viewTechDoc: techdocsPlugin.routes.docRoot,
//     });
//     bind(apiDocsPlugin.externalRoutes, {
//       registerApi: catalogImportPlugin.routes.importPage,
//     });
//     bind(scaffolderPlugin.externalRoutes, {
//       registerComponent: catalogImportPlugin.routes.importPage,
//       viewTechDoc: techdocsPlugin.routes.docRoot,
//     });
//     bind(orgPlugin.externalRoutes, {
//       catalogIndex: catalogPlugin.routes.catalogIndex,
//     });
//   },
// });

// const routes = (
//   <FlatRoutes>
//     <Route path="/" element={<Navigate to="catalog" />} />
//     {/* TODO(rubenl): Move this to / once its more mature and components exist */}
//     <Route path="/home" element={<HomepageCompositionRoot />}>
//       {homePage}
//     </Route>
//     <Route path="/catalog" element={<CatalogIndexPage />} />
//     <Route
//       path="/catalog/:namespace/:kind/:name"
//       element={<CatalogEntityPage />}
//     >
//       {entityPage}
//     </Route>
//     <Route
//       path="/catalog-import"
//       element={
//         <RequirePermission permission={catalogEntityCreatePermission}>
//           <CatalogImportPage />
//         </RequirePermission>
//       }
//     />
//     <Route
//       path="/catalog-graph"
//       element={
//         <CatalogGraphPage
//           initialState={{
//             selectedKinds: ['component', 'domain', 'system', 'api', 'group'],
//             selectedRelations: [
//               RELATION_OWNER_OF,
//               RELATION_OWNED_BY,
//               RELATION_CONSUMES_API,
//               RELATION_API_CONSUMED_BY,
//               RELATION_PROVIDES_API,
//               RELATION_API_PROVIDED_BY,
//               RELATION_HAS_PART,
//               RELATION_PART_OF,
//               RELATION_DEPENDS_ON,
//               RELATION_DEPENDENCY_OF,
//             ],
//           }}
//         />
//       }
//     />
//     <Route path="/docs" element={<TechDocsIndexPage />} />
//     <Route
//       path="/docs/:namespace/:kind/:name/*"
//       element={<TechDocsReaderPage />}
//     >
//       {techDocsPage}
//       <TechDocsAddons>
//         <ExpandableNavigation />
//         <ReportIssue />
//         <TextSize />
//         <LightBox />
//       </TechDocsAddons>
//     </Route>
//     <FeatureFlagged with="scaffolder-next-preview">
//       <Route
//         path="/create"
//         element={
//           <NextScaffolderPage
//             groups={[
//               {
//                 title: 'Recommended',
//                 filter: entity =>
//                   entity?.metadata?.tags?.includes('recommended') ?? false,
//               },
//             ]}
//           />
//         }
//       >
//         <ScaffolderFieldExtensions>
//           <DelayingComponentFieldExtension />
//         </ScaffolderFieldExtensions>
//         <ScaffolderLayouts>
//           <TwoColumnLayout />
//         </ScaffolderLayouts>
//       </Route>
//     </FeatureFlagged>
//     <FeatureFlagged without="scaffolder-next-preview">
//       <Route
//         path="/create"
//         element={
//           <ScaffolderPage
//             defaultPreviewTemplate={defaultPreviewTemplate}
//             groups={[
//               {
//                 title: 'Recommended',
//                 filter: entity =>
//                   entity?.metadata?.tags?.includes('recommended') ?? false,
//               },
//             ]}
//           />
//         }
//       >
//         <ScaffolderFieldExtensions>
//           <LowerCaseValuePickerFieldExtension />
//         </ScaffolderFieldExtensions>
//         <ScaffolderLayouts>
//           <TwoColumnLayout />
//         </ScaffolderLayouts>
//       </Route>
//     </FeatureFlagged>
//     <Route path="/explore" element={<ExplorePage />} />
//     <Route
//       path="/tech-radar"
//       element={<TechRadarPage width={1500} height={800} />}
//     />
//     <Route path="/graphiql" element={<GraphiQLPage />} />
//     <Route path="/lighthouse" element={<LighthousePage />} />
//     <Route path="/api-docs" element={<ApiExplorerPage />} />
//     <Route path="/gcp-projects" element={<GcpProjectsPage />} />
//     <Route path="/newrelic" element={<NewRelicPage />} />
//     <Route path="/search" element={<SearchPage />}>
//       {searchPage}
//     </Route>
//     <Route path="/cost-insights" element={<CostInsightsPage />} />
//     <Route
//       path="/cost-insights/investigating-growth"
//       element={<CostInsightsProjectGrowthInstructionsPage />}
//     />
//     <Route
//       path="/cost-insights/labeling-jobs"
//       element={<CostInsightsLabelDataflowInstructionsPage />}
//     />
//     <Route path="/settings" element={<UserSettingsPage />}>
//       <SettingsLayout.Route path="/advanced" title="Advanced">
//         <AdvancedSettings />
//       </SettingsLayout.Route>
//     </Route>
//     <Route path="/azure-pull-requests" element={<AzurePullRequestsPage />} />
//     <Route path="/apache-airflow" element={<ApacheAirflowPage />} />
//     <Route path="/playlist" element={<PlaylistIndexPage />} />
//     <Route path="/score-board" element={<ScoreBoardPage />} />
//     <Route path="/stackstorm" element={<StackstormPage />} />
//     <Route path="/puppetdb" element={<PuppetDbPage />} />
//   </FlatRoutes>
// );

// export default app.createRoot(
//   <>
//     <AlertDisplay transientTimeoutMs={2500} />
//     <OAuthRequestDialog />
//     <AppRouter>
//       <Root>{routes}</Root>
//     </AppRouter>
//   </>,
// );

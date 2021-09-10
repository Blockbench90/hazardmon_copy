// @ts-nocheck
import * as _ from 'lodash';

const root = '/visual-dashboard';

const urls = {
    home: '/',
    machineDetails: '/site/:siteId/schemas/:schemaId/tabs/:tabId/machines/:machineId/',
    newSchema: '/site/:siteId/schemas/new',
    schemaDetails: '/site/:siteId/schemas/:schemaId/tabs/:tabId',
    schemaEdit: '/site/:siteId/schemas/:schemaId/edit',
    schemasList: '/site/:siteId/schemas/',
    tabEdit: '/site/:siteId/schemas/:schemaId/tabs/:tabId/edit',
    tabNew: '/site/:siteId/schemas/:schemaId/new-tab',
};

_.each(urls, (value: string, key: string) => (urls[key] = root+value));


export default urls;
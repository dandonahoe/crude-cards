const apiUrl = url => `/api/${url.toLowerCase().trim()}`;

const modelRouteRewrite = input => {

    const routes = [];

    input.forEach(str => {

        // Source: rest Url
        // Destination: the directory

        routes.push({
            destination: apiUrl(`${str}/get`),
            source: apiUrl(`${str}/:${str}`),
        });

        routes.push({
            destination: apiUrl(`${str}/update`),
            source: apiUrl(`${str}/update/:${str}`),
        });

        routes.push({
            destination: apiUrl(`${str}/delete`),
            source: apiUrl(`${str}/delete/:${str}`),
        });

        routes.push({
            destination: apiUrl(`${str}/create`),
            source: apiUrl(`${str}/create`),
        });


        routes.push({
            destination: apiUrl(`${str}/analysis`),
            source: apiUrl(`${str}/analysis/:${str}`),
        });
    });

    return routes;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    reactStrictMode: true,

    eslint: {
        dirs: [
            'src',
        ],
    },

    rewrites: () => [{
        destination: '/game',
        source: '/game/:gameCode',
    }, {
        destination: '/contacts/detail',
        source: '/contact/:contactHash',
    }, {
        destination: '/documents/detail',
        source: '/document/:assetHash',
    }, {
        destination: '/locations/detail',
        source: '/location/:locationHash',
    }, {
        destination: '/patent/edit',
        source: '/patent-template/:pathwayHash',
    }, {
        destination: '/patent',
        source: '/my-patents',
    }, {
        destination: '/patent/published',
        source: '/patent/published/:pathwayHash',
    }, {
        destination: '/patent/enrolled',
        source: '/patent/enrolled/:pathwayHash',
    }, {
        destination: '/milestones/detail',
        source: '/milestone/:milestoneHash',
    }, {
        destination: '/events/detail',
        source: '/event/:eventHash',
    }, {
        destination: '/api/asset/upload',
        source: '/api/asset/upload/:assethash',
    }, {
        destination: '/api/message/upload',
        source: '/api/message/upload/:messagehash',
    }, {
        destination: '/api/asset/download',
        source: '/api/asset/download/:assethash',
    }, {
        destination: '/api/matter/upload',
        source: '/api/matter/upload/:matterhash',
    }, {
        destination: '/api/contact/upload',
        source: '/api/contact/upload/:contacthash',
    }, {
        destination: '/api/location/upload',
        source: '/api/location/upload/:locationhash',
    }, {
        destination: '/api/pathway/upload',
        source: '/api/pathway/upload/:pathwayhash',
    }, {
        destination: '/api/pathway/publish',
        source: '/api/pathway/publish/:pathwayhash',
    }, {
        destination: '/api/pathway/start',
        source: '/api/pathway/start/:pathwayhash',
    }, {
        destination: '/api/pathway/generate-patent',
        source: '/api/pathway/generate-patent/:pathwayhash',
    }, {
        destination: '/api/milestone/upload',
        source: '/api/milestone/upload/:milestonehash',
    }, {
        destination: '/api/task/upload',
        source: '/api/task/upload/:taskhash',
    }, {
        destination: '/api/event/upload',
        source: '/api/event/upload/:eventhash',
    }, { // Matter
        destination: '/matters/detail?defaultTab=genie',
        source: '/matter/:matterhash',
    }, {
        destination: '/matters/detail?defaultTab=overview',
        source: '/matter/:matterhash/overview',
    }, {
        destination: '/matters/detail?defaultTab=genie',
        source: '/matter/:matterhash/genie',
    }, {
        destination: '/matters/detail?defaultTab=chats',
        source: '/matter/:matterhash/chats',
    }, {
        destination: '/matters/detail?defaultTab=chats',
        source: '/matter/:matterhash/chats/:chatHash',
    }, {
        destination: '/matters/detail?defaultTab=documents',
        source: '/matter/:matterhash/documents',
    }, {
        destination: '/matters/detail?defaultTab=messages',
        source: '/matter/:matterhash/messages',
    }, { // SINGLE SERVE SITES START
        destination: '/framework/rentersadvantage/result',
        source: '/rentersadvantage/:matterhash',
    }, {
        destination: '/framework/contractgenie/result',
        source: '/contractgenie/:matterhash',
    }, {
        destination: '/framework/ticketblaster/result',
        source: '/ticketblaster/:matterhash',
    }, {
        destination: '/framework/hoanalyser/result',
        source: '/hoanalyser/:matterhash',
    }, {
        destination: '/framework/boblawbot/result',
        source: '/boblawbot/:matterhash',
    }, { // SINGLE SERVE SITES START
        destination: '/framework/rentersadvantage',
        source: '/rentersadvantage',
    }, {
        destination: '/framework/contractgenie',
        source: '/contractgenie',
    }, {
        destination: '/framework/ticketblaster',
        source: '/ticketblaster',
    }, {
        destination: '/framework/hoanalyzer',
        source: '/hoanalyzer',
    }, {
        destination: '/framework/boblawbot',
        source: '/boblawbot',
    }, {  // SINGLE SERVE SITES ENF
        destination: '/matters/detail?defaultTab=tasks',
        source: '/matter/:matterhash/tasks',
    }, {
        destination: '/matters/detail?defaultTab=contacts',
        source: '/matter/:matterhash/contacts',
    }, {
        destination: '/api/job',
        source: '/api/job/:action',
    }, {
        destination: '/api/job',
        source: '/api/job/:action',
    }, {
        destination: '/api/auth',
        source: '/api/auth/:action',
    }, {
        destination: '/api/analysis',
        source: '/api/analysis/:action',
    }, ...modelRouteRewrite([
        'cachenode',
        'milestone',
        'analysis',
        'location',
        'eventlog',
        'contact',
        'message',
        'pathway',
        'matter',
        'asset',
        'event',
        'task',
        'chat',
    ])],

    // headers : () => {
    //     return [{
    //         source  : '/(.*)',
    //         headers : [{
    //             key   : 'Access-Control-Allow-Origin',
    //             value : '*',
    //         }],
    //     }];
    // },
};


export default nextConfig;

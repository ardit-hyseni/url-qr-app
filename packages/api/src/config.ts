const DEFAULT_PORT = 3001;

const settings = {
    port: process.env.PORT || DEFAULT_PORT,
    host: process.env.HOST || 'localhost',
};

export default {
    settings: settings,
};
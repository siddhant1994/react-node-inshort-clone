const config = {};
if (process.env.NODE_ENV === "development") {
    config.base_url = `http://localhost:8081/`;
} else {
    config.base_url = `/`;
}
export default config;

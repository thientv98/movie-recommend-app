/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL || "",
        GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || "",
    },
}

module.exports = nextConfig

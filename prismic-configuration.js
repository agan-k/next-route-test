import Prismic from "prismic-javascript"

// Prismic API endpoint
export const apiEndpoint = process.env.PRISMIC_URL

// Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN

// Client method to query Prismic
export const client = Prismic.client('https://dbop.cdn.prismic.io/api/v2', { accessToken })
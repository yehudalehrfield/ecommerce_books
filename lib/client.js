import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

//connecting to sanity client
export const client = sanityClient({
  projectId: 'dlvxzpek',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

//building url for the image
const builder = imageUrlBuilder(client);

//getting the url for an image
export const urlFor = (source) => builder.image(source);

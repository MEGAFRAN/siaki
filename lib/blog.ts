import { groq } from "next-sanity"
import { GetStaticPaths, GetStaticProps } from "next"
import client from "./sanity/client"

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  body
}`

export const getStaticPathsBlogSlug: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`,
  )

  return { paths, fallback: false }
}

export const getStaticPropsBlogSlug: GetStaticProps = async ({ params }: any) => {
  const queryParams = { slug: params?.slug ?? "" }
  const post = await client.fetch(postQuery, queryParams)

  if (!post) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: { post },
    },
  }
}

export const getStaticPropsBlogIndex = async () => {}

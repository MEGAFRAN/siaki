import { groq } from "next-sanity"
import { getCategoryList } from "./companies"
import { IndexContent } from "../app/constants/types/content_models/types"
import { Category } from "../app/constants/interfaces/content_models/interfaces"
import client from "./sanity/client"

/* eslint-disable import/prefer-default-export */

export const getStaticPropsIndexContent = async () => {
  const homeQuery = groq`*[_type == "pages" && title == "home"][0]{
    metaDescription,
    headerTitle
  }`
  const homePageData: IndexContent = await client.fetch(homeQuery)
  const categories: Category = await getCategoryList()

  return {
    props: {
      homePageData,
      categories,
    },
  }
}

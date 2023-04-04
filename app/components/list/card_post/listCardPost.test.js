import "@testing-library/jest-dom"
import { cleanup, render } from "@testing-library/react"
import ListCardPost from "./ListCardPost"
import mockResponsePageYear from "../../../constants/mocks/mockPostPage"
import useDate from "../../../hook/useDate"

describe("<ListCardPost/>", () => {
  const { transformDataToDataString, generateEndpointCardPost } = useDate()
  const mockCardPost = mockResponsePageYear.cardPosts
  const mockDescription = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, aliquid. ...",
  ]
  let component
  beforeEach(() => {
    component = render(<ListCardPost cardPosts={mockCardPost} />)
  })
  afterEach(cleanup)
  test("should render cardPost", () => {
    const totalCardPost = mockCardPost.length
    const cardPost = component.getAllByRole("article")
    expect(cardPost).toHaveLength(totalCardPost)
  })
  test("should display information about post authorName, dataPost, redingTime", () => {
    const cardPost = component.getAllByRole("article")
    cardPost.forEach((card, index) => {
      const mockAuthorName = mockCardPost[index].nameAuthor
      const mockReadingTime = mockCardPost[index].readingTime
      const mockDataPost = transformDataToDataString(mockCardPost[index].data)
      const authorName = component.getByText(mockAuthorName)
      const readingTime = component.getByText(mockReadingTime)
      const dataPost = component.getByText(mockDataPost)
      expect(card).toBeInTheDocument()
      expect(authorName).toBeInTheDocument()
      expect(readingTime).toBeInTheDocument()
      expect(dataPost).toBeInTheDocument()
    })
  })
  test("Should display title post with it endpoint", () => {
    const mockTitle1Expect = mockCardPost[0].title
    const mockTitle2Expect = mockCardPost[1].title
    const titlesPost = []
    const title1 = component.getByRole("link", { name: mockTitle1Expect })
    const title2 = component.getByRole("link", { name: mockTitle2Expect })
    titlesPost.push(title1, title2)
    titlesPost.forEach((title, index) => {
      const mockUrlExpect = generateEndpointCardPost({
        title: mockCardPost[index].title,
        date: mockCardPost[index].data,
      })
      expect(title).toBeInTheDocument()
      expect(title).toHaveAttribute("href", mockUrlExpect)
    })
  })
  test("Should display description post with first 10 words", () => {
    const description = component.getAllByRole("definition")
    description.forEach((title) => {
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(mockDescription[0])
    })
  })
  test("Should display footer wit name continue reading and it endpoint", () => {
    const mockNameFooter = "Continuar leyendo"
    const footers = component.getAllByRole("link", { name: mockNameFooter })
    footers.forEach((footer, index) => {
      const mockUrlExpect = generateEndpointCardPost({
        title: mockCardPost[index].title,
        date: mockCardPost[index].data,
      })
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveAttribute("href", mockUrlExpect)
    })
  })
})

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
  projectId: 's2y2242q',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
})

const query = `*[_type == "sector"] | order(orderRank asc)[0...1]{
  "leadProject": coalesce(
    *[_type == "project" && isVisible == true && category._ref == ^._id && featured == true] | order(orderRank asc, completionYear desc)[0]{
      "coverImage": {
        ...coverImage,
        asset-> {
          ...
        }
      }
    }
  )
}`

client.fetch(query).then(console.log).catch(console.error)

import {createClient} from '@sanity/client'
const client = createClient({
  projectId: 's2y2242q',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
})

const query = `*[_type == "project" && defined(coverImage.asset)]{
  projectName,
  "hasCover": defined(coverImage.asset),
  "hasMain": defined(mainImage.asset)
}[0...5]`

client
  .fetch(query)
  .then((res) => {
    if (res.length === 0) {
      console.log('No projects found with coverImage.asset.')
    } else {
      console.log('Projects with valid assets found:', JSON.stringify(res, null, 2))
    }
  })
  .catch(console.error)

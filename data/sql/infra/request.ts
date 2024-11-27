import { generateRandomNumber } from "../../../shopify/service/utils"

/** this interface represent schema of sql table */
export interface ShopifyBookImageDb {
  book_id: string,
  image_id: string,
  created_at: Date
}

/** general sql caller can return anything */
async function sql(_query: string): Promise<any> {
  const randomNumber = generateRandomNumber(1_000)
  return new Promise((resolve, reject) => {
    if (randomNumber === 100) {
      reject(undefined as any)
    }
    resolve(undefined as any)
  })
}

/** schema of tab */
export async function fetchDuplicatedImages(): Promise<string[]> {
  const query = `SELECT book_id, image_id, created_at
    FROM shopifyBookImage
    WHERE book_id IN (
          SELECT book_id
          FROM shopifyBookImage
          GROUP BY book_id
          HAVING COUNT(*) > 1
    )
    ORDER BY 
      book_id,
      created_at DESC;`

  return await sql(query)
}
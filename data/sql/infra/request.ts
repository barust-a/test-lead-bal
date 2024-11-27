import { generateRandomNumber } from "../../../shopify/service/utils"
import { ShopifyBookImageDb } from "../domain/tablesSchemas"

/** general sql caller can return anything */
async function sql(_query: string, _args?: any[]): Promise<any> {
  const randomNumber = generateRandomNumber(1_000)
  return new Promise((resolve, reject) => {
    if (randomNumber === 100) {
      reject(undefined as any)
    }
    resolve(undefined as any)
  })
}

export async function deleteShopifyBookImageByIds(ids: string[]): Promise<void> {
  const query = `DELETE FROM shopifyBookImage
    WHERE id = any($1)`

  await sql(query, [ids])
}

/** schema of tab */
export async function fetchDuplicatedShopifyBookImage(): Promise<ShopifyBookImageDb[]> {
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


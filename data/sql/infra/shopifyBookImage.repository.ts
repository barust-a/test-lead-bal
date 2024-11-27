import { ShopifyBookImageDb } from "../domain/tablesSchemas"
import { sql } from "./request"

export async function deleteShopifyBookImageByIds(imageIds: string[]): Promise<void> {
  const query = `DELETE FROM shopifyBookImage
    WHERE image_id = any($1)`

  await sql(query, [imageIds])
}

/** it select all group excluding last one to avoid deleting image that we dont want */
export async function fetchDuplicatedShopifyBookImage(limit: number): Promise<ShopifyBookImageDb[]> {
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
    created_at DESC
  LIMIT $1`

  return await sql(query, [limit])
}

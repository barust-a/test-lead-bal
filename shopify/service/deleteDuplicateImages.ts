import { ShopifyBookImageDb } from "../../data/sql/domain/tablesSchemas";
import { fetchDuplicatedShopifyBookImage } from "../../data/sql/infra/request";
import { groupBy, sortBy } from "./utils";


export async function deleteDuplicateImages(): Promise<void> {
  const duplicateImages = await fetchDuplicatedShopifyBookImage()
  const groupedByBookId = groupBy(duplicateImages, 'book_id')
  for (const bookId of groupedByBookId) {
    const booksToDelete = filterImageToDelete(groupedByBookId[bookId])

  }

}

function filterImageToDelete(bookImage: ShopifyBookImageDb[]): ShopifyBookImageDb[] {
  const sorted = sortBy(bookImage, 'desc')
  return sorted.shift() // remove not to delete
}
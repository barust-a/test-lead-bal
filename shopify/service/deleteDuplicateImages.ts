import { ShopifyBookImageDb } from "../../data/sql/domain/tablesSchemas";
import { deleteShopifyBookImageByIds, fetchDuplicatedShopifyBookImage } from "../../data/sql/infra/shopifyBookImage.repository";
import { deleteImageFromShopify } from "../infra/shopifyApi";
import { groupBy, sortBy } from "./utils";


/** everything is sorted by desc  */
export async function deleteDuplicateImagesController(): Promise<void> {
  const duplicateImages = await fetchDuplicatedShopifyBookImage(1000)
  const filtered = removeIncompleteGroup(duplicateImages) // due to limit teh last group may be incomplete

  const groupedByBookId = groupBy(filtered, 'book_id')
  for (const bookId of groupedByBookId) {
    const imagesToDelete = extractImagesToDelete(groupedByBookId[bookId])
    await callDeleteImageApiAndDeleteRowInDB(imagesToDelete)
  }

}

function removeIncompleteGroup(bookImages: ShopifyBookImageDb[]): ShopifyBookImageDb[] {
  const sorted = sortBy(bookImages, 'desc', 'created_at')
  const lastBookId = sorted[sorted.length - 1].book_id
  const filtered = sorted.filter((b) => b.book_id !== lastBookId)
  return filtered
}

function extractImagesToDelete(bookImages: ShopifyBookImageDb[]): ShopifyBookImageDb[] {
  const sorted = sortBy(bookImages, 'desc', 'created_at')
  return sorted.shift() // remove not to delete
}


async function callDeleteImageApiAndDeleteRowInDB(bookImages: ShopifyBookImageDb[]): Promise<void> {
  for (const bookImage of bookImages) {
    const isSuccess = await deleteImageFromShopify(bookImage.image_id)
    if (isSuccess) {
      await deleteShopifyBookImageByIds([bookImage.image_id])
    }
  }
}
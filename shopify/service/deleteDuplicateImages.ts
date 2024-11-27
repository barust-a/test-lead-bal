import { ShopifyBookImageDb } from "../../data/sql/domain/tablesSchemas";
import { deleteShopifyBookImageByIds, fetchDuplicatedShopifyBookImage } from "../../data/sql/infra/shopifyBookImage.repository";
import { deleteImageFromShopify } from "../infra/shopifyApi";
import { groupBy, sortBy } from "./utils";


export async function deleteDuplicateImagesController(): Promise<void> {
  const duplicateImages = await fetchDuplicatedShopifyBookImage()
  const groupedByBookId = groupBy(duplicateImages, 'book_id')
  for (const bookId of groupedByBookId) {
    const booksToDelete = filterImageToDelete(groupedByBookId[bookId])
    await callDeleteImageApiAndDeleteRowInDB(booksToDelete)
  }

}

function filterImageToDelete(bookImages: ShopifyBookImageDb[]): ShopifyBookImageDb[] {
  const sorted = sortBy(bookImages, 'desc')
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
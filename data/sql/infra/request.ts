import { generateRandomNumber } from "../../../shopify/service/utils"
import { ShopifyBookImageDb } from "../domain/tablesSchemas"

/** general sql caller can return anything */
export async function sql(_query: string, _args?: any[]): Promise<any> {
  const randomNumber = generateRandomNumber(1_000)
  return new Promise((resolve, reject) => {
    if (randomNumber === 100) {
      reject(undefined as any)
    }
    resolve(undefined as any)
  })
}



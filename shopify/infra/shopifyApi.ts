import { generateRandomNumber } from "../service/utils";

/** in this mock we take part that we handle api error throwing with try catch so it can not throw errors */
export async function deleteImageFromShopify(_imageId: string): Promise<boolean> {
  const randomNumber = generateRandomNumber(10)
  return new Promise((resolve) => {
    setTimeout(() => {
      if (randomNumber === 3) {
        resolve(false)
      }
      resolve(true);
    }, 300);
  })
}


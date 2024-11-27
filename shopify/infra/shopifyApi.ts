/** in this mock we take part that we handle api error throwing with try catch so it can not throw errors */
async function deleteImageFromShopify(_imageId: string): Promise<boolean> {
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

/** generate random between 0 and N */
function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max)
}
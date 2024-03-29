import { client } from "../lib/client"

const getBannerData = async () => {
  const query = `*[_type == "banner_images"]`
  try {
    const bannerData = await client.fetch(query)
    return bannerData
  } catch (error) {
    console.log("Lỗi truy vấn hình ảnh banner")
  }
}
export {getBannerData}
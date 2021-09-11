import Cors from "cors"
import initMiddleware from "@utils/initMiddleware"

const corsMiddleware = initMiddleware(
  Cors({
    origin: "https://slice.so",
  })
)
export default corsMiddleware

// Alternative
// origin: function (origin, callback) {
//   if (whitelist.indexOf(origin) !== -1) {
//     callback(null, true)
//   } else {
//     callback(new Error("Not allowed by CORS"))
//   }
// },

import productImages from "../Data/productImages.json";
import { makeImageHelpers } from "./imageCore.js";

export const { cld, cldSrcSet } = makeImageHelpers(productImages);

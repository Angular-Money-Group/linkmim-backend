import basicInfo from "./basicInfo";
import components from "./components";
import { paths } from "./paths";
import servers from "./servers";
import tags from "./tags";

export const docs = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...paths
}

export default { docs };
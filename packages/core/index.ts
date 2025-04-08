import { makeInstaller } from "@Isteyft-ui/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components  from "./components";
import '@Isteyft-ui/theme/index.css'

library.add(fas);
const installer = makeInstaller(components);

export * from "@Isteyft-ui/components";
export default installer;
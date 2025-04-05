import { makeInstaller } from "@Isteyft-ui/utils";
import components  from "./components";
import '@Isteyft-ui/theme/index.css'

const installer = makeInstaller(components);

export * from "@Isteyft-ui/components";
export default installer;
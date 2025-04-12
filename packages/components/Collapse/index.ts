import Collapse from "./Collapse.vue";
import { withInstall } from '@isteyft-ui/utils'
 import CollapseItem from "./CollapseItem.vue";
 
 export const ICollapse = withInstall(Collapse)
 export const ICollapseItem = withInstall(CollapseItem)
 
 export * from './types'
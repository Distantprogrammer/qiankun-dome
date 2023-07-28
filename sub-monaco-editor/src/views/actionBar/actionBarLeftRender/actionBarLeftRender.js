// 导入Vue库
import { h ,reactive} from 'vue';
import { actionBarLeftRenderData } from '@/data/actionBarLeftRenderData.js'
import { renderNode } from '@/utils/render.js'
// 创建App组件
export function render() {
    return h(
      'div',
      {
        class: 'left_bar'
      },
      actionBarLeftRenderData.map(renderNode)
    );
}

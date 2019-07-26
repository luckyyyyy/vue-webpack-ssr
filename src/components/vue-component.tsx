/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { Vue } from 'vue-property-decorator';

export default class VueComponent<TProps= {}> extends Vue {
  public readonly $props!: TProps
}

export default {
  size: 'small',
  expand: false,
  index: true,
  border: true,
  selection: true,
  column: [
    {
      label: 'id',
      prop: 'id',
      span: 24,
      search: true
    },
    {
      label: '客户名称',
      prop: 'customerName'
    },
    {
      label: '客户状态',
      prop: 'customerStatus'
    },
    {
      label: '联系人姓名',
      prop: 'contactName'
    },
    {
      label: '联系人电话',
      prop: 'contactPhone'
    },
    {
      label: '客户意向标签',
      prop: 'customerIntentionTag'
    },
    {
      label: '最近跟进时间',
      prop: 'lastFollowupTime'
    },
    {
      label: '跟进次数',
      prop: 'followupCount'
    },
    {
      label: '客户所在城市',
      prop: 'customerCity'
    },
    {
      label: '手机号归属地',
      prop: 'phoneLocation'
    },
    {
      label: '商机负责人ID',
      prop: 'businessOwnerId'
    },
    {
      label: '来源渠道',
      prop: 'sourceChannel'
    },
    {
      label: '留资方式',
      prop: 'leadGenerationMethod'
    },
    {
      label: '推广站点_url',
      prop: 'promotionalSiteUrl'
    },
    {
      label: '介绍人姓名',
      prop: 'referrerName'
    },
    {
      label: '销售负责人ID',
      prop: 'salesOwnerId'
    },
    {
      label: '搜索关键词',
      prop: 'searchKeywords'
    },
    {
      label: '推广关键词',
      prop: 'promotionalKeywords'
    },
    {
      label: '搜索引擎',
      prop: 'searchEngine'
    },
    {
      label: '备注',
      prop: 'remark'
    },
    {
      label: '状态',
      prop: 'status'
    },
    {
      label: '审核状态',
      prop: 'auditStatus'
    },
    {
      label: '排序号',
      prop: 'sort',
      display: false
    },
    {
      label: '创建人',
      prop: 'createUser',
      display: false
    },
    {
      label: '创建部门',
      prop: 'createDept',
      display: false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      display: false
    },
    {
      label: '修改时间',
      prop: 'updateTime',
      display: false
    },
    {
      label: '修改人',
      prop: 'updateUser',
      display: false,
      hide: true
    },
    {
      label: '租户id',
      prop: 'tenantId',
      display: false,
      hide: true
    },
    {
      label: '是否已删除',
      prop: 'isDeleted',
      display: false,
      hide: true
    }
  ]
}

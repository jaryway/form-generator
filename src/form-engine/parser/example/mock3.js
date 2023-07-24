export const formData3 = {
  fields: [
    {
      optionsModel: 1,
      filterable: true,
      clearable: true,
      visibility: true,
      editable: true,
      multiple: true,
      typeName: '下拉复选框',
      description: '',
      linkValue: ['1631472558016991234', '1682036142463430657', '1682036142601842690'],
      readonly: false,
      style: { width: '254px', maxWidth: '100%' },
      typeId: 'SELECT-MULTIPLE',
      conditionType: 6,
      dataLink: {
        condition: [
          { condition: '', field: '', typeId: '', type: 0, autoText: '', curFormFieldId: '', curFormTypeId: '' }
        ],
        linkVModel: '',
        linkForm: '',
        type: 0,
        subFields: []
      },
      placeholder: '请选择产品类型',
      config: {
        defaultValue: [],
        multiple: true,
        label: '产品类型',
        required: true,
        showLabel: true,
        renderKey: 'gwOqUgB1689863528708',
        layout: 'colFormItem',
        displayType: true,
        showDefaultValue: false,
        tagIcon: 'select',
        changeTag: true,
        tag: 'el-select',
        span: 24
      },
      __slot__: { options: [] },
      vModel: 'fieldgwOqUgB1689863528708'
    },
    {
      notChild: true,
      fieldDisplayRules: [],
      visibility: true,
      editable: true,
      typeName: '子表单',
      description: '',
      readonly: false,
      children: [
        {
          visibility: true,
          editable: true,
          typeName: '单行文本',
          description: '',
          label: '子表单--单行文本',
          limitRepeat: 0,
          repeatReminderText: '此项内容已存在，不允许重复提交',
          parentKey: 'fieldvGVUngB1689999372531',
          readonly: false,
          style: { width: '254px', maxWidth: '100%' },
          typeId: 'INPUT',
          placeholder: '请输入',
          config: {
            defaultValue: '',
            typeOption: [
              { label: '无', value: 'text' },
              { label: '手机号码', value: 'phoneNumber' },
              { label: '电话号码', value: 'tel' },
              { label: '邮政编码', value: 'zipCode' },
              { label: '身份证号码', value: 'idNumber' },
              { label: '邮箱', value: 'email' }
            ],
            format: 'text',
            label: '单行文本',
            defaultValueSource: { id: '', type: 0 },
            required: true,
            showLabel: true,
            renderKey: 'UTDVngB1689999465005',
            layout: 'colFormItem',
            displayType: true,
            tagIcon: 'input',
            changeTag: true,
            tag: 'el-input',
            defaultValueType: 0,
            span: 24
          },
          vModel: 'fieldUTDVngB1689999465005'
        },
        {
          optionsModel: 2,
          filterable: true,
          clearable: true,
          visibility: true,
          editable: true,
          multiple: false,
          typeName: '下拉框',
          description: '',
          label: '子表单--下拉框',
          limitRepeat: 0,
          repeatReminderText: '此项内容已存在，不允许重复提交',
          linkValue: {},
          parentKey: 'fieldvGVUngB1689999372531',
          readonly: false,
          style: { width: '254px', maxWidth: '100%' },
          typeId: 'SELECT',
          conditionType: 5,
          dataLink: {
            condition: [
              {
                condition: 2,
                curFormParentKey: 'fieldvGVUngB1689999372531',
                field: '1682037576894427138',
                typeId: 'INPUT',
                type: 0,
                autoText: '',
                curFormFieldId: 'fieldUTDVngB1689999465005',
                curFormTypeId: 'INPUT'
              }
            ],
            linkVModel: 'fielddVUtUgB1689863965386',
            linkForm: ['1631472558016991234', '1682037576756015106'],
            type: 0,
            subFields: []
          },
          placeholder: '请选择',
          config: {
            defaultValue: '',
            label: '下拉框',
            required: true,
            showLabel: true,
            renderKey: 'OebUngB1689999390019',
            layout: 'colFormItem',
            displayType: true,
            showDefaultValue: false,
            tagIcon: 'select',
            changeTag: true,
            tag: 'el-select',
            span: 24
          },
          __slot__: { options: [] },
          vModel: 'fieldOebUngB1689999390019'
        }
      ],
      tableList: [],
      style: { width: '254px', maxWidth: '100%' },
      typeId: 'CHILD_FORM',
      value: [{ fieldUTDVngB1689999465005: '', fieldOebUngB1689999390019: '' }],
      config: {
        label: '子表单',
        defaultValueSource: { id: '', type: 0 },
        showLabel: true,
        renderKey: 'vGVUngB1689999372531',
        layout: 'rowFormItem',
        displayType: true,
        showDefaultValue: true,
        tagIcon: 'input',
        showRequired: false,
        changeTag: true,
        tag: 'my-table',
        defaultValueType: 0,
        span: 24
      },
      __slot__: { dataList: [] },
      vModel: 'fieldvGVUngB1689999372531'
    },
    {
      readonly: false,
      visibility: true,
      editable: true,
      typeName: '单行文本',
      description: '',
      style: { width: '254px', maxWidth: '100%' },
      typeId: 'INPUT',
      limitRepeat: 0,
      placeholder: '请输入产品名称',
      config: {
        defaultValue: '',
        typeOption: [
          { label: '无', value: 'text' },
          { label: '手机号码', value: 'phoneNumber' },
          { label: '电话号码', value: 'tel' },
          { label: '邮政编码', value: 'zipCode' },
          { label: '身份证号码', value: 'idNumber' },
          { label: '邮箱', value: 'email' }
        ],
        format: 'text',
        label: '产品名称',
        defaultValueSource: { id: '', type: 0 },
        required: true,
        showLabel: true,
        renderKey: 'HBzpUgB1689863485115',
        layout: 'colFormItem',
        displayType: true,
        tagIcon: 'input',
        changeTag: true,
        tag: 'el-input',
        defaultValueType: 0,
        span: 24
      },
      vModel: 'fieldHBzpUgB1689863485115',
      repeatReminderText: '此项内容已存在，不允许重复提交'
    },
    {
      optionsModel: 2,
      filterable: true,
      clearable: true,
      visibility: true,
      editable: true,
      multiple: false,
      typeName: '下拉框',
      description: '',
      limitRepeat: 0,
      repeatReminderText: '此项内容已存在，不允许重复提交',
      linkValue: {},
      readonly: false,
      style: { width: '254px', maxWidth: '100%' },
      typeId: 'SELECT',
      conditionType: 5,
      dataLink: {
        condition: [
          {
            condition: 2,
            field: '1682037576894427138',
            typeId: 'INPUT',
            type: 0,
            autoText: '',
            curFormFieldId: 'fieldeyAOVgB1689866865091',
            curFormTypeId: 'INPUT'
          }
        ],
        linkVModel: 'fielddVUtUgB1689863965386',
        linkForm: ['1631472558016991234', '1682037576756015106'],
        type: 0,
        subFields: []
      },
      placeholder: '请选择供应商选择',
      config: {
        defaultValue: '',
        label: '供应商选择',
        required: true,
        showLabel: true,
        renderKey: 'XwLPngB1689998644350',
        layout: 'colFormItem',
        displayType: true,
        showDefaultValue: false,
        tagIcon: 'select',
        changeTag: true,
        tag: 'el-select',
        span: 24
      },
      __slot__: { options: [] },
      vModel: 'fieldXwLPngB1689998644350'
    },
    {
      readonly: false,
      visibility: true,
      editable: true,
      typeName: '单行文本',
      description: '',
      style: { width: '254px', maxWidth: '100%' },
      typeId: 'INPUT',
      limitRepeat: 0,
      placeholder: '请输入规格',
      config: {
        defaultValue: '',
        typeOption: [
          { label: '无', value: 'text' },
          { label: '手机号码', value: 'phoneNumber' },
          { label: '电话号码', value: 'tel' },
          { label: '邮政编码', value: 'zipCode' },
          { label: '身份证号码', value: 'idNumber' },
          { label: '邮箱', value: 'email' }
        ],
        format: 'text',
        label: '规格',
        defaultValueSource: { id: '', type: 0 },
        required: true,
        showLabel: true,
        renderKey: 'bgDqUgB1689863498396',
        layout: 'colFormItem',
        displayType: true,
        tagIcon: 'input',
        changeTag: true,
        tag: 'el-input',
        defaultValueType: 0,
        span: 24
      },
      vModel: 'fieldbgDqUgB1689863498396',
      repeatReminderText: '此项内容已存在，不允许重复提交'
    },
    {
      visibility: true,
      editable: true,
      typeName: '单行文本',
      description: '',
      limitRepeat: 0,
      repeatReminderText: '此项内容已存在，不允许重复提交',
      readonly: false,
      style: { width: '254px', maxWidth: '100%' },
      typeId: 'INPUT',
      dataLink: {
        condition: [
          { condition: '', field: '', typeId: '', type: 0, autoText: '', curFormFieldId: '', curFormTypeId: '' }
        ],
        linkVModel: '',
        linkForm: '',
        type: 0,
        subFields: []
      },
      placeholder: '请输入供应商',
      config: {
        defaultValue: '',
        typeOption: [
          { label: '无', value: 'text' },
          { label: '手机号码', value: 'phoneNumber' },
          { label: '电话号码', value: 'tel' },
          { label: '邮政编码', value: 'zipCode' },
          { label: '身份证号码', value: 'idNumber' },
          { label: '邮箱', value: 'email' }
        ],
        format: 'text',
        label: '供应商',
        defaultValueSource: { id: '', type: 0 },
        required: false,
        showLabel: true,
        renderKey: 'eyAOVgB1689866865091',
        layout: 'colFormItem',
        displayType: true,
        tagIcon: 'input',
        changeTag: true,
        tag: 'el-input',
        defaultValueType: 0,
        span: 24
      },
      vModel: 'fieldeyAOVgB1689866865091'
    },
    {
      linkList: [
        {
          visible: 1,
          label: '供应名称',
          type: 0,
          parentId: 1,
          foreignId: 0,
          childrenFlag: 0,
          name: 'fielddVUtUgB1689863965386',
          typeId: 'INPUT',
          id: '1682037576894427138',
          vModel: 'fielddVUtUgB1689863965386'
        },
        {
          visible: 1,
          label: '地址',
          type: 0,
          parentId: 1,
          foreignId: 0,
          childrenFlag: 0,
          name: 'fieldlXYtUgB1689863976524',
          typeId: 'INPUT',
          id: '1682037576898621441',
          vModel: 'fieldlXYtUgB1689863976524'
        }
      ],
      visibility: true,
      canAdd: true,
      typeName: '关联查询',
      dataNum: 2,
      description: '',
      style: { maxWidth: '100%' },
      typeId: 'QUERY_CHECK',
      filterCond: [
        {
          condition: 2,
          value2: 'fieldeyAOVgB1689866865091',
          typeId: 'INPUT',
          type: 0,
          value: '1682037576894427138',
          typeDisabled: false
        }
      ],
      config: {
        dbTable: '1682037576756015106',
        label: '关联查询',
        showLabel: true,
        renderKey: 'dkcOVgB1689866939858',
        layout: 'colFormItem',
        dbFieldList: ['1682037576894427138', '1682037576898621441'],
        displayType: true,
        showDefaultValue: false,
        tagIcon: 'input',
        changeTag: true,
        tag: 'my-form',
        span: 24
      },
      linkedShowField: [],
      vModel: 'fielddkcOVgB1689866939858'
    }
  ],
  formConf: {
    dataFilterSetting: { cond: [], rel: 0 },
    description: '',
    disabled: false,
    fieldDisplayRules: [
      {
        displayFieldList: ['fieldbgDqUgB1689863498396'],
        conditionsList: [
          {
            condition: 12,
            typeId: 'INPUT',
            condValue: '上衣',
            id: 'fieldHBzpUgB1689863485115',
            label: '产品名称',
            value: ['上衣'],
            option: []
          }
        ],
        conditionsChoice: 1
      }
    ],
    formId: '1682035748354043906',
    formModel: 'formData',
    formRef: 'elForm',
    formRules: 'rules',
    formSubmissionValidation: [],
    frontEndEvents: [],
    labelPosition: 'top',
    labelWidth: 100,
    numberOfColumns: 24,
    size: 'mini',
    submitAssociationOperation: [],
    submitButtonState: 0,
    submitButtonText: '提交'
  }
}

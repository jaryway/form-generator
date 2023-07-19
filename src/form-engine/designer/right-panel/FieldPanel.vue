<template>
  <el-form size="small">
    <el-form-item v-if="activeData.config.label !== undefined">
      <div class="flex-between-center">
        <span>标题</span>
        <el-select
          v-if="multiple.includes(activeData.typeId) || single.includes(activeData.typeId)"
          v-model="activeData.typeId"
          :style="{ width: '110px' }"
          @change="tagChange"
          size="mini"
        >
          <el-option v-for="item in getChangeType()" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div v-else>
          <el-tag size="small" v-if="activeData.typeName">{{ activeData.typeName }}</el-tag>
        </div>
      </div>
      <el-input v-model="activeData.config.label" placeholder="请输入标题" @input="changeRenderKey" maxlength="30" />
      <el-checkbox v-model="activeData.config.showLabel">显示标题</el-checkbox>
    </el-form-item>
    <el-form-item v-if="!activeData.parentKey" label="描述信息">
      <FormTinymce :value="activeData.description" @input="(res) => (activeData.description = res)"></FormTinymce>
    </el-form-item>
    <el-form-item
      v-if="
        activeData.placeholder !== undefined &&
        activeData.placeholder !== '' &&
        activeData.typeId != 'SERIALNUMBER_INPUT'
      "
      label="提示文字"
    >
      <el-input v-model="activeData.placeholder" @input="changeRenderKey" maxlength="30" />
    </el-form-item>
    <el-form-item v-if="activeData.config.format !== undefined && activeData.config.format !== ''" label="格式">
      <el-select v-model="activeData.config.format" :style="{ width: '100%' }" @change="handleFormatChange">
        <el-option label="数值" :value="1" v-if="activeData.typeId == 'NUMBER_INPUT'" />
        <template v-else>
          <el-option
            v-for="item in activeData.config.typeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </template>
      </el-select>
      <div v-if="activeData.typeId == 'NUMBER_INPUT'" style="margin-top: 10px">
        <div>
          <el-checkbox v-model="activeData.config.showDecimal">保留小数位数</el-checkbox>
          <el-input-number
            v-if="activeData.config.showDecimal"
            v-model="activeData.precision"
            controls-position="right"
            :min="1"
            :max="6"
            class="tidecimal-nump"
          />
        </div>
        <el-checkbox v-model="activeData.config.showThousandsSeparator" v-if="activeData.config.format == 1">
          显示千分符
        </el-checkbox>
        <div
          class="tips"
          v-if="
            (activeData.config.format == 1 && activeData.config.showThousandsSeparator) || activeData.config.showDecimal
          "
        >
          {{ decimalNumTips }}{{ activeData.config.format == 2 ? '%' : '' }}
        </div>
      </div>
    </el-form-item>
    <el-form-item v-if="activeData.type !== undefined && activeData.typeId == 'PROVINCE_CITY'" label="类型">
      <el-select
        v-model="activeData.type"
        :style="{ width: '100%' }"
        placeholder="请选择"
        @change="handleAddressTypeChange"
      >
        <el-option
          v-for="(item, index) in activeData.__slot__.options"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <div v-if="['LINKED_DATA', 'QUERY_CHECK'].includes(activeData.typeId)">
      <el-form-item label="关联表">
        <el-select
          v-model="activeData.config.dbTable"
          filterable
          :style="{ width: '100%' }"
          @change="handleDBTableChange"
          class="mb8"
        >
          <el-option v-for="item in dbTableList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <div class="flex-between-center" style="margin-top: -10px">
          <span>{{ activeData.typeId == 'QUERY_CHECK' ? '显示字段' : '选择数据时的显示字段' }}</span>
          <!-- <el-popover placement="top-start" title="提示" width="200" trigger="hover" content="请先设置关联表!" v-if='!activeData.config.dbTable'>
                  <el-button type="text" class="el-icon-plus" slot="reference"></el-button>
                </el-popover> -->
          <el-popover
            placement="bottom-end"
            width="280"
            @hide="handleTableFieldsHide"
            @after-enter="handleTableFieldsEnter"
          >
            <div v-if="!activeData.config.dbTable">请先设置关联表</div>
            <div v-else>
              <el-input placeholder="搜索" v-model="filterText" maxlength="30" />
              <el-scrollbar style="height: 220px">
                <el-tree
                  :data="!activeData.parentKey ? dbTableFields : dbTableFields.filter((i) => i.typeId != 'CHILD_FORM')"
                  show-checkbox
                  node-key="id"
                  @check="handleTableFieldsCheck"
                  :expand-on-click-node="false"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="dbTableFieldsTree"
                  check-on-click-node
                />
                <!-- <el-tree :data="dbTableFields" show-checkbox node-key="id" :style="{ width: '100%' }" @check='handleTableFieldsCheck' ref='dbTableFieldsTree' :expand-on-click-node='false' default-expand-all :filter-node-method="filterNode" /> -->
              </el-scrollbar>
            </div>
            <el-button type="text" class="el-icon-plus" slot="reference"></el-button>
          </el-popover>
        </div>
        <el-tree
          :data="activeData.linkList"
          node-key="id"
          :style="{ width: '100%' }"
          ref="linkListTree"
          draggable
          @node-drop="handleDrop"
          :allow-drop="allowDrop"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <i class="el-icon-s-operation" />
              <i class="el-icon-delete" @click="handleDelLinkList(node, data)" />
            </span>
          </span>
        </el-tree>
        <div>
          <el-checkbox v-model="activeData.showTitle" v-if="activeData.typeId == 'LINKED_DATA'"
            >显示数据标题</el-checkbox
          >
        </div>
      </el-form-item>
      <el-form-item label="表单中的显示字段" v-if="activeData.typeId == 'LINKED_DATA'">
        <el-button
          :style="{ width: '100%' }"
          size="small"
          :class="{ 'el-icon-edit-outline': activeData.linkedShowField && activeData.linkedShowField.length > 0 }"
          @click="handleLinkedShowField"
        >
          {{ activeData.linkedShowField && activeData.linkedShowField.length > 0 ? ' 已' : '' }}设置表单中显示字段
        </el-button>
      </el-form-item>
      <el-form-item label="数据过滤">
        <el-button
          :style="{ width: '100%' }"
          size="small"
          :class="{ 'el-icon-edit-outline': activeData.filterCond && activeData.filterCond.length > 0 }"
          @click="handleFilterCond"
        >
          {{ activeData.filterCond && activeData.filterCond.length > 0 ? ' 已' : '' }}添加过滤条件
        </el-button>
      </el-form-item>
      <el-form-item label="数据填充规则" v-if="activeData.typeId == 'LINKED_DATA'">
        <el-button
          :style="{ width: '100%' }"
          size="small"
          :class="{ 'el-icon-edit-outline': activeData.linkedFillRules && activeData.linkedFillRules.length > 0 }"
          @click="handleLinkedAddFillRules"
        >
          {{ activeData.linkedFillRules && activeData.linkedFillRules.length > 0 ? ' 已' : '' }}设置填充规则
        </el-button>
      </el-form-item>
      <el-form-item label="显示数据条数" v-if="activeData.typeId == 'QUERY_CHECK' && !activeData.parentKey">
        <el-radio-group v-model="activeData.dataNum" :style="{ width: '100%' }">
          <el-radio :label="1">一条</el-radio>
          <el-radio :label="2">多条</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关联表操作" v-if="!activeData.parentKey">
        <p v-if="activeData.dataNum == 1" :style="{ width: '100%' }">仅显示一条数据时不支持设置此项</p>
        <el-checkbox
          v-model="activeData.canAdd"
          v-if="activeData.dataNum > 1 || activeData.typeId == 'LINKED_DATA'"
          :style="{ width: '100%' }"
        >
          允许新增关联表数据
        </el-checkbox>
      </el-form-item>
    </div>

    <el-form-item
      v-if="activeData.optionalRange !== undefined || activeData.config.optionalRange !== undefined"
      label="可选范围"
    >
      <el-select
        v-model="activeData.optionalRange"
        :style="{ width: '100%' }"
        @change="handleOptionalRangeChange"
        class="mb8"
      >
        <template v-if="activeData.typeId.indexOf('DEPT') >= 0">
          <el-option v-for="(item, index) in rangeOpt" :key="index" :label="item.label" :value="item.value" />
        </template>
        <template v-else>
          <el-option label="自定义" :value="0" />
          <el-option label="由部门字段确定" :value="1" />
        </template>
      </el-select>
      <div v-if="!activeData.optionalRange" class="btn-mask">
        <!-- <el-button :style="{ width: '100%' }" size='small'>设置</el-button> -->
        <org-select
          v-model="activeData.listRange"
          :tabType="activeData.typeId.indexOf('DEPT') >= 0 ? [1] : [0, 1]"
          :multiple="true"
        />
      </div>
      <div v-else class="col-box">
        <el-button
          :style="{ width: '100%' }"
          size="small"
          v-if="activeData.typeId.indexOf('DEPT') >= 0"
          @click="handleDataChoice"
        >
          数据联动设置
        </el-button>
        <div v-else>
          <div v-if="deptFields.length > 0" class="flex-col-start">
            <el-checkbox
              v-for="(item, idx) in deptFields"
              :key="item.vModel"
              v-model="item.checked"
              @change="handleDeptFieldsChange($event, idx)"
              >{{ item.config.label }}</el-checkbox
            >
          </div>
          <p class="input-tips" v-else>表单中没有部门字段</p>
        </div>
      </div>
    </el-form-item>

    <el-form-item v-if="activeData.children && activeData.children.length > 0" label="">
      <p>子字段</p>
      <div style="width: 100%">
        <draggable :animation="340" :list="activeData.children" group="selectItem" handle=".option-drag">
          <div v-for="(item, index) in activeData.children" :key="index" class="select-item">
            <el-input v-model="item.config.label" placeholder="选项名" size="small" readonly />
            <div class="select-line-icon option-drag">
              <i class="el-icon-s-operation" />
            </div>
            <div class="select-line-icon" @click="activeData.children.splice(index, 1)">
              <i class="el-icon-delete" />
            </div>
          </div>
        </draggable>
      </div>
      <div>
        <el-button icon="el-icon-circle-plus" type="text" @click="showOptions = true"> 添加子字段 </el-button>
        <!-- <el-cascader-panel :options="testOptions" v-if='showOptions' style="width:50%"></el-cascader-panel> -->
      </div>
    </el-form-item>
    <el-form-item v-if="activeData.vModel !== undefined && activeData.config.showDefaultValue !== false" label="默认值">
      <div v-if="activeData.parentKey && canSetDefaultVal" class="disable-content-tip flex">
        以子表单联动为准，不支持设置默认值
      </div>
      <div v-else>
        <div v-if="activeData.typeId == 'PROVINCE_CITY'">
          <province-city @input="handleAddressInput" v-model="activeData.config.defaultValue" />
          <el-input
            type="textarea"
            placeholder="请填写详细地址"
            v-model="activeData.detailsValue"
            maxlength="200"
            v-if="activeData.type == 2"
            style="width: 70%; margin-left: 54px; margin-top: 10px"
          />
        </div>
        <div
          v-else-if="
            [
              'INPUT',
              'TEXTAREA',
              'NUMBER_INPUT',
              'DATE',
              'CHILD_FORM',
              'MEMBER_RADIO',
              'MEMBER_CHECK',
              'DEPT_RADIO',
              'DEPT_CHECK',
              'INPUT_MAP'
            ].includes(activeData.typeId)
          "
        >
          <el-select
            v-model="activeData.config.defaultValueType"
            class="mb8"
            style="width: 100%"
            @change="setCurrentDate"
          >
            <el-option v-if="activeData.typeId == 'DATE'" label="当前时间" :value="3" />
            <el-option v-for="item in defaultValOpt" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            <el-option
              v-if="['INPUT', 'TEXTAREA', 'NUMBER_INPUT', 'DATE'].includes(activeData.typeId)"
              label="公式编辑"
              :value="2"
            />
            <el-option
              v-if="['MEMBER_RADIO', 'MEMBER_CHECK'].includes(activeData.typeId)"
              label="当前用户"
              :value="3"
            />
            <el-option
              v-if="['DEPT_RADIO', 'DEPT_CHECK'].includes(activeData.typeId)"
              label="当前用户所在部门"
              :value="3"
            />
          </el-select>
          <div v-if="!activeData.config.defaultValueType">
            <el-date-picker
              v-model="activeData.config.defaultValue"
              :type="activeData.type"
              v-if="activeData.typeId == 'DATE'"
              style="width: 100%"
              value-format="yyyy-MM-dd"
            />
            <el-input-number
              v-model="num"
              v-else-if="activeData.typeId == 'NUMBER_INPUT'"
              :controls="false"
              style="width: 100%"
              @change="handleNumChange"
              :key="num"
            ></el-input-number>
            <!-- <el-input v-model='activeData.config.defaultValue' ref='ele' oninput="value=value.replace(/^((0|0(\.0*[1-9]+0*)?)|([1-9]\d*)(\.\d+)?)$/g,'')" v-else-if='activeData.typeId=="NUMBER_INPUT"'/> -->
            <el-select
              v-model="activeData.config.auto"
              v-else-if="activeData.typeId == 'INPUT_MAP'"
              clearable
              style="width: 100%"
            >
              <el-option v-for="item in mapOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div v-else-if="['MEMBER_RADIO', 'MEMBER_CHECK', 'DEPT_RADIO', 'DEPT_CHECK'].includes(activeData.typeId)">
              <org-select
                v-model="activeData.config.defaultValue"
                :tabType="activeData.typeId.indexOf('MEMBER') >= 0 ? [0] : [1]"
                :multiple="activeData.typeId.indexOf('CHECK') >= 0"
              />
            </div>
            <el-button
              :style="{ width: '100%' }"
              size="small"
              v-else-if="['CHILD_FORM'].includes(activeData.typeId)"
              @click="dialogDefaultValVisible = true"
              >设置</el-button
            >
            <el-input
              :value="setDefaultValue(activeData.config.defaultValue)"
              placeholder="请输入默认值"
              @input="onDefaultValueInput"
              maxlength="200"
              v-else
            />
          </div>
          <div v-if="activeData.config.defaultValueType == 1">
            <span class="input-tips" v-if="activeData.linkVModel">字段由关联数据赋值，无法设置公式联动</span>
            <el-button :style="{ width: '100%' }" size="small" @click="handleDataChoice" v-else>数据联动设置</el-button>
          </div>
          <div v-if="activeData.config.defaultValueType == 2">
            <!-- <span class="input-tips" v-if='activeData.linkVModel'>字段由关联数据赋值，无法设置公式联动</span> -->
            <el-button :style="{ width: '100%' }" size="small" @click="handleFormula">{{
              activeData && activeData.formulaData && activeData.formulaData.length > 0 ? '已设置公式' : '编辑公式'
            }}</el-button>
          </div>
        </div>
        <el-input
          :value="setDefaultValue(activeData.config.defaultValue)"
          placeholder="请输入默认值"
          @input="onDefaultValueInput"
          maxlength="200"
          v-else
        />
      </div>
    </el-form-item>

    <!-- <el-form-item v-if="activeData.typeId == 'CHILD_FORM'" label="子字段显隐规则">
            <el-button :style="{ width: '100%' }" size='small' @click="handleAddShowHideRules">添加显隐规则</el-button>
          </el-form-item> -->

    <el-form-item v-if="activeData.config.limitRange !== undefined" label="">
      <el-checkbox v-model="activeData.config.limitRange">限定数值范围</el-checkbox>
      <div v-if="activeData.config.limitRange">
        <el-input-number v-model="activeData.min" :controls="false" placeholder="不限" />
        ~
        <el-input-number v-model="activeData.max" :controls="false" placeholder="不限" />
      </div>
    </el-form-item>
    <template v-if="activeData.typeId == 'SERIALNUMBER_INPUT'">
      <div class="mb18">
        <p>流水号规则</p>
        <draggable :animation="340" :list="activeData.serialNumberRule" group="selectItem" handle=".option-drag">
          <div v-for="(item, index) in activeData.serialNumberRule" :key="index" class="select-item">
            <div class="rules-item" @click="handlerules(item)">
              <span class="name">{{ item.name }}</span>
              <el-input
                v-model="item.fixedCharacter"
                v-if="item.ruleType == 2"
                maxlength="10"
                style="width: 150px; display: inline-block"
              ></el-input>
              <span v-else>{{ item.label }}</span>
              <i class="el-icon-edit-outline rules-icon" v-if="!item.ruleType"></i>
            </div>
            <div class="select-line-icon option-drag">
              <i class="el-icon-s-operation" />
            </div>
            <div class="select-line-icon" v-if="item.ruleType" @click="activeData.serialNumberRule.splice(index, 1)">
              <i class="el-icon-delete" />
            </div>
          </div>
        </draggable>
        <el-dropdown :hide-on-click="false" trigger="click" @command="handleRulesCommand">
          <el-button icon="el-icon-circle-plus-outline" type="text">添加</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="item.value"
              v-for="item in serialNumberRulesOpts"
              :key="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="mb18">
        <p>流水号重置</p>
        <div>
          <div v-if="formConf.formId && curSerialNumObj.hasValued">
            <p>已计数到{{ curSerialNumObj.current }},下一条数据提交时计数值为{{ curSerialNumObj.next }}</p>
            <el-popover placement="top-end" width="280" v-model="visible">
              <p>重置后流水号将从您设置的初始值重新开始计数，此操作无法还原，是否确定重置？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="resetSerialNum">确定</el-button>
              </div>
              <el-button icon="el-icon-circle-plus-outline" style="padding-bottom: 0" type="text" slot="reference"
                >重置</el-button
              >
            </el-popover>
          </div>
          <p v-else>
            暂未开始计数，下一条数据提交时计数值为{{
              formConf.formId ? curSerialNumObj.initialValue : activeData.serialNumberRule[0].initialValue
            }}
          </p>
        </div>
      </div>
    </template>
    <template v-if="activeData.typeId == 'TEXT_RECOGNITION'">
      <div class="mb18">
        <h3>识别内容</h3>
        <el-select v-model="activeData.type" :style="{ width: '100%' }" class="mb8">
          <el-option
            v-for="(item, index) in textRecognitionOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button size="mini"> 识别规则设置 </el-button>
      </div>
    </template>
    <el-form-item v-if="activeData['start-placeholder'] !== undefined" label="开始占位">
      <el-input v-model="activeData['start-placeholder']" placeholder="请输入占位提示" maxlength="30" />
    </el-form-item>
    <el-form-item v-if="activeData['end-placeholder'] !== undefined" label="结束占位">
      <el-input v-model="activeData['end-placeholder']" placeholder="请输入占位提示" />
    </el-form-item>
    <!-- <el-form-item v-if="activeData.config.span !== undefined" label="表单栅格">
            <el-slider v-model="activeData.config.span" :marks="{ 12: '' }" :max="24" :min="1" @change="spanChange" />
          </el-form-item> -->
    <el-form-item v-if="activeData.config.layout === 'rowFormItem' && activeData.gutter !== undefined" label="栅格间隔">
      <el-input-number v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
    </el-form-item>
    <el-form-item v-if="activeData.config.layout === 'rowFormItem' && activeData.type !== undefined" label="布局模式">
      <el-radio-group v-model="activeData.type">
        <el-radio-button label="default" />
        <el-radio-button label="flex" />
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeData.justify !== undefined && activeData.type === 'flex'" label="水平排列">
      <el-select v-model="activeData.justify" :style="{ width: '100%' }" placeholder="请选择水平排列">
        <el-option v-for="(item, index) in justifyOptions" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="activeData.align !== undefined && activeData.type === 'flex'" label="垂直排列">
      <el-radio-group v-model="activeData.align">
        <el-radio-button label="top" />
        <el-radio-button label="middle" />
        <el-radio-button label="bottom" />
      </el-radio-group>
    </el-form-item>
    <!--                    <el-form-item v-if="activeData.config.labelWidth!==undefined" label="标签宽度">-->
    <!--                        <el-input v-model.number="activeData.config.labelWidth" type="number"-->
    <!--                                  placeholder="请输入标签宽度"/>-->
    <!--                    </el-form-item>-->
    <!--                    <el-form-item v-if="activeData.style&&activeData.style.width!==undefined" label="组件宽度">-->
    <!--                        <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable/>-->
    <!--                    </el-form-item>-->

    <!-- <el-form-item v-if="activeData.config.tag === 'el-checkbox-group'" label="至少应选">
            <el-input-number :min="0" :value="activeData.min" placeholder="至少应选" @input="$set(activeData, 'min', $event ? $event : undefined)" />
          </el-form-item>
          <el-form-item v-if="activeData.config.tag === 'el-checkbox-group'" label="最多可选">
            <el-input-number :min="0" :value="activeData.max" placeholder="最多可选" @input="$set(activeData, 'max', $event ? $event : undefined)" />
          </el-form-item> -->
    <el-form-item v-if="activeData.__slot__ && activeData.__slot__.prepend !== undefined" label="前缀">
      <el-input v-model="activeData.__slot__.prepend" placeholder="请输入前缀" />
    </el-form-item>
    <el-form-item v-if="activeData.__slot__ && activeData.__slot__.append !== undefined" label="后缀">
      <el-input v-model="activeData.__slot__.append" placeholder="请输入后缀" />
    </el-form-item>
    <el-form-item v-if="activeData['prefix-icon'] !== undefined" label="前图标">
      <el-input v-model="activeData['prefix-icon']" placeholder="请输入前图标名称">
        <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')"> 选择 </el-button>
      </el-input>
    </el-form-item>
    <el-form-item v-if="activeData['suffix-icon'] !== undefined" label="后图标">
      <el-input v-model="activeData['suffix-icon']" placeholder="请输入后图标名称">
        <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')"> 选择 </el-button>
      </el-input>
    </el-form-item>
    <!-- <el-form-item v-if="
              activeData['icon'] !== undefined &&
              activeData.config.tag === 'el-button'" label="按钮图标">
            <el-input v-model="activeData['icon']" placeholder="请输入按钮图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item> -->
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="选项分隔符">
      <el-input v-model="activeData.separator" placeholder="请输入选项分隔符" />
    </el-form-item>
    <!-- <el-form-item v-if="activeData.autosize !== undefined" label="最小行数">
            <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="最小行数" />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="最大行数">
            <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="最大行数" />
          </el-form-item> -->
    <!-- <el-form-item v-if="isShowMin" label="最小值">
            <el-input-number v-model="activeData.min" placeholder="最小值" />
          </el-form-item>
          <el-form-item v-if="isShowMax" label="最大值">
            <el-input-number v-model="activeData.max" placeholder="最大值" />
          </el-form-item> -->
    <el-form-item v-if="activeData.height !== undefined" label="组件高度">
      <el-input-number v-model="activeData.height" placeholder="高度" @input="changeRenderKey" />
    </el-form-item>
    <!-- <el-form-item v-if="isShowStep" label="步长">
            <el-input-number v-model="activeData.step" placeholder="步数" />
          </el-form-item>
          <el-form-item v-if="activeData.config.tag === 'el-input-number'" label="精度">
            <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.config.tag === 'el-input-number'" label="按钮位置">
            <el-radio-group v-model="activeData['controls-position']">
              <el-radio-button label=""> 默认 </el-radio-button>
              <el-radio-button label="right"> 右侧 </el-radio-button>
            </el-radio-group>
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.maxlength !== undefined" label="输入上限" class='flex-form-item'>
            <el-input v-model="activeData.maxlength" placeholder="请输入字符长度" style="width:220px">
              <template slot="append"> 个字符 </template>
            </el-input>
          </el-form-item> -->
    <el-form-item v-if="activeData['active-text'] !== undefined" label="开启提示">
      <el-input v-model="activeData['active-text']" placeholder="请输入开启提示" />
    </el-form-item>
    <el-form-item v-if="activeData['inactive-text'] !== undefined" label="关闭提示">
      <el-input v-model="activeData['inactive-text']" placeholder="请输入关闭提示" />
    </el-form-item>
    <el-form-item v-if="activeData['active-value'] !== undefined" label="开启值">
      <el-input
        :value="setDefaultValue(activeData['active-value'])"
        placeholder="请输入开启值"
        @input="onSwitchValueInput($event, 'active-value')"
      />
    </el-form-item>
    <el-form-item v-if="activeData['inactive-value'] !== undefined" label="关闭值">
      <el-input
        :value="setDefaultValue(activeData['inactive-value'])"
        placeholder="请输入关闭值"
        @input="onSwitchValueInput($event, 'inactive-value')"
      />
    </el-form-item>
    <el-form-item v-if="activeData.type !== undefined && activeData.typeId == 'DATE'" label="类型">
      <el-select v-model="activeData.type" :style="{ width: '100%' }" placeholder="请选择" @change="dateTypeChange">
        <el-option v-for="(item, index) in dateOptions" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <!--          <el-form-item v-if="activeData.name !== undefined" label="文件字段名">-->
    <!--            <el-input v-model="activeData.name" placeholder="请输入上传文件字段名" />-->
    <!--          </el-form-item>-->
    <!-- <el-form-item v-if="activeData.accept !== undefined" label="文件类型">
            <el-select v-model="activeData.accept" :style="{ width: '100%' }" clearable placeholder="请选择文件类型">
              <el-option label="图片" value="image/*" />
              <el-option label="视频" value="video/*" />
              <el-option label="音频" value="audio/*" />
              <el-option label="excel" value=".xls,.xlsx" />
              <el-option label="word" value=".doc,.docx" />
              <el-option label="pdf" value=".pdf" />
              <el-option label="txt" value=".txt" />
            </el-select>
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.config.fileSize !== undefined" label="文件大小">
            <el-input v-model.number="activeData.config.fileSize" placeholder="请输入文件大小">
              <el-select slot="append" v-model="activeData.config.sizeUnit" :style="{ width: '66px' }">
                <el-option label="KB" value="KB" />
                <el-option label="MB" value="MB" />
                <el-option label="GB" value="GB" />
              </el-select>
            </el-input>
          </el-form-item> -->
    <!--          <el-form-item v-if="activeData.action !== undefined" label="上传地址">-->
    <!--            <el-input v-model="activeData.action" placeholder="请输入上传地址" clearable />-->
    <!--          </el-form-item>-->
    <!-- <el-form-item v-if="activeData['list-type'] !== undefined" label="列表类型">
            <el-radio-group v-model="activeData['list-type']" size="small">
              <el-radio-button label="text"> text </el-radio-button>
              <el-radio-button label="picture"> picture </el-radio-button>
              <el-radio-button label="picture-card">
                picture-card
              </el-radio-button>
            </el-radio-group>
          </el-form-item> -->
    <!-- <el-form-item v-if="
              activeData.type !== undefined &&
              activeData.config.tag === 'el-button'
            " label="按钮类型">
            <el-select v-model="activeData.type" :style="{ width: '100%' }">
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
              <el-option label="text" value="text" />
            </el-select>
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.config.buttonText !== undefined" v-show="'picture-card' !== activeData['list-type']" label="按钮文字">
            <el-input v-model="activeData.config.buttonText" placeholder="请输入按钮文字" />
          </el-form-item> -->
    <el-form-item v-if="activeData.config.tag === 'el-button'" label="按钮文字">
      <el-input v-model="activeData.__slot__.default" placeholder="请输入按钮文字" maxlength="10" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-button'" label="按钮样式">
      <el-popover placement="bottom-start" width="300" trigger="click">
        <div>
          <div class="pop_head">风格</div>
          <div class="pop_body flex-between-center mb10">
            <el-radio-group v-model="activeData.plain">
              <el-radio :label="true">
                <el-button type="primary" plain size="mini">按钮</el-button>
              </el-radio>
              <el-radio :label="false">
                <el-button type="primary" size="mini">按钮</el-button>
              </el-radio>
              <el-radio label="text">
                <el-button type="text" size="mini">按钮</el-button>
              </el-radio>
            </el-radio-group>
          </div>
          <div class="pop_head">形式</div>
          <div class="pop_body mb10">
            <el-checkbox v-model="activeData.type" true-label="text" false-label="">纯文字按钮</el-checkbox>
          </div>
          <div class="pop_head">颜色</div>
          <div class="pop_body flex-between-center">
            <el-radio-group v-model="activeData.type" :disabled="activeData.type == 'text'">
              <el-radio label="primary">
                <el-button type="primary" size="mini" round></el-button>
              </el-radio>
              <el-radio label="success">
                <el-button type="success" size="mini" round></el-button>
              </el-radio>
              <el-radio label="info">
                <el-button type="info" size="mini" round></el-button>
              </el-radio>
              <el-radio label="warning">
                <el-button type="warning" size="mini" round></el-button>
              </el-radio>
              <el-radio label="danger">
                <el-button type="danger" size="mini" round></el-button>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button slot="reference" style="width: 100%">{{ activeData.__slot__.default }}</el-button>
      </el-popover>
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-button'" label="执行动作">
      <el-button :style="{ width: '100%' }" size="small" @click="handleFormEvent('btnAction')">设置</el-button>
    </el-form-item>
    <el-form-item v-if="activeData['range-separator'] !== undefined" label="分隔符">
      <el-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
    </el-form-item>
    <el-form-item v-if="activeData['picker-options'] !== undefined" label="时间段">
      <el-input v-model="activeData['picker-options'].selectableRange" placeholder="请输入时间段" />
    </el-form-item>
    <!-- <el-form-item v-if="activeData.format !== undefined" label="时间格式">
            <el-input :value="activeData.format" placeholder="请输入时间格式" @input="setTimeValue($event)" />
          </el-form-item> -->
    <template
      v-if="
        ['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeData.config.tag) > -1 &&
        !['MEMBER_RADIO', 'MEMBER_CHECK', 'DEPT_RADIO', 'DEPT_CHECK'].includes(activeData.typeId)
      "
    >
      <el-divider>选项</el-divider>
      <el-select
        v-model="activeData.optionsModel"
        v-if="['SELECT', 'SELECT-MULTIPLE'].includes(activeData.typeId)"
        style="width: 100%"
        class="mb18"
        @change="changeOptionsModel"
      >
        <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <div v-if="activeData.optionsModel == 1">
        <el-cascader v-model="activeData.linkValue" :options="appAndFormAndFieldsTree" filterable></el-cascader>
      </div>
      <div v-else-if="activeData.optionsModel == 2">
        <el-button :style="{ width: '100%' }" size="small" @click="handleDataChoice">数据联动设置</el-button>
      </div>
      <div v-else class="options-box">
        <draggable :animation="340" :list="activeData.__slot__.options" group="selectItem" handle=".option-drag">
          <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
            <!-- <el-radio v-model="item.checked" v-if="['RADIO','SELECT'].includes(activeData.typeId)" @change="handleDefaultRadioOptsChange($event,index)"></el-radio> -->
            <el-checkbox
              v-model="item.checked"
              @change="handleDefaultOptsChange($event, index)"
              :key="activeData.vModel"
            ></el-checkbox>
            <el-input
              v-model="item.label"
              placeholder="选项名"
              size="small"
              :disabled="item.isOther"
              @input="handleOptsInput($event, item, index)"
              @change="handleInputChange($event, item, index)"
              maxlength="30"
            />
            <!-- <el-input placeholder="选项值" style="display: none" size="small" :value="item.value" readonly @input="setOptionValue(item, $event)" /> -->
            <div class="select-line-icon option-drag">
              <i class="el-icon-s-operation" v-if="!item.disabled" />
            </div>
            <div class="select-line-icon" @click="delSelectItem(index)">
              <i class="el-icon-delete" />
            </div>
          </div>
        </draggable>
        <div style="margin-left: 20px">
          <el-button icon="el-icon-circle-plus-outline" style="padding-bottom: 0" type="text" @click="addSelectItem">
            添加选项
          </el-button>
          <!--    <el-button
                  icon="el-icon-document-copy"
                  style="padding-bottom: 0"
                  type="text"
                  @click="blukAddSelectItems"
                >
                  批量贴入
                </el-button>-->
          <el-button
            v-if="['RADIO', 'SELECT'].indexOf(activeData.typeId) > -1"
            icon="el-icon-circle-plus-outline"
            style="padding-bottom: 0"
            type="text"
            @click="addSelectOtherItem"
          >
            添加其他
          </el-button>
        </div>
      </div>
      <el-divider />
    </template>

    <template v-if="['el-carousel'].indexOf(activeData.config.tag) > -1">
      <el-divider>选项</el-divider>
      <draggable :animation="340" :list="activeData.__slot__.options" group="selectItem" handle=".option-drag">
        <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation" />
          </div>
          <div class="width-full">
            <div class="flex-row">
              <el-input v-model="item.label" placeholder="选项名" size="small" />
              <div class="close-btn select-line-icon" @click="activeData.__slot__.options.splice(index, 1)">
                <i class="el-icon-remove-outline" />
              </div>
            </div>
            <div class="flex-row">
              <el-input v-model="item.image" placeholder="请输入图片url地址" size="small" />
              <el-upload
                ref="logoUpload"
                :action="getUploadUrl"
                :headers="getUploadHeader"
                :on-progress="uploadProgressHandle"
                :on-success="
                  (response, file, fileList) => {
                    item.image = response.data
                    $set(activeData.__slot__.options, index, item)
                    closeUploadProgressHandle()
                  }
                "
                :show-file-list="false"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                style="text-align: center"
              >
                <div slot="trigger" class="select-line-icon">
                  <i class="el-icon-upload" />
                </div>
              </el-upload>
            </div>
          </div>
        </div>
      </draggable>
      <div style="margin-left: 20px">
        <el-button
          icon="el-icon-circle-plus-outline"
          style="padding-bottom: 0"
          type="text"
          @click="addImageCarouselItem"
        >
          添加选项
        </el-button>
      </div>
      <el-divider />
    </template>
    <template v-if="['image-select'].indexOf(activeData.config.tag) > -1">
      <el-divider>选项</el-divider>
      <draggable :animation="340" :list="activeData.options" group="selectItem" handle=".option-drag">
        <div v-for="(item, index) in activeData.options" :key="index" class="select-item">
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation" />
          </div>
          <div class="width-full">
            <div class="flex-row">
              <el-input v-model="item.label" placeholder="选项名" size="small" />
              <div class="close-btn select-line-icon" @click="activeData.options.splice(index, 1)">
                <i class="el-icon-remove-outline" />
              </div>
            </div>
            <div class="flex-row">
              <el-input v-model="item.image" placeholder="请输入图片url地址" size="small" />
              <el-upload
                ref="logoUpload"
                :action="getUploadUrl"
                :headers="getUploadHeader"
                :on-progress="uploadProgressHandle"
                :on-success="
                  (response, file, fileList) => {
                    item.image = response.data
                    $set(activeData.options, index, item)
                    closeUploadProgressHandle()
                  }
                "
                :show-file-list="false"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                style="text-align: center"
              >
                <div slot="trigger" class="select-line-icon">
                  <i class="el-icon-upload" />
                </div>
              </el-upload>
            </div>
          </div>
        </div>
      </draggable>
      <div style="margin-left: 20px">
        <el-button icon="el-icon-circle-plus-outline" style="padding-bottom: 0" type="text" @click="addImageSelectItem">
          添加选项
        </el-button>
      </div>
      <el-divider />
    </template>
    <template v-if="['el-cascader'].indexOf(activeData.config.tag) > -1">
      <el-divider>选项</el-divider>
      <!--            <el-form-item label="数据类型">-->
      <!--              <el-radio-group v-model="activeData.config.dataType" size="small">-->
      <!--                <el-radio-button label="dynamic">-->
      <!--                  动态数据-->
      <!--                </el-radio-button>-->
      <!--                <el-radio-button label="static">-->
      <!--                  静态数据-->
      <!--                </el-radio-button>-->
      <!--              </el-radio-group>-->
      <!--            </el-form-item>-->

      <!--            <template v-if="activeData.config.dataType === 'dynamic'">-->
      <!--              <el-form-item label="接口地址">-->
      <!--                <el-input-->
      <!--                  v-model="activeData.config.url"-->
      <!--                  :title="activeData.config.url"-->
      <!--                  placeholder="请输入接口地址"-->
      <!--                  clearable-->
      <!--                >-->
      <!--                  <el-select-->
      <!--                    slot="prepend"-->
      <!--                    v-model="activeData.config.method"-->
      <!--                    :style="{width: '85px'}"-->
      <!--                  >-->
      <!--                    <el-option label="get" value="get" />-->
      <!--                    <el-option label="post" value="post" />-->
      <!--                    <el-option label="put" value="put" />-->
      <!--                    <el-option label="delete" value="delete" />-->
      <!--                  </el-select>-->
      <!--                </el-input>-->
      <!--              </el-form-item>-->
      <!--              <el-form-item label="数据位置">-->
      <!--                <el-input v-model="activeData.config.dataKey" placeholder="请输入标签键名" />-->
      <!--              </el-form-item>-->
      <!--              <el-form-item label="标签键名">-->
      <!--                <el-input v-model="activeData.props.props.label" placeholder="请输入标签键名" />-->
      <!--              </el-form-item>-->
      <!--              <el-form-item label="值键名">-->
      <!--                <el-input v-model="activeData.props.props.value" placeholder="请输入值键名" />-->
      <!--              </el-form-item>-->
      <!--              <el-form-item label="子级键名">-->
      <!--                <el-input v-model="activeData.props.props.children" placeholder="请输入子级键名" />-->
      <!--              </el-form-item>-->
      <!--            </template>-->
      <!-- 级联选择静态树 -->
      <el-tree
        v-if="activeData.config.dataType === 'static'"
        :data="activeData.options"
        :expand-on-click-node="false"
        :render-content="renderContent"
        :draggable="true"
        node-key="id"
      />
      <div v-if="activeData.config.dataType === 'static'" style="margin-left: 20px">
        <el-button icon="el-icon-circle-plus-outline" style="padding-bottom: 0" type="text" @click="addTreeItem">
          添加父级
        </el-button>
      </div>
      <el-divider />
    </template>

    <!-- <el-form-item v-if="activeData.config.optionType !== undefined" label="选项样式">
            <el-radio-group v-model="activeData.config.optionType">
              <el-radio-button label="default"> 默认 </el-radio-button>
              <el-radio-button label="button"> 按钮 </el-radio-button>
            </el-radio-group>
          </el-form-item> -->
    <el-form-item v-if="activeData['active-color'] !== undefined" label="开启颜色">
      <el-color-picker v-model="activeData['active-color']" />
    </el-form-item>
    <el-form-item v-if="activeData['inactive-color'] !== undefined" label="关闭颜色">
      <el-color-picker v-model="activeData['inactive-color']" />
    </el-form-item>

    <!-- <el-form-item v-if="
              activeData.config.showLabel !== undefined &&
              activeData.config.labelWidth !== undefined
            " label="显示标签">
            <el-switch v-model="activeData.config.showLabel" />
          </el-form-item> -->
    <el-form-item v-if="activeData.branding !== undefined" label="品牌烙印">
      <el-switch v-model="activeData.branding" @input="changeRenderKey" />
    </el-form-item>
    <el-form-item v-if="activeData['allow-half'] !== undefined" label="允许半选">
      <el-switch v-model="activeData['allow-half']" />
    </el-form-item>
    <el-form-item v-if="activeData['show-text'] !== undefined" label="辅助文字">
      <el-switch v-model="activeData['show-text']" @change="rateTextChange" />
    </el-form-item>
    <el-form-item v-if="activeData['show-score'] !== undefined" label="显示分数">
      <el-switch v-model="activeData['show-score']" @change="rateScoreChange" />
    </el-form-item>
    <el-form-item v-if="activeData['show-stops'] !== undefined" label="显示间断点">
      <el-switch v-model="activeData['show-stops']" />
    </el-form-item>
    <el-form-item v-if="activeData.range !== undefined" label="范围选择">
      <el-switch v-model="activeData.range" @change="rangeChange" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-color-picker'" label="颜色格式">
      <el-select
        v-model="activeData['color-format']"
        :style="{ width: '100%' }"
        clearable
        placeholder="请选择颜色格式"
        @change="colorFormatChange"
      >
        <el-option v-for="(item, index) in colorFormatOptions" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item v-if="
              activeData.size !== undefined &&
              (activeData.config.border ||
                activeData.config.tag === 'el-color-picker' ||
                activeData.config.tag === 'el-button')
            " label="组件尺寸">
            <el-radio-group v-model="activeData.size">
              <el-radio-button label="medium"> 中等 </el-radio-button>
              <el-radio-button label="small"> 较小 </el-radio-button>
              <el-radio-button label="mini"> 迷你 </el-radio-button>
            </el-radio-group>
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData['show-word-limit'] !== undefined" label="显示输入统计">
            <el-switch v-model="activeData['show-word-limit']" />
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.config.tag === 'el-input-number'" label="严格步数">
            <el-switch v-model="activeData['step-strictly']" />
          </el-form-item> -->
    <!--          <el-form-item-->
    <!--            v-if="activeData.config.tag === 'el-cascader'"-->
    <!--            label="任选层级"-->
    <!--          >-->
    <!--            <el-switch v-model="activeData.props.props.checkStrictly" />-->
    <!--          </el-form-item>-->
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="多选">
      <el-switch v-model="activeData.props.props.multiple" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="展示全路径">
      <el-switch v-model="activeData['show-all-levels']" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="筛选">
      <el-switch v-model="activeData.filterable" />
    </el-form-item>
    <!-- <el-form-item v-if="activeData.clearable !== undefined" label="清空">
            <el-switch v-model="activeData.clearable" />
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.config.showTip !== undefined" label="显示提示">
            <el-switch v-model="activeData.config.showTip" />
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.config.tag === 'el-upload'" label="多选文件">
            <el-switch v-model="activeData.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData.config.tag === 'el-upload'" label="文件个数">
            <el-input-number v-model="activeData.limit" />
          </el-form-item> -->
    <!--          <el-form-item v-if="activeData['auto-upload'] !== undefined" label="自动上传">-->
    <!--            <el-switch v-model="activeData['auto-upload']" />-->
    <!--          </el-form-item>-->

    <!--          <el-form-item-->
    <!--            v-if="activeData.disabled !== undefined"-->
    <!--            label="是否禁用"-->
    <!--          >-->
    <!--            <el-switch v-model="activeData.disabled" />-->
    <!--          </el-form-item>-->
    <!-- <el-form-item v-if="activeData.config.tag === 'el-select'" label="搜索">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.config.tag === 'el-select'" label="多选">
            <el-switch v-model="activeData.multiple" @change="multipleChange" />
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData['color'] !== undefined" label="颜色">
            <el-color-picker v-model="activeData['color']" />
          </el-form-item> -->
    <el-form-item v-if="activeData['textAlign'] !== undefined" label="对齐方式">
      <el-radio-group v-model="activeData.textAlign">
        <el-radio-button label="left"> 左对齐 </el-radio-button>
        <el-radio-button label="center"> 居中 </el-radio-button>
        <el-radio-button label="right"> 右对齐 </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="['RADIO', 'CHECKBOX'].includes(activeData.typeId)" label="排列方式">
      <el-radio-group v-model="activeData.segment">
        <el-radio-button label="vertical"> 纵向排列 </el-radio-button>
        <el-radio-button label="horizontal"> 横向排列 </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-image'" label="图片地址">
      <el-input v-model="activeData.src" placeholder="请输入图片url地址" />
      <el-upload
        ref="logoUpload"
        :action="getUploadUrl"
        :headers="getUploadHeader"
        :on-progress="uploadProgressHandle"
        :on-success="
          (response, file, fileList) => {
            activeData.src = response.data
            closeUploadProgressHandle()
          }
        "
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
        style="text-align: center"
      >
        <el-button slot="trigger" size="small" type="text">点击上传图片 *</el-button>
      </el-upload>
    </el-form-item>
    <div class="mb18" v-if="activeData.config.required !== undefined">
      <h3>校验</h3>
      <div>
        <el-checkbox
          v-model="activeData.config.required"
          v-if="activeData.config.required !== undefined && activeData.config.showRequired !== false"
          >必填</el-checkbox
        >
      </div>
      <div>
        <el-checkbox
          v-model="activeData.limitRepeat"
          :true-label="1"
          :false-label="0"
          v-if="activeData.typeId === 'INPUT' || activeData.typeId === 'SELECT'"
          >不允许重复值</el-checkbox
        >
      </div>
      <div v-if="activeData.limitRepeat">
        <el-input v-model="activeData.repeatReminderText" maxlength="30" placeholder="自定义提示内容"></el-input>
      </div>
      <div v-if="activeData.typeId == 'UPLOAD-IMG'">
        <el-checkbox v-model="activeData.setting.onlyOne">仅允许上传一张图片</el-checkbox>
        <el-checkbox v-model="activeData.setting.limit" class="mb8">设置单个图片大小上限</el-checkbox>
        <el-input-number
          v-model="activeData.expand.fileSize"
          :controls="false"
          :disabled="!activeData.setting.limit"
        />{{ activeData.expand.sizeUnit }}
      </div>
      <div v-if="activeData.typeId == 'UPLOAD-FILE'">
        <el-checkbox v-model="activeData.setting.onlyOne">仅允许上传单个</el-checkbox>
        <el-checkbox v-model="activeData.setting.accept">设置允许上传的文件格式</el-checkbox>
        <el-input
          type="textarea"
          v-model="activeData.expand.accept"
          v-if="activeData.setting.accept"
          placeholder="请输入文件格式，多个格式间请用英文逗号隔开"
          :autosize="{ minRows: 2, maxRows: 4 }"
          class="mb8 mt4"
          maxlength="60"
          show-word-limit
        ></el-input>
        <el-checkbox v-model="activeData.setting.limit" class="mb8">设置单个文件大小上限</el-checkbox>
        <el-input-number
          v-model="activeData.expand.fileSize"
          :controls="false"
          :disabled="!activeData.setting.limit"
        />{{ activeData.expand.sizeUnit }}
      </div>
      <el-form-item v-if="activeData.config.limitTargeting !== undefined" label="">
        <div>
          <el-checkbox v-model="activeData.config.limitTargeting" @change="handleLimitTargetingChange"
            >限制定位范围</el-checkbox
          >
        </div>
        <!-- <div>
                <el-select v-model="activeData.config.limitTargetingOpt" placeholder="请选择" :disabled='!activeData.config.limitTargeting'>
                  <el-option v-for="item in limitTargetingOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div> -->
        <div v-if="activeData.config.limitTargeting">
          <el-button @click="handleAddMapCenter" v-if="!activeData.mapCenter || activeData.mapCenter.length < 1"
            >新增定位中心</el-button
          >
          <p class="flex-between" v-else>
            <span>{{ activeData.mapCenter.at(-1) }}</span>
            <span
              ><i class="el-icon-edit" @click="handleAddMapCenter"></i
              ><i class="el-icon-close" @click="handleDeleteMapCenter"></i
            ></span>
          </p>
        </div>
      </el-form-item>
    </div>

    <!-- <div v-if='activeData.typeId=="INPUT_MAP"' class='flex-col-start mb18'>
            <h3>定位设置</h3>
            <el-checkbox v-model="activeData.showLatitudeAndLongitude">显示经纬度坐标</el-checkbox>
            <el-checkbox v-model="activeData.allowFineTuning" class='mb8'>允许微调</el-checkbox>
            <el-select v-model="activeData.fineTuningNum" size='mini' :disabled='!activeData.allowFineTuning'>
              <el-option v-for="item in distanceOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div> -->

    <div class="flex-col-start mb18" v-if="activeData.visibility !== undefined || activeData.readonly !== undefined">
      <h3>字段权限</h3>
      <!-- <span>已启用流程，字段权限以流程节点的设置为准</span> -->
      <div>
        <el-checkbox
          v-model="activeData.visibility"
          v-if="activeData.visibility !== undefined"
          @change="handleVisibilityChange"
        >
          可见
        </el-checkbox>
        <el-checkbox
          v-model="activeData.editable"
          v-if="activeData.editable !== undefined"
          @change="handleEditableChange"
        >
          可编辑
        </el-checkbox>
      </div>
    </div>

    <template v-if="activeData.config.span && !['CHILD_FORM'].includes(activeData.typeId)">
      <h3>字段宽度</h3>
      <el-radio-group v-model="activeData.config.span" size="small" :disabled="formConf.numberOfColumns == 24">
        <el-radio-button :label="6">1/4</el-radio-button>
        <el-radio-button :label="8">1/3</el-radio-button>
        <el-radio-button :label="12">1/2</el-radio-button>
        <el-radio-button :label="16">2/3</el-radio-button>
        <el-radio-button :label="18">3/4</el-radio-button>
        <el-radio-button :label="24">整行</el-radio-button>
      </el-radio-group>
    </template>

    <template v-if="activeData.config.layoutTree">
      <el-divider>布局结构树</el-divider>
      <el-tree
        :data="[activeData.config]"
        :props="layoutTreeProps"
        default-expand-all
        :draggable="true"
        node-key="renderKey"
      >
        <span slot-scope="{ node, data }">
          <span class="node-label">
            <svg-icon :name="data.config ? data.config.tagIcon : data.tagIcon" class="node-icon" />
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </template>

    <template v-if="Array.isArray(activeData.config.regList) && activeData.config.showRegList !== false">
      <el-divider>正则校验</el-divider>
      <div v-for="(item, index) in activeData.config.regList" :key="index" class="reg-item">
        <span class="close-btn" @click="activeData.config.regList.splice(index, 1)">
          <i class="el-icon-close" />
        </span>
        <el-form-item label="表达式">
          <el-input v-model="item.pattern" placeholder="请输入正则" />
        </el-form-item>
        <el-form-item label="错误提示" style="margin-bottom: 0">
          <el-input v-model="item.message" placeholder="请输入错误提示" />
        </el-form-item>
      </div>
      <div style="margin-left: 20px">
        <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg"> 添加规则 </el-button>
      </div>
    </template>
  </el-form>
</template>

<script>
const noAssociatedType = [
  'DIVIDER',
  'LINKED_DATA',
  'QUERY_CHECK',
  'SIGN_PAD',
  'TEXT_RECOGNITION'
  // "SERIALNUMBER_INPUT",
  // "UPLOAD-FILE",
  // "UPLOAD-IMG",
]
const noShowField = ['DIVIDER', 'LINKED_DATA', 'QUERY_CHECK', 'SIGN_PAD', 'TEXT_RECOGNITION']
// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

export default {
  name: 'FieldPanel',
  props: ['activeData'],

  data() {
    return {
      single: ['INPUT', 'RADIO', 'SELECT'],
      multiple: ['CHECKBOX', 'SELECT-MULTIPLE']
    }
  },

  mounted() {},

  methods: {
    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.config.tag)) {
        this.activeData.config.renderKey = +new Date()
      }
    },
    handleAddressTypeChange() {},
    handleDBTableChange() {
      const temp = this.dbTableList.find((item) => item.id === this.activeData.config.dbTable)
      const fields = temp ? temp.fields.filter((i) => !noAssociatedType.includes(i.typeId)) : []
      const originFields = temp ? temp.originFields.filter((i) => !noShowField.includes(i.typeId)) : []

      this.filterDBTableFields = this.activeData.parentKey
        ? originFields.filter((i) => i.typeId !== 'CHILD_FORM')
        : fields
      // console.log(this.filterDBTableFields, 33444);
      this.dbTableFields = this.formatChildren(originFields, 1)

      this.activeData.linkList = []
      this.activeData.filterCond = []
      if (this.activeData.typeId === 'LINKED_DATA') {
        this.activeData.linkedShowField = []
        this.activeData.linkedFillRules = []
      }
    },
    getChangeType() {
      if (this.single.includes(this.activeData.typeId)) {
        return [
          { value: 'RADIO', label: '单选按钮组' },
          { value: 'SELECT', label: '下拉框' },
          { value: 'INPUT', label: '单行文本' }
        ]
      } else {
        return [
          { value: 'CHECKBOX', label: '复选框组' },
          { value: 'SELECT-MULTIPLE', label: '下拉复选框' }
        ]
      }
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      // if (Array.isArray(this.activeData.config.defaultValue)) {
      //   // 数组
      //   this.$set(
      //     this.activeData.config,
      //     'defaultValue',
      //     str.split(',').map((val) => (isNumberStr(val) ? +val : val))
      //   )
      // } else if (['true', 'false'].indexOf(str) > -1) {
      //   // 布尔
      //   this.$set(this.activeData.config, 'defaultValue', JSON.parse(str))
      // } else {
      //   // 字符串和数字
      //   this.$set(this.activeData.config, 'defaultValue', isNumberStr(str) ? +str : str)
      // }
    }
  }
}
</script>

<style lang="scss" scoped></style>

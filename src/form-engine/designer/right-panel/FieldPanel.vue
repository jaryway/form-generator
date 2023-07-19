<template>
  <el-form size="small">
    <!-- <el-form-item v-if="activeData.config.changeTag" label="组件类型">
            <el-select
              v-model="activeData.config.tagIcon"
              placeholder="请选择组件类型"
              :style="{ width: '100%' }"
              @change="tagChange"
            >
              <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.config.label"
                  :label="item.config.label"
                  :value="item.config.tagIcon"
                >
                  <svg-icon class="node-icon" :icon-class="item.config.tagIcon" />
                  <span> {{ item.config.label }}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.vModel !== undefined" label="字段名">
            <el-input v-model="activeData.vModel" placeholder="请输入字段名（v-model）" />
          </el-form-item> -->
    <!-- <el-form-item v-if="activeData.config.componentName !== undefined" label="组件名">
            {{ activeData.config.componentName }}
          </el-form-item> -->
    <el-form-item v-if="activeData.config.label !== undefined" label="标题">
      <el-input v-model="activeData.config.label" placeholder="请输入标题" @input="changeRenderKey" />
    </el-form-item>
    <el-form-item v-if="activeData.placeholder !== undefined" label="占位提示">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" @input="changeRenderKey" />
    </el-form-item>
    <el-form-item v-if="activeData['start-placeholder'] !== undefined" label="开始占位">
      <el-input v-model="activeData['start-placeholder']" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item v-if="activeData['end-placeholder'] !== undefined" label="结束占位">
      <el-input v-model="activeData['end-placeholder']" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item v-if="activeData.config.span !== undefined" label="表单栅格">
      <div style="width: 100%; display: inline-block">
        <el-slider v-model="activeData.config.span" :max="24" :min="1" :marks="{ 12: '' }" @change="spanChange" />
      </div>
    </el-form-item>
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
      <el-select v-model="activeData.justify" placeholder="请选择水平排列" :style="{ width: '100%' }">
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
    <el-form-item v-if="activeData.config.labelWidth !== undefined" label="标签宽度">
      <el-input v-model.number="activeData.config.labelWidth" type="number" placeholder="请输入标签宽度" />
    </el-form-item>
    <el-form-item v-if="activeData.style && activeData.style.width !== undefined" label="组件宽度">
      <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
    </el-form-item>
    <el-form-item v-if="activeData.vModel !== undefined && activeData.config.showDefaultValue !== false" label="默认值">
      <el-input
        :value="setDefaultValue(activeData.config.defaultValue)"
        placeholder="请输入默认值"
        @input="onDefaultValueInput"
      />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-checkbox-group'" label="至少应选">
      <el-input-number
        :value="activeData.min"
        :min="0"
        placeholder="至少应选"
        @input="$set(activeData, 'min', $event ? $event : undefined)"
      />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-checkbox-group'" label="最多可选">
      <el-input-number
        :value="activeData.max"
        :min="0"
        placeholder="最多可选"
        @input="$set(activeData, 'max', $event ? $event : undefined)"
      />
    </el-form-item>
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
    <el-form-item v-if="activeData['icon'] !== undefined && activeData.config.tag === 'el-button'" label="按钮图标">
      <el-input v-model="activeData['icon']" placeholder="请输入按钮图标名称">
        <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('icon')"> 选择 </el-button>
      </el-input>
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="选项分隔符">
      <el-input v-model="activeData.separator" placeholder="请输入选项分隔符" />
    </el-form-item>
    <el-form-item v-if="activeData.autosize !== undefined" label="最小行数">
      <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="最小行数" />
    </el-form-item>
    <el-form-item v-if="activeData.autosize !== undefined" label="最大行数">
      <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="最大行数" />
    </el-form-item>
    <el-form-item v-if="isShowMin" label="最小值">
      <el-input-number v-model="activeData.min" placeholder="最小值" />
    </el-form-item>
    <el-form-item v-if="isShowMax" label="最大值">
      <el-input-number v-model="activeData.max" placeholder="最大值" />
    </el-form-item>
    <el-form-item v-if="activeData.height !== undefined" label="组件高度">
      <el-input-number v-model="activeData.height" placeholder="高度" @input="changeRenderKey" />
    </el-form-item>
    <el-form-item v-if="isShowStep" label="步长">
      <el-input-number v-model="activeData.step" placeholder="步数" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-input-number'" label="精度">
      <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-input-number'" label="按钮位置">
      <el-radio-group v-model="activeData['controls-position']">
        <el-radio-button label=""> 默认 </el-radio-button>
        <el-radio-button label="right"> 右侧 </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeData.maxlength !== undefined" label="最多输入">
      <el-input v-model="activeData.maxlength" placeholder="请输入字符长度">
        <template slot="append"> 个字符 </template>
      </el-input>
    </el-form-item>
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
    <el-form-item v-if="activeData.type !== undefined && 'el-date-picker' === activeData.config.tag" label="时间类型">
      <el-select
        v-model="activeData.type"
        placeholder="请选择时间类型"
        :style="{ width: '100%' }"
        @change="dateTypeChange"
      >
        <el-option v-for="(item, index) in dateOptions" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="activeData.name !== undefined" label="文件字段名">
      <el-input v-model="activeData.name" placeholder="请输入上传文件字段名" />
    </el-form-item>
    <el-form-item v-if="activeData.accept !== undefined" label="文件类型">
      <el-select v-model="activeData.accept" placeholder="请选择文件类型" :style="{ width: '100%' }" clearable>
        <el-option label="图片" value="image/*" />
        <el-option label="视频" value="video/*" />
        <el-option label="音频" value="audio/*" />
        <el-option label="excel" value=".xls,.xlsx" />
        <el-option label="word" value=".doc,.docx" />
        <el-option label="pdf" value=".pdf" />
        <el-option label="txt" value=".txt" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="activeData.config.fileSize !== undefined" label="文件大小">
      <el-input v-model.number="activeData.config.fileSize" placeholder="请输入文件大小">
        <el-select slot="append" v-model="activeData.config.sizeUnit" :style="{ width: '66px' }">
          <el-option label="KB" value="KB" />
          <el-option label="MB" value="MB" />
          <el-option label="GB" value="GB" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item v-if="activeData.action !== undefined" label="上传地址">
      <el-input v-model="activeData.action" placeholder="请输入上传地址" clearable />
    </el-form-item>
    <el-form-item v-if="activeData['list-type'] !== undefined" label="列表类型">
      <el-radio-group v-model="activeData['list-type']" size="small">
        <el-radio-button label="text"> text </el-radio-button>
        <el-radio-button label="picture"> picture </el-radio-button>
        <el-radio-button label="picture-card"> picture-card </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeData.type !== undefined && activeData.config.tag === 'el-button'" label="按钮类型">
      <el-select v-model="activeData.type" :style="{ width: '100%' }">
        <el-option label="primary" value="primary" />
        <el-option label="success" value="success" />
        <el-option label="warning" value="warning" />
        <el-option label="danger" value="danger" />
        <el-option label="info" value="info" />
        <el-option label="text" value="text" />
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="activeData.config.buttonText !== undefined"
      v-show="'picture-card' !== activeData['list-type']"
      label="按钮文字"
    >
      <el-input v-model="activeData.config.buttonText" placeholder="请输入按钮文字" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-button'" label="按钮文字">
      <el-input v-model="activeData.__slot__.default" placeholder="请输入按钮文字" />
    </el-form-item>
    <el-form-item v-if="activeData['range-separator'] !== undefined" label="分隔符">
      <el-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
    </el-form-item>
    <el-form-item v-if="activeData['picker-options'] !== undefined" label="时间段">
      <el-input v-model="activeData['picker-options'].selectableRange" placeholder="请输入时间段" />
    </el-form-item>
    <el-form-item v-if="activeData.format !== undefined" label="时间格式">
      <el-input :value="activeData.format" placeholder="请输入时间格式" @input="setTimeValue($event)" />
    </el-form-item>
    <template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeData.config.tag) > -1">
      <el-divider>选项</el-divider>
      <draggable :list="activeData.__slot__.options" :animation="340" group="selectItem" handle=".option-drag">
        <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation" />
          </div>
          <el-input v-model="item.label" placeholder="选项名" size="small" />
          <el-input placeholder="选项值" size="small" :value="item.value" @input="setOptionValue(item, $event)" />
          <div class="close-btn select-line-icon" @click="activeData.__slot__.options.splice(index, 1)">
            <i class="el-icon-remove-outline" />
          </div>
        </div>
      </draggable>
      <div style="margin-left: 20px">
        <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem">
          添加选项
        </el-button>
      </div>
      <el-divider />
    </template>

    <template v-if="['el-cascader', 'el-table'].includes(activeData.config.tag)">
      <el-divider>选项</el-divider>
      <el-form-item v-if="activeData.config.dataType" label="数据类型">
        <el-radio-group v-model="activeData.config.dataType" size="small">
          <el-radio-button label="dynamic"> 动态数据 </el-radio-button>
          <el-radio-button label="static"> 静态数据 </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <template v-if="activeData.config.dataType === 'dynamic'">
        <el-form-item label="接口地址">
          <el-input
            v-model="activeData.config.url"
            :title="activeData.config.url"
            placeholder="请输入接口地址"
            clearable
            @blur="$emit('fetch-data', activeData)"
          >
            <el-select
              slot="prepend"
              v-model="activeData.config.method"
              :style="{ width: '85px' }"
              @change="$emit('fetch-data', activeData)"
            >
              <el-option label="get" value="get" />
              <el-option label="post" value="post" />
              <el-option label="put" value="put" />
              <el-option label="delete" value="delete" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="数据位置">
          <el-input
            v-model="activeData.config.dataPath"
            placeholder="请输入数据位置"
            @blur="$emit('fetch-data', activeData)"
          />
        </el-form-item>

        <template v-if="activeData.props && activeData.props.props">
          <el-form-item label="标签键名">
            <el-input v-model="activeData.props.props.label" placeholder="请输入标签键名" />
          </el-form-item>
          <el-form-item label="值键名">
            <el-input v-model="activeData.props.props.value" placeholder="请输入值键名" />
          </el-form-item>
          <el-form-item label="子级键名">
            <el-input v-model="activeData.props.props.children" placeholder="请输入子级键名" />
          </el-form-item>
        </template>
      </template>

      <!-- 级联选择静态树 -->
      <el-tree
        v-if="activeData.config.dataType === 'static'"
        draggable
        :data="activeData.options"
        node-key="id"
        :expand-on-click-node="false"
        :render-content="renderContent"
      />
      <div v-if="activeData.config.dataType === 'static'" style="margin-left: 20px">
        <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addTreeItem">
          添加父级
        </el-button>
      </div>
      <el-divider />
    </template>

    <el-form-item v-if="activeData.config.optionType !== undefined" label="选项样式">
      <el-radio-group v-model="activeData.config.optionType">
        <el-radio-button label="default"> 默认 </el-radio-button>
        <el-radio-button label="button"> 按钮 </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeData['active-color'] !== undefined" label="开启颜色">
      <el-color-picker v-model="activeData['active-color']" />
    </el-form-item>
    <el-form-item v-if="activeData['inactive-color'] !== undefined" label="关闭颜色">
      <el-color-picker v-model="activeData['inactive-color']" />
    </el-form-item>

    <el-form-item
      v-if="activeData.config.showLabel !== undefined && activeData.config.labelWidth !== undefined"
      label="显示标签"
    >
      <el-switch v-model="activeData.config.showLabel" />
    </el-form-item>
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
    <el-form-item
      v-if="activeData.config.border !== undefined && activeData.config.optionType === 'default'"
      label="是否带边框"
    >
      <el-switch v-model="activeData.config.border" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-color-picker'" label="颜色格式">
      <el-select
        v-model="activeData['color-format']"
        placeholder="请选择颜色格式"
        :style="{ width: '100%' }"
        clearable
        @change="colorFormatChange"
      >
        <el-option v-for="(item, index) in colorFormatOptions" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="
        activeData.size !== undefined &&
        (activeData.config.optionType === 'button' ||
          activeData.config.border ||
          activeData.config.tag === 'el-color-picker' ||
          activeData.config.tag === 'el-button')
      "
      label="组件尺寸"
    >
      <el-radio-group v-model="activeData.size">
        <el-radio-button label="medium"> 中等 </el-radio-button>
        <el-radio-button label="small"> 较小 </el-radio-button>
        <el-radio-button label="mini"> 迷你 </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeData['show-word-limit'] !== undefined" label="输入统计">
      <el-switch v-model="activeData['show-word-limit']" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-input-number'" label="严格步数">
      <el-switch v-model="activeData['step-strictly']" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="任选层级">
      <el-switch v-model="activeData.props.props.checkStrictly" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="是否多选">
      <el-switch v-model="activeData.props.props.multiple" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="展示全路径">
      <el-switch v-model="activeData['show-all-levels']" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-cascader'" label="可否筛选">
      <el-switch v-model="activeData.filterable" />
    </el-form-item>
    <el-form-item v-if="activeData.clearable !== undefined" label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item v-if="activeData.config.showTip !== undefined" label="显示提示">
      <el-switch v-model="activeData.config.showTip" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-upload'" label="多选文件">
      <el-switch v-model="activeData.multiple" />
    </el-form-item>
    <el-form-item v-if="activeData['auto-upload'] !== undefined" label="自动上传">
      <el-switch v-model="activeData['auto-upload']" />
    </el-form-item>
    <el-form-item v-if="activeData.readonly !== undefined" label="是否只读">
      <el-switch v-model="activeData.readonly" />
    </el-form-item>
    <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-select'" label="能否搜索">
      <el-switch v-model="activeData.filterable" />
    </el-form-item>
    <el-form-item v-if="activeData.config.tag === 'el-select'" label="是否多选">
      <el-switch v-model="activeData.multiple" @change="multipleChange" />
    </el-form-item>
    <el-form-item v-if="activeData.config.required !== undefined" label="是否必填">
      <el-switch v-model="activeData.config.required" />
    </el-form-item>

    <template v-if="activeData.config.layoutTree">
      <el-divider>布局结构树</el-divider>
      <el-tree :data="[activeData.config]" :props="layoutTreeProps" node-key="renderKey" default-expand-all draggable>
        <span slot-scope="{ node, data }">
          <span class="node-label">
            <svg-icon class="node-icon" :icon-class="data.config ? data.config.tagIcon : data.tagIcon" />
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </template>

    <template v-if="Array.isArray(activeData.config.regList)">
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
export default {
  name: 'FieldPanel',
  props: ['activeData'],

  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>

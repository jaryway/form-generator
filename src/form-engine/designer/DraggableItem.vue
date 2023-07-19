<script>
import draggable from 'vuedraggable'
import render from '../render/render'

const components = {
  itemBtns(h, currentItem, index, list) {
    const { copyItem, deleteItem } = this.$listeners
    return [
      <span
        class='drawing-item-copy'
        title='复制'
        onClick={(event) => {
          copyItem(currentItem, list, index)
          event.stopPropagation()
        }}
      >
        <i class='el-icon-copy-document' />
      </span>,
      <span
        class='drawing-item-delete'
        title='删除'
        onClick={(event) => {
          deleteItem(index, list)
          event.stopPropagation()
        }}
      >
        <i class='el-icon-delete' />
      </span>
    ]
  }
}
const layouts = {
  colFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.config
    const child = renderChildren.apply(this, arguments)
    let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'

    console.log('currentItem', currentItem)

    return (
      <el-col
        span={config.span}
        class={className}
        nativeOnClick={(event) => {
          activeItem(currentItem)
          event.stopPropagation()
        }}
      >
        <el-form-item label-width={labelWidth} label={config.showLabel ? config.label : ''} required={config.required}>
          <render
            key={config.renderKey}
            conf={currentItem}
            onInput={(event) => {
              this.$set(config, 'defaultValue', event)
            }}
          >
            {child}
          </render>
        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, currentItem, index, list, rowGroupName) {
    const { activeItem } = this.$listeners
    const config = currentItem.config
    const className = this.activeId === config.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
    const type = config.type
    let child = renderChildren.apply(this, arguments)

    if (currentItem.type === 'flex') {
      child = (
        <el-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
          {child}
        </el-row>
      )
    }

    if (type === 'subform') {
      return (
        <el-col span={config.span}>
          <el-row
            gutter={config.gutter}
            class={className + ' subform'}
            nativeOnClick={(event) => {
              activeItem(currentItem)
              event.stopPropagation()
            }}
          >
            {/* <span class='component-name'>{config.componentName}</span> */}
            <div class='subform-head' type={type}>
              1
            </div>

            <draggable list={config.children || []} animation={340} group={rowGroupName} class='drag-wrapper'>
              {child}
            </draggable>

            {components.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      )
    }

    if (type === 'linkqury') {
      return (
        <el-col span={config.span}>
          <el-row
            gutter={config.gutter}
            class={className}
            nativeOnClick={(event) => {
              activeItem(currentItem)
              event.stopPropagation()
            }}
          >
            <div class='drag-wrapper'>{child}</div>
            {components.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      )
    }

    return (
      <el-col span={config.span}>
        <el-row
          gutter={config.gutter}
          class={className}
          nativeOnClick={(event) => {
            activeItem(currentItem)
            event.stopPropagation()
          }}
        >
          <draggable list={config.children || []} animation={340} group={rowGroupName} class='drag-wrapper'>
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
  raw(h, currentItem, index, list) {
    const config = currentItem.config
    const child = renderChildren.apply(this, arguments)
    return (
      <render
        key={config.renderKey}
        conf={currentItem}
        onInput={(event) => {
          this.$set(config, 'defaultValue', event)
        }}
      >
        {child}
      </render>
    )
  }
}

function renderChildren(h, currentItem, index, list) {
  const config = currentItem.config
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.config.layout]
    if (layout) {
      return layout.call(this, h, el, i, config.children)
    }
    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.currentItem.config.layout}匹配的layout`)
}

export default {
  components: {
    render,
    draggable
  },
  props: ['currentItem', 'index', 'drawingList', 'activeId', 'formConf', 'rowGroupName'],
  render(h) {
    // console.log('rowGroupName', this.rowGroupName)
    const layout = layouts[this.currentItem.config.layout]

    if (layout) {
      return layout.call(this, h, this.currentItem, this.index, this.drawingList, this.rowGroupName)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>

<style lang="less" scoped>
.drawing-row-item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex: auto;
  width: 100%;

  &::v-deep .el-col {
    margin-top: 0;
  }
}

.drag-wrapper {
  display: flex;
  flex-direction: row;
  flex: auto;
  overflow: auto;
  width: 0;
  padding-right: 60px;
}

.subform-head {
  flex: 0 0 50px;
}

.subform {
  .subform-head {
    border: solid 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep {
    .drawing-item {
      // display: flex;
      flex: 0 0 200px;
      display: flex;
      flex-direction: column;
    }

    .el-form-item {
      padding: 0 8px 8px;
      flex: auto;
    }

    .el-form-item__label {
      padding: 0;
      width: 100%;
    }

    .active-from-item > .el-form-item,
    .active-from-item:hover > .el-form-item {
      border-radius: 0;
    }

    .drawing-item:hover > .el-form-item,
    .drawing-row-item:hover > .el-form-item {
      border-radius: 0;
    }

    .drawing-item > .drawing-item-copy,
    .drawing-item > .drawing-item-delete {
      top: 4px;
      right: 8px;
    }

    .drawing-item > .drawing-item-copy {
      right: 56px - 24px + 8px;
    }
  }
}

::v-deep .el-form--label-top .subform .el-form-item__label {
  padding: 0;
}
</style>

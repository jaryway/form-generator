export default {
  options(h, conf, key) {
    console.log('render.render.ggggggg')
    const list = []
    conf.__slot__.options.forEach((item) => {
      if (conf.config.optionType === 'button') {
        list.push(<el-checkbox-button label={item.value}>{item.label}</el-checkbox-button>)
      } else {
        list.push(
          <div>
            <el-checkbox label={item.value} border={conf.border}>
              {item.label}
            </el-checkbox>
          </div>
        )
      }
    })
    return list
  }
}

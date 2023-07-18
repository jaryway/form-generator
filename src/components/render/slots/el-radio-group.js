export default {
  options(h, conf, key, _this) {
    console.log('this', _this)
    const list = []
    conf.__slot__.options.forEach((item) => {
      if (conf.config.optionType === 'button') {
        list.push(<el-radio-button label={item.value}>{item.label}</el-radio-button>)
      } else {
        list.push(
          <el-radio label={item.value} border={conf.border}>
            {item.label} 999
          </el-radio>
        )
      }
    })
    return list
  },
}

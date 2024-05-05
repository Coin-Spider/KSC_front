<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.updateFn();
    });
  },
  props: {
    width: 800,
    //盒子宽度
  },
  data() {
    return {
      columns: 3,
      leftPaddon:0,
      columnHeight: [],
      cWidth:236,
      leftGap: 10,
      topGap: 12,
    }
  },
  methods: {
    getColumns(width,cWidth,leftGap){
      this.columns = Math.floor(width/(cWidth+leftGap));
    },

    addClassName(items) {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.add('w-f-item');
      }
    },
    //给每一个盒子设置宽度(items,width)
    setColumnWidth(items) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.width = this.cWidth + 'px';
      }
    },
    //给盒子排序
    setColumnsSort(items) {
      for (let i = 0; i < items.length; i++) {
        if (i < this.columns) {
          //这是第一排
          if (i%this.columns===0){
            items[i].style.left=this.leftPaddon+'px';
            console.log(this.leftPaddon)
          }else {
            items[i].style.left = this.leftPaddon+i * (this.cWidth + this.leftGap) + 'px';
          }
          items[i].style.top = 0;
          this.columnHeight.push(items[i].offsetHeight+this.topGap);
        } else {
          //嘞是其他排
          const lowIndex = this.columnHeight.indexOf(
              Math.min(...this.columnHeight)
          );
          if (lowIndex===0){
            items[i].style.left=this.leftPaddon+'px';
          }else {
            //设置左定位
            items[i].style.left = this.leftPaddon+lowIndex * (this.cWidth + this.leftGap) + 'px';
          }
          //设置高度
          items[i].style.top = this.columnHeight[lowIndex] + 'px';
          //更新高度
          this.columnHeight[lowIndex] += items[i].offsetHeight+this.topGap;
        }
      }
    },
    //获取左边距
    getLeftpaddon(){
      this.leftPaddon=(this.width-this.columns*(this.cWidth+this.leftGap)+this.leftGap)/2
    },
    //更新,重新设置高度
    updateFn() {
      console.log(this.width)
      this.columnHeight = [];
      //获取到容器宽度
      const rDom = document.getElementById('water-fall__root');
      rDom.style.width = this.width + 'px';
      // 获取所有的子项
      const items = document.querySelector('#water-fall__root').children;
      // 每个子项都加上内部类名 w-f-item
      this.addClassName(items);
      //开始设定列数
      this.getColumns(this.width,this.cWidth,this.leftGap);
      //开始计算左右边
      this.getLeftpaddon();
      // 设置每一个的宽度
      this.setColumnWidth(items);
      // 设置列的排序(如果有图片,因图片高度需要加载之后才有,所以延时处理)
      setTimeout(() => {
        this.setColumnsSort(items);
      }, 50);
    },
  },
}
</script>

<template>
  <div id="water-fall__root" class="water-fall__root">

    <slot></slot>
  </div>
</template>

<style>
.water-fall__root {
  position: relative;

  .w-f-item {
    position: absolute;
    width: 236px;
    img {
      width: 236px;
      height: 100%;
    }
  }
}
</style>
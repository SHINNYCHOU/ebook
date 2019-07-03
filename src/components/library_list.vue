<template>
  <div class="main" >
    <div id="show" >
      <div class="items" v-for= "item in info" :key="item.isbn">
        <div class="i_photo"><img  class="cover" :src="item.cover" alt=""></div>
        <div class="i_disc">
          <p class="content">
            <template >
            <a class="main_book_title" v-bind:style="{ color: item.activeColor}" @mouseover="item.activeColor='red'" @mouseout="item.activeColor='black'" @click="todetailepage(item.isbn)">
              {{item.title}}
            </a>
            </template>
            <br/>
            {{item.discribe}}
        </p>
      </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
  </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'library_list',
  data () {
    return {
      info: [
        {
          title: '北欧众神',
          activeColor: 'black',
          cover: '../../static/photos/北欧众神.jpg',
          isbn: '9787559416735',
          discribe: '北欧神话是奇幻文化的重要起源！幻想文学大师、《美国众神》作者尼尔•盖曼，重述辉煌壮丽的北欧神话！2000年来，受到北欧神话启发的作品包括但不限于：文学：《埃达》《萨迦》《贝奥武夫》《尼伯龙根之歌》《魔戒》《霍比特人》《银河英雄传说》；\n' +
            '                    影视：《雷神》《冰与火之歌》《纳尼亚传奇》《尼伯龙根的指环》《贝奥武夫》；'
        },
        {
          title: '人类的故事(普利策奖译者精译特别版) 精装',
          activeColor: 'black',
          cover: '../../static/photos/人类的故事.jpg',
          isbn: '9787559414076',
          discribe: '房龙是一位迷人的说故事高手，他讲的故事，幽默而生动，温暖而睿智，既有高屋建瓴的大视野，\n' +
            '            又有敏锐细致的小镜头，既有群体性气质和思维的展现，又有个人英雄行为的刻画。\n' +
            '            房龙是一位很有魅力的向导，他引领子孙开启一次振奋人心、视野开阔独特的人类经验之旅，\n' +
            '            从“类人”祖先诞生之地出发，循着古巴比伦城的落日和希腊文明的曙光，走过罗马帝国的兴衰，\n' +
            '            穿过中世纪的黑暗与一战的残酷……摸清了世界演变的关键脉络。'
        },
        {
          title: '地狱变',
          activeColor: 'black',
          cover: '../../static/photos/地狱变.jpg',
          isbn: '9787559422538',
          discribe: '《地狱变》收录了日本文学巨擘芥川龙之介的中短篇小说共十七篇。其中，以《地狱变》《鼻子》为代表，\n' +
            '            从独特叙述视角和叙事结构出发，冷峻地观照了“他人即地狱”的彼时日本社会心理。\n' +
            '            这种畸形的个体心理逐渐演变成为一种习惯性的社会心理，发人深思。此外，以《地狱变》为代表的作品\n' +
            '            则表现了“为艺术的艺术”的孤独者的人生悲歌。 通过自我毁灭的方式来达成“艺术至上”的理想，这沉痛代价的背后是孤独灵魂的痛苦咆哮。'
        }]
    }
  },
  methods: {
    todetailepage (id) {
      this.$router.push({path: '/detail', query: {isbn: id}})
    }
  }
}
</script>

<style scoped>
@import "../../static/style.css";
  a.listlink{
    font-size: 20px;
    font-weight: bold;
    color: black;
  }
</style>

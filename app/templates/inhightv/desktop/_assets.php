<style>
.body-sec,
.body-sec-inner {
  background: #fff;
}

.inhightv {}

.inhightv__title {
  background-color: #fff;
  border-top: 4px solid #dddddd;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  height: 60px;
  font-weight: 700;
  padding: 0;
  color: #333333;
}

.inhightv--highlight .main-sec,
.inhightv--digest .main-sec {
  padding-top: 30px;
}


.inhightv__title a {
  color: #333;
}

.inhightv__title .ttl_link a:after {
  display: inline-block;
  content: "";
  width: 7px;
  height: 12px;
  background: url(/assets/images/inhigh/icon_arrow.png) no-repeat 0;
  margin-left: 8px;
  position: relative;
  top: 1px;
  right: 0;
}

.inhightv__headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inhightv__headline h2 {
  display: flex;
  align-items: center;
  line-height: 26px;
}

.inhightv__headline h2 * {
  line-height: 1;
}

.inhightv__headline h2 svg {
  width: 26px;
  height: 26px;
  stroke-width: 0;
  line-height: 0;
}

.inhightv__headline h2 span {
  font-size: 16px;
  font-weight: bold;
  padding-left: 8px;
}

.inhightv__index__adslider {
  width: 1088px;
  margin: 38px auto 8px;
}

.inhightv__index__adslider__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inhightv__index__adslider__wrapper > div {
  width: 320px;
  height: 140px;
  background: #eee;
  margin: 0 20px;
}

.inhightv__index__plan img {
  width: 100%;
  height: auto;
  filter: grayscale(100);
}

.inhightv__index__part-04 {
  width: 100%;
}

.inhightv__index__part-04 {
  margin-top: 50px;
}

.inhightv__index__part-04 ul {
  display: flex;
  flex-wrap: wrap;
}

.inhightv__index__part-04 li {
  margin-right: 7px;
}

.inhightv__index__part-04 li:first-child {
  margin-bottom: 7px;
}

.inhightv__index__part-04 li:last-child {
  margin-right: 0;
}

/*  overwrite -  parts_pc.css */
.inhightv .article_list {
  margin-top: -20px;
}

.inhightv.inhightv--highlight .article_list {
  margin-top: -30px;
}

.inhightv.inhightv--digest .article_list {
  margin-top: 0px;
}

.article_list .highlight_article .date {
  padding-left: 0;
}

.article_list .highlight_article .thumb_area li {
  border-bottom: none;
}

.inhightv.inhightv--digest .article_list .highlight_article .thumb_area li {
  margin-top: 0;
  margin-bottom: 10px;
}

.article_list .highlight_article .thumb_area li .img {
  width: 174px;
  height: 98px;
  background: #eee;
}


.article_list .highlight_article .thumb_area li .txt_area {
  background: #f5f5f5;
  display: block;
  text-align: left;
}

.article_list .highlight_article .thumb_area li .txt_area p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
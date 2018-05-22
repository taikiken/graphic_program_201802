<?php
/**
 * 速報一覧・競技一覧（下タブ） - mobile
 * @since 2018-04-11
 */
// ----------------------------------------------
// `.body-sec` ~ `.foot-sec` 間に配置する
// ----------------------------------------------
?>
<script>
  (function(window) {
    'use strict';
    var document = window.document;
    var elements = document.getElementsByClassName('whole');
    if (!elements.length) {
      return;
    }
    var whole = elements[0];
    whole.className += ' nadir_tab-active';
  }(window));
</script>

<style>
  .adsbygoogle.adsbygoogle-noablate {
    bottom: 50px !important;
  }
</style>

<nav class="nadir_tab">
  <ul class="nadir_tab-list">
    <li class="nadir_tab-item nadir_tab-item__home">
      <a class="nadir_tab-link" href="/">
        <i>
          <svg class="nadir_tab-icon_home" viewBox="0 0 152.4 152.4" width="44px" height="44px" xmlns="http://www.w3.org/2000/svg">
            <path d="M636.65,377.51H584.79a5,5,0,0,1-5-5V332.75H551.12v39.76a5,5,0,0,1-5,5H494.25a5,5,0,0,1-5-5v-95.8a5,5,0,0,1,2.28-4.19l71.6-46.6a5,5,0,0,1,5.48,0l70.79,46.61a5,5,0,0,1,2.25,4.17v95.8A5,5,0,0,1,636.65,377.51Zm-46.86-10h41.86v-88.1l-65.81-43.33-66.59,43.34v88.09h41.87V327.75a5,5,0,0,1,5-5h38.67a5,5,0,0,1,5,5Z" transform="translate(-489.25 -225.11)"/>
          </svg>
        </i>
        ホーム
      </a>
    </li>
    <li class="nadir_tab-item nadir_tab-item__menu-livescore">
      <a class="nadir_tab-link" href="/nav/stats/">
        <i>
          <svg class="nadir_tab-icon_live" viewBox="0 0 147.76 147.12" width="44px" height="44px" xmlns="http://www.w3.org/2000/svg">
            <path d="M213.85,488.5H75.55a4.73,4.73,0,0,1-4.73-4.73V383.88a4.73,4.73,0,0,1,4.73-4.73h138.3a4.73,4.73,0,1,1,0,9.46H80.28v90.44H209.13V400.94a4.73,4.73,0,0,1,9.45,0v82.83A4.73,4.73,0,0,1,213.85,488.5Z" transform="translate(-70.82 -379.15)"/><path d="M172.34,526.27H117.06a4.73,4.73,0,1,1,0-9.45h55.28a4.73,4.73,0,1,1,0,9.45Z" transform="translate(-70.82 -379.15)"/><path d="M131.49,526.27a4.72,4.72,0,0,1-4.72-4.72V500.2a4.73,4.73,0,1,1,9.45,0v21.35A4.72,4.72,0,0,1,131.49,526.27Z" transform="translate(-70.82 -379.15)"/><path d="M157.91,526.27a4.72,4.72,0,0,1-4.73-4.72V500.2a4.73,4.73,0,0,1,9.46,0v21.35A4.72,4.72,0,0,1,157.91,526.27Z" transform="translate(-70.82 -379.15)"/><path d="M96.57,411.62a5.4,5.4,0,0,1-1.26-.13,7,7,0,0,1-1.18-.36,6.77,6.77,0,0,1-1.13-.59,7.81,7.81,0,0,1-1-.79,7.53,7.53,0,0,1-.79-1,8.26,8.26,0,0,1-.59-1.1,6.93,6.93,0,0,1-.36-1.2,6.74,6.74,0,0,1-.13-1.26,6.63,6.63,0,0,1,.13-1.25,7.81,7.81,0,0,1,.36-1.2,9.06,9.06,0,0,1,.59-1.11,10.16,10.16,0,0,1,.79-1,6.65,6.65,0,0,1,9.07,0,10.16,10.16,0,0,1,.79,1,6.23,6.23,0,0,1,.59,1.11,6.84,6.84,0,0,1,.36,1.2,5.31,5.31,0,0,1,.13,1.25,5.4,5.4,0,0,1-.13,1.26,6.15,6.15,0,0,1-.36,1.2,5.83,5.83,0,0,1-.59,1.1,7.53,7.53,0,0,1-.79,1A6.38,6.38,0,0,1,96.57,411.62Z" transform="translate(-70.82 -379.15)"/><path d="M105.4,405.21a6.41,6.41,0,0,1,6.4-6.4h0a6.38,6.38,0,0,1,6.38,6.4h0a6.38,6.38,0,0,1-6.38,6.41h0A6.41,6.41,0,0,1,105.4,405.21Z" transform="translate(-70.82 -379.15)"/><path d="M127,411.62a6.34,6.34,0,0,1-4.51-1.87,6.41,6.41,0,0,1,7-10.45,9.71,9.71,0,0,1,1.1.59,7.43,7.43,0,0,1,1,.79,10.28,10.28,0,0,1,.8,1,6.71,6.71,0,0,1,.58,1.13,5.54,5.54,0,0,1,.36,1.18,4.83,4.83,0,0,1,.13,1.25,6.55,6.55,0,0,1-1.87,4.54,7.43,7.43,0,0,1-1,.79,6.51,6.51,0,0,1-1.1.59,7.31,7.31,0,0,1-1.21.36A5.31,5.31,0,0,1,127,411.62Z" transform="translate(-70.82 -379.15)"/><path d="M120.61,419.92a6.41,6.41,0,0,1,6.41-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,120.61,419.92Z" transform="translate(-70.82 -379.15)"/><path d="M127,441a6.44,6.44,0,0,1-6.41-6.4,7.69,7.69,0,0,1,.13-1.26,6.93,6.93,0,0,1,.36-1.2,8.93,8.93,0,0,1,.59-1.1,6.77,6.77,0,0,1,.82-1,6.42,6.42,0,0,1,5.76-1.74,7.31,7.31,0,0,1,1.21.36,6.51,6.51,0,0,1,1.1.59,7.43,7.43,0,0,1,1,.79,9.26,9.26,0,0,1,.8,1,6.1,6.1,0,0,1,.58,1.1,5.54,5.54,0,0,1,.36,1.2,4.91,4.91,0,0,1,.13,1.26A6.38,6.38,0,0,1,127,441Z" transform="translate(-70.82 -379.15)"/><path d="M105.4,434.62a6.41,6.41,0,0,1,6.4-6.41h0a6.38,6.38,0,0,1,6.38,6.41h0a6.38,6.38,0,0,1-6.38,6.4h0A6.41,6.41,0,0,1,105.4,434.62Z" transform="translate(-70.82 -379.15)"/><path d="M96.57,441a6.74,6.74,0,0,1-1.26-.13,6.18,6.18,0,0,1-1.18-.36,5.78,5.78,0,0,1-1.13-.59,10.16,10.16,0,0,1-1-.79,7.43,7.43,0,0,1-.79-1,9.71,9.71,0,0,1-.59-1.1,7.31,7.31,0,0,1-.36-1.21,6.63,6.63,0,0,1-.13-1.25,6.74,6.74,0,0,1,.13-1.26,6.93,6.93,0,0,1,.36-1.2,8.93,8.93,0,0,1,.59-1.1,9.16,9.16,0,0,1,.79-1,6.65,6.65,0,0,1,9.07,0,6.46,6.46,0,0,1,1.87,4.54,5.31,5.31,0,0,1-.13,1.25,6.19,6.19,0,0,1-1,2.31,10.16,10.16,0,0,1-.79,1,8.16,8.16,0,0,1-1,.79,6.23,6.23,0,0,1-1.11.59,6.15,6.15,0,0,1-1.2.36A6.63,6.63,0,0,1,96.57,441Z" transform="translate(-70.82 -379.15)"/><path d="M90.16,449.32a6.41,6.41,0,0,1,6.41-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,90.16,449.32Z" transform="translate(-70.82 -379.15)"/><path d="M96.57,470.42a6.74,6.74,0,0,1-1.26-.13,5.54,5.54,0,0,1-1.18-.36,7.07,7.07,0,0,1-1.13-.58,10.28,10.28,0,0,1-1-.8,10.16,10.16,0,0,1-.79-1,8,8,0,0,1-.59-1.13,6.37,6.37,0,0,1-.49-2.43A6.49,6.49,0,0,1,92,459.48a10.16,10.16,0,0,1,1-.79,7.61,7.61,0,0,1,1.13-.59,7,7,0,0,1,1.18-.36A6.38,6.38,0,0,1,103,464a5.45,5.45,0,0,1-.13,1.26,6.08,6.08,0,0,1-.36,1.17,6.4,6.4,0,0,1-.59,1.13,10.16,10.16,0,0,1-.79,1,8.24,8.24,0,0,1-1,.8,7.81,7.81,0,0,1-1.11.58,5.54,5.54,0,0,1-1.2.36A6.63,6.63,0,0,1,96.57,470.42Z" transform="translate(-70.82 -379.15)"/><path d="M105.4,464a6.41,6.41,0,0,1,6.4-6.4h0a6.38,6.38,0,0,1,6.38,6.4h0a6.38,6.38,0,0,1-6.38,6.4h0A6.41,6.41,0,0,1,105.4,464Z" transform="translate(-70.82 -379.15)"/><path d="M127,470.42a6.44,6.44,0,0,1-6.41-6.4,6.56,6.56,0,0,1,1.88-4.54,9,9,0,0,1,1-.79,6.28,6.28,0,0,1,1.12-.59,7,7,0,0,1,1.18-.36,5.9,5.9,0,0,1,2.51,0,6.19,6.19,0,0,1,2.31.95,7.43,7.43,0,0,1,1,.79,6.43,6.43,0,0,1,0,9.07,7.5,7.5,0,0,1-1,.8,6.45,6.45,0,0,1-1.1.58,5.79,5.79,0,0,1-1.21.36A6.63,6.63,0,0,1,127,470.42Z" transform="translate(-70.82 -379.15)"/><path d="M162.39,470.42a6.49,6.49,0,0,1-4.54-1.87,7.81,7.81,0,0,1-.79-1,6.51,6.51,0,0,1-.59-1.1,8.16,8.16,0,0,1-.36-1.2A5.45,5.45,0,0,1,156,464a5.4,5.4,0,0,1,.13-1.26,6.93,6.93,0,0,1,.36-1.2,6.51,6.51,0,0,1,.59-1.1,6.17,6.17,0,0,1,.79-1,6.45,6.45,0,0,1,5.79-1.74,7.27,7.27,0,0,1,1.18.36,5.78,5.78,0,0,1,1.1.59,7.72,7.72,0,0,1,1,.79,9.66,9.66,0,0,1,.79,1,9.56,9.56,0,0,1,.57,1.1,6.21,6.21,0,0,1,.38,1.2,8,8,0,0,1,0,2.52,7.22,7.22,0,0,1-.38,1.2,7.31,7.31,0,0,1-.59,1.1,7.81,7.81,0,0,1-.79,1,6.44,6.44,0,0,1-1,.8,6.37,6.37,0,0,1-1.1.58,5.54,5.54,0,0,1-1.2.36A6.42,6.42,0,0,1,162.39,470.42Z" transform="translate(-70.82 -379.15)"/><path d="M171.2,464a6.41,6.41,0,0,1,6.4-6.4h0A6.4,6.4,0,0,1,184,464h0a6.4,6.4,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,171.2,464Z" transform="translate(-70.82 -379.15)"/><path d="M192.84,470.42a6.65,6.65,0,0,1-1.26-.13,5.54,5.54,0,0,1-1.2-.36,6.76,6.76,0,0,1-1.1-.58,5.9,5.9,0,0,1-1-.8,7.09,7.09,0,0,1-.8-1,7.31,7.31,0,0,1-.59-1.1,7,7,0,0,1-.35-1.2,5,5,0,0,1-.13-1.26,6.37,6.37,0,0,1,1.87-4.54,5.86,5.86,0,0,1,1-.79,6.1,6.1,0,0,1,1.1-.59,6.93,6.93,0,0,1,1.2-.36,5.81,5.81,0,0,1,2.49,0,6.93,6.93,0,0,1,1.2.36,5.78,5.78,0,0,1,1.1.59,5.94,5.94,0,0,1,1,.79,6.41,6.41,0,0,1-4.51,10.94Z" transform="translate(-70.82 -379.15)"/><path d="M186.44,449.32a6.41,6.41,0,0,1,6.4-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,186.44,449.32Zm0-14.7a6.41,6.41,0,0,1,6.4-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,186.44,434.62Zm0-14.7a6.41,6.41,0,0,1,6.4-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,186.44,419.92Z" transform="translate(-70.82 -379.15)"/><path d="M192.84,411.62a6.65,6.65,0,0,1-1.26-.13,6.93,6.93,0,0,1-1.2-.36,5.53,5.53,0,0,1-1.1-.59,5.86,5.86,0,0,1-1-.79,6.42,6.42,0,0,1-1.87-4.54,4.83,4.83,0,0,1,.13-1.25,6.14,6.14,0,0,1,.35-1.18,6.37,6.37,0,0,1,.59-1.13,7.09,7.09,0,0,1,.8-1,5.86,5.86,0,0,1,1-.79,7.68,7.68,0,0,1,1.1-.59,6.15,6.15,0,0,1,1.2-.36,7,7,0,0,1,2.49,0,6.15,6.15,0,0,1,1.2.36,7.18,7.18,0,0,1,1.1.59,5.94,5.94,0,0,1,1,.79,6.39,6.39,0,0,1,0,9.07,5.94,5.94,0,0,1-1,.79,5.27,5.27,0,0,1-1.1.59,6.93,6.93,0,0,1-1.2.36A6.42,6.42,0,0,1,192.84,411.62Z" transform="translate(-70.82 -379.15)"/><path d="M171.2,405.21a6.41,6.41,0,0,1,6.4-6.4h0a6.4,6.4,0,0,1,6.4,6.4h0a6.4,6.4,0,0,1-6.4,6.41h0A6.41,6.41,0,0,1,171.2,405.21Z" transform="translate(-70.82 -379.15)"/><path d="M162.39,411.62a6.41,6.41,0,0,1-4.54-1.87,6.17,6.17,0,0,1-.79-1,5.83,5.83,0,0,1-.59-1.1,6.93,6.93,0,0,1-.36-1.2,5.23,5.23,0,0,1-.13-1.26,6.42,6.42,0,0,1,1.87-4.53,6.51,6.51,0,0,1,5.79-1.74,6.4,6.4,0,0,1,1.18.36,7.18,7.18,0,0,1,1.1.59,6.26,6.26,0,0,1,2.84,5.32,6.5,6.5,0,0,1-.1,1.26,6.21,6.21,0,0,1-.38,1.2,6.46,6.46,0,0,1-.59,1.1,6.17,6.17,0,0,1-.79,1,6.39,6.39,0,0,1-1,.79,5.27,5.27,0,0,1-1.1.59,7.27,7.27,0,0,1-1.18.36A5.42,5.42,0,0,1,162.39,411.62Z" transform="translate(-70.82 -379.15)"/><path d="M156,449.32a6.41,6.41,0,0,1,6.41-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,156,449.32Zm0-14.7a6.41,6.41,0,0,1,6.41-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,156,434.62Zm0-14.7a6.41,6.41,0,0,1,6.41-6.41h0a6.41,6.41,0,0,1,6.4,6.41h0a6.41,6.41,0,0,1-6.4,6.4h0A6.41,6.41,0,0,1,156,419.92Z" transform="translate(-70.82 -379.15)"/><path d="M144.69,430.78a6.52,6.52,0,0,1-4.51-1.87,7.22,7.22,0,0,1-.79-1,6.51,6.51,0,0,1-.59-1.1,6.94,6.94,0,0,1-.38-1.2,6.71,6.71,0,0,1-.11-1.26,6.6,6.6,0,0,1,.11-1.25,6.7,6.7,0,0,1,1-2.31,6.09,6.09,0,0,1,.79-1,6.62,6.62,0,0,1,9,0,5.65,5.65,0,0,1,.8,1,7.31,7.31,0,0,1,.59,1.1,6.43,6.43,0,0,1,.35,1.21,4.83,4.83,0,0,1,.13,1.25,4.91,4.91,0,0,1-.13,1.26,6.79,6.79,0,0,1-.35,1.2,7.31,7.31,0,0,1-.59,1.1,6.6,6.6,0,0,1-.8,1A6.51,6.51,0,0,1,144.69,430.78Z" transform="translate(-70.82 -379.15)"/><path d="M144.69,451.26a6.33,6.33,0,0,1-4.51-1.86,6.41,6.41,0,0,1-1.87-4.54,6.34,6.34,0,0,1,1.87-4.51,6.46,6.46,0,0,1,5.76-1.76,6.53,6.53,0,0,1,1.21.38,6,6,0,0,1,1.1.56,6.56,6.56,0,0,1,1,.82,6.3,6.3,0,0,1,1.87,4.51,6.37,6.37,0,0,1-6.4,6.4Z" transform="translate(-70.82 -379.15)"/>
          </svg>
        </i>
        速報
      </a>
    </li>
    <li class="nadir_tab-item nadir_tab-item__menu-category">
      <a class="nadir_tab-link" href="/nav/category/">
        <i>
          <svg class="nadir_tab-icon_category" viewBox="0 0 137.21 137.18" width="44px" height="44px" xmlns="http://www.w3.org/2000/svg">
            <path d="M591.54,404H523a4.49,4.49,0,0,0-4.49,4.49V469.7a37.91,37.91,0,0,0,34.29,37.69v24.84H531.61a4.49,4.49,0,1,0,0,9h51.3a4.49,4.49,0,1,0,0-9H561.75V507.39A37.91,37.91,0,0,0,596,469.7V408.52A4.49,4.49,0,0,0,591.54,404Zm-4.48,65.67a28.93,28.93,0,0,1-28.9,28.89h-1.79a28.92,28.92,0,0,1-28.9-28.89V413h59.59Z" transform="translate(-488.66 -404.03)"/><path d="M624.61,424.07a4.48,4.48,0,0,0-3.23-1.37H603.46a4.49,4.49,0,1,0,0,9h13.08c-1.12,10.41-5,28.11-15,32.89a4.49,4.49,0,0,0,2,8.54,4.42,4.42,0,0,0,1.93-.44c19-9.09,20.41-43.84,20.47-45.31A4.54,4.54,0,0,0,624.61,424.07Z" transform="translate(-488.66 -404.03)"/><path d="M515.55,427.19a4.49,4.49,0,0,0-4.49-4.49H493.15a4.49,4.49,0,0,0-4.49,4.65c0,1.47,1.51,36.22,20.46,45.31a4.49,4.49,0,1,0,3.88-8.1c-9.95-4.77-13.87-22.47-15-32.89h13.07A4.48,4.48,0,0,0,515.55,427.19Z" transform="translate(-488.66 -404.03)"/>
          </svg>
        </i>
        競技
      </a>
    </li>
    <li class="nadir_tab-item nadir_tab-item__nowdo">
      <a class="nadir_tab-link" href="/nowdo/">
        <i>
          <svg class="nadir_tab-icon_nowdo" viewBox="0 0 15 14" width="44px" height="44px" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>.cls-1{fill:none;}.cls-2{clip-path:url(#clip-path);}</style>
              <clipPath id="clip-path"><path class="cls-1" d="M9.49,14H5.58l5.51-7L5.58,0H9.49L15,7ZM0,14V0H3.62V14Z"/></clipPath>
            </defs><title>icon-nowdo</title><g class="cls-2"><rect class="cls-3" width="15" height="14"/></g>
          </svg>
        </i>
        NowDo
      </a>
    </li>
  </ul><!-- /.nadir_tab-list -->
</nav><!-- /.nadir_tab -->
